import { AUDITTRAIL_STREAM, GET_AUDITTRAIL } from "./AuditTrailActions";
import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { STOP_STREAM } from "api/StreamActions";
import { guidToObjectKey, copyProperties, balancedLineSort } from "utils/Generics";


// State definition

const initialState = {
  auditTrails: {
    // key = initiativeId|actorId|GENERIC, value = audittrail
  },
  integralAuditTrail: {   // One audittrail constructed from all audit trails with the records sorted on date (past to future) and the totalRecords being the sum of all totalRecords
    records: [],
    totalRecords: 0
  }
}

/*
    {
        records: [
          {
            actorName: [string], username of the actor that initiated the command that led to this event
            instant: [timestamp], time on which the event occurred
            eventType: [string]
            details: [json string], variable data associated with the event (depends on eventtype)
          },
          ...
        ]
        totalRecords: [int], all records available in the unfiltered audit trail (Note that due to memory restrictions not all records may be available on the server)
    }
}
*/

// Selectors

export const getAuditTrail = (state, auditTrailId) => state.audittrail.auditTrails[guidToObjectKey(auditTrailId)]
export const getIntegralAuditTrailRecords = (state, maxEntries=1000, reverseOrder=false) => {
  const records = state.audittrail.integralAuditTrail.records
  const recordsSlice = reverseOrder ? records.slice(-maxEntries) : records.slice(0, maxEntries)
  return reverseOrder ? recordsSlice.reverse() : recordsSlice
}
export const getRecordCountSince = (state, datetime, maxCount) => {
  const records = state.audittrail.integralAuditTrail.records
  for (let i = 0; i < records.length && i < maxCount; i++) {
    if (records[records.length - i - 1].instant < datetime)
      return i
  }
  return records.length
}
/**
 * This selector can be used by badges to show the number of relevant audit trail items
 * @param {*} state global state
 * @param {*} datetime time after which the events must have occurred in order to be included in the count
 * @param {*} actorName events/record from this actor will be excluded
 * @param {*} maxCount maximum number of records to evaluate (regardless of whether the records match the criteria)
 * @param {*} isRecordIncluded custom function that will indicate whether the record should be included the count. (record) => boolean
 */
export const getRecordCountSinceExcludingActor = (state, datetime, actorName, maxCount, isRecordIncluded) => {
  const records = state.audittrail.integralAuditTrail.records
  let count = 0
  for (let i = 0; i < records.length && i < maxCount; i++) {
    const record = records[records.length - i - 1]
    if (record.instant < datetime)
      return count
    if (record.actorName !== actorName && (!isRecordIncluded || isRecordIncluded(record)))
      count++
  }
  return count
}

// Reducer

const auditTrailReducer = (state = initialState, action, baseState) => {
  switch (action.type) {
    case GET_AUDITTRAIL + SUCCESS_POSTFIX:
        if (action.payload.status === 'not_modified')
          return state

        console.log('composing new audittrail into the state', action)
        const newAuditTrails = {...state.auditTrails}
        const auditTrail = { 
          records: processRecords(action.payload.auditTrail.records), 
          totalRecords: action.payload.auditTrail.totalRecords 
        }
        newAuditTrails[guidToObjectKey(action.fetchId)] = auditTrail
        return {
          ...state,
          auditTrails: newAuditTrails,
          integralAuditTrail: constructIntegralAuditTrail(newAuditTrails),
        }
    case STOP_STREAM:
      // To save space remove the audittrail from memory when the stream stops
        if (action.streamIdentifier.startsWith(AUDITTRAIL_STREAM)) {
          const key = guidToObjectKey(action.streamIdentifier.substring(AUDITTRAIL_STREAM.length))
          const newAuditTrails = {...state.auditTrails}
          delete newAuditTrails[key]
          return {
            ...state,
            auditTrails: newAuditTrails,
            integralAuditTrail: constructIntegralAuditTrail(newAuditTrails),
          }
        }
        else
          return state
      default:
        return state
  }
}

const processRecords = records => records.map(record => {
  const result = JSON.parse(record.details)
  copyProperties(record, result, ['actorName', 'instant', 'eventType'])
  return result
})

const constructIntegralAuditTrail = (auditTrails) => {
  const recordsList = []
  let grantTotalRecords = 0
  
  for (let i in auditTrails) {
    recordsList.push(auditTrails[i].records)
    grantTotalRecords += auditTrails[i].totalRecords
  }

  const sortedRecords = balancedLineSort(recordsList, (record1, record2) => record1.instant < record2.instant)

  return {
    records: sortedRecords,
    totalRecords: grantTotalRecords
  }
}


export default auditTrailReducer
