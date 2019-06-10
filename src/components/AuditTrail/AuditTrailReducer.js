import { AUDITTRAIL_STREAM, GET_AUDITTRAIL } from "./AuditTrailActions";
import { SUCCESS_POSTFIX } from "../../api/QueryActions";
import { STOP_STREAM } from "api/StreamActions";
import { guidToObjectKey } from "utils/Generics";


// State definition

const initialState = {
  auditTrails: {
    // key = initiativeId|actorId|GENERIC, value = audittrail
  },
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
export const getIntegralAuditTrail = (state, maxEntries) => constructIntegralAuditTrail(state, maxEntries || 1000)



const constructIntegralAuditTrail = (state, maxEntries) => {
  const recordsList = []
  let indexes = []
  for (let i in state.auditTrails) {
    recordsList.push(state.auditTrails[i].records)
    indexes.push(0)
  }

  console.log('recordsList:', recordsList)

  let sortedRecords = []

  let nextRecordListIdx = 0
  while (nextRecordListIdx > -1) {
    nextRecordListIdx = -1
    let compareDate = null
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
      sortedRecords.push(recordsList[nextRecordListIdx].records[indexes[nextRecordListIdx]])
      indexes[nextRecordListIdx] = indexes[nextRecordListIdx] + 1
    }
  }
  return sortedRecords.slice(0 - maxEntries)
}



// Reducer

const auditTrailReducer = (state = initialState, action, baseState) => {
  switch (action.type) {
    case GET_AUDITTRAIL + SUCCESS_POSTFIX:
        if (action.payload.status === 'not_modified')
          return state

        console.log('composing new audittrail into the state', action)
        const newAuditTrails = {...state.auditTrails}
        newAuditTrails[guidToObjectKey(action.fetchId)] = action.payload.auditTrail
        return {
          ...state,
          auditTrails: newAuditTrails
        }
    case STOP_STREAM:
      // To save space remove the audittrail from memory when the stream stops
        if (action.streamIdentifier.startsWith(AUDITTRAIL_STREAM)) {
          const key = guidToObjectKey(action.streamIdentifier.substring(AUDITTRAIL_STREAM.length))
          const newAuditTrails = {...state.auditTrails}
          delete newAuditTrails[key]
          return {
            ...state,
            auditTrails: newAuditTrails
          }
        }
        else
          return state
      default:
        return state
  }
}

export default auditTrailReducer
