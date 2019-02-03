import { getConfirmationDialog } from "./ConfirmationDialogReducer";

export const OPEN_CONFIRMATION_DIALOG = 'OPEN_CONFIRMATION_DIALOG'
export const CLOSE_CONFIRMATION_DIALOG = 'CLOSE_CONFIRMATION_DIALOG'

export const openConfirmationDialog = (title, message, buttonMessage, onClose) => ({
  type: OPEN_CONFIRMATION_DIALOG,
  title,
  message,
  buttonMessage,
  onClose,
})

export const closeConfirmationDialog = () => (dispatch, getState) => {
  const confirmationDialog = getConfirmationDialog(getState())
  const onClose = confirmationDialog && getConfirmationDialog(getState()).onClose
  dispatch({ type: CLOSE_CONFIRMATION_DIALOG })
  if (onClose)
    onClose()
}
