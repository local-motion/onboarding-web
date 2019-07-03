import gql from 'graphql-tag';
import { stopStream, startStream } from '../../api/StreamActions';
import { GRAPHQL_QUERY } from 'api/QueryActions';
import { guidToObjectKey } from 'utils/Generics';


export const GET_AUDITTRAIL = 'GET_AUDITTRAIL'
export const GENERIC_AUDITTRAIL_POSTFIX = 'GENERIC'

// Stream identifiers (and/or prefixes)
export const AUDITTRAIL_STREAM = 'AUDITTRAIL_STREAM_'


export const getAuditTrailQuery = gql`
    query Query($initiativeId: String, $actorId: String, $fromTime: LocalDateTime, $toTime: LocalDateTime, $maxRecords: Int) {
        auditTrail(initiativeId: $initiativeId,  actorId: $actorId, fromTime: $fromTime, toTime: $toTime, maxRecords: $maxRecords) {
            records {
              actorName
              instant
              eventType
              details
            }
            totalRecords
        }
    }
`

export const startAuditTrailStreamForInitiative = initiativeId => startStream(
    AUDITTRAIL_STREAM + guidToObjectKey(initiativeId), 
    {
      type: GRAPHQL_QUERY,      
      baseActionIdentifier: GET_AUDITTRAIL,
      query: getAuditTrailQuery,
      variables: {initiativeId},
      fetchId: initiativeId,
    }
  )
  
export const startAuditTrailStreamForActor = actorId => startStream(
    AUDITTRAIL_STREAM + guidToObjectKey(actorId), 
    {
      type: GRAPHQL_QUERY,      
      baseActionIdentifier: GET_AUDITTRAIL,
      query: getAuditTrailQuery,
      variables: {actorId},
      fetchId: actorId,
    }
  )

  export const stopAuditTrailStream = streamIdPostfix => {
    return stopStream(AUDITTRAIL_STREAM + streamIdPostfix)
  }
  