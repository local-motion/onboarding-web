export const OPEN_WARNING_NOTIFICATION = 'OPEN_WARNING_NOTIFICATION'
export const CLOSE_STATUS_NOTIFICATION = 'CLOSE_STATUS_NOTIFICATION'

export const openWarningNotification = (message) => ({
  type: OPEN_WARNING_NOTIFICATION,
  message,
})

export const closeStatusNotification = () => ({ 
  type: CLOSE_STATUS_NOTIFICATION 
})

