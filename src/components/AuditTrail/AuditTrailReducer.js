import { AUDITTRAIL_STREAM, GET_AUDITTRAIL } from "./AuditTrailActions";
import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { STOP_STREAM } from "api/StreamActions";
import { guidToObjectKey, copyProperties, dlog } from "utils/Generics";


// State definition

const initialState = {
  auditTrails: {
    // key = initiativeId|actorId|GENERIC, value = audittrail
  },
  integralAuditTrail: null,   // One audittrail constructed from all audit trails with the records sorted on date (past to future) and the totalRecords being the sum of all totalRecords
                              // Can be set to null at any time
}

// The audittrail object has this structure:
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
  const recordsSlice = reverseOrder ? records.slice(records.length-maxEntries) : records.slice(0, maxEntries)
  return reverseOrder ? recordsSlice.reverse() : recordsSlice
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
  let indexes = []
  let grantTotalRecords = 0
  for (let i in auditTrails) {
    recordsList.push(auditTrails[i].records)
    grantTotalRecords += auditTrails[i].totalRecords
    indexes.push(0)
  }

  let sortedRecords = []

  let nextRecordListIdx = 0
  var compareDate = null
  while (nextRecordListIdx > -1) {
    nextRecordListIdx = -1
    compareDate = null
    for (let i = 0; i < indexes.length; i++) {
      const idx = indexes[i]
      const records = recordsList[i]
      if (idx < records.length) {
        if (nextRecordListIdx === -1 || records[idx].instant < compareDate) {
          nextRecordListIdx = i
          compareDate = records[idx].instant
        }
      }
    }

    if (nextRecordListIdx > -1) {
      sortedRecords.push(recordsList[nextRecordListIdx][indexes[nextRecordListIdx]])
      indexes[nextRecordListIdx] = indexes[nextRecordListIdx] + 1
    }
  }
  return {
    records: sortedRecords,
    totalRecords: grantTotalRecords
  }
}


export default auditTrailReducer
