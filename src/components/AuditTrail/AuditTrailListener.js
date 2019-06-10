import { getUser } from 'components/UserProfile/UserProfileReducer';
import { getActiveStreamsStartingWith } from 'api/StreamReducer';
import { dlog, objectKeyToGuid, guidToObjectKey } from 'utils/Generics';
import { AUDITTRAIL_STREAM, startAuditTrailStreamForInitiative } from './AuditTrailActions';
import { stopStream } from 'api/StreamActions';


/**
 * Listener on the redux store in order to adapt the audit trail stream in response to change in the state.
 * Specifically the steam(s) will track the playgrounds that an authenticated users is member of
 */
const AuditTrailListener = store => {
  const state = store.getState()
  const user = getUser(state)

  const currentStreamInitiativeIds = getActiveStreamsStartingWith(state, AUDITTRAIL_STREAM).map(stream => objectKeyToGuid(stream.streamIdentifier.substring(AUDITTRAIL_STREAM.length)))
  const requiredStreamInitiativeIds = user ? user.initiativeMemberships.map(id => "" + id) : []

  currentStreamInitiativeIds.forEach(i => {
    if (requiredStreamInitiativeIds.indexOf(i) === -1) {
      dlog('test:', requiredStreamInitiativeIds, i, requiredStreamInitiativeIds.includes(i))
      dlog('audittrail listener stopping: ', i)
      store.dispatch(stopStream(AUDITTRAIL_STREAM + guidToObjectKey(i)))
    }
  })
      
  requiredStreamInitiativeIds.forEach(i => {
    if (currentStreamInitiativeIds.indexOf(i) === -1) {
      dlog('audittrail listener starting: ', i)
      store.dispatch(startAuditTrailStreamForInitiative(i))
    }
  })

}

export default AuditTrailListener
