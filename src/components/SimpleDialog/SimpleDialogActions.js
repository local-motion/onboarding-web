import { getSimpleDialog } from "./SimpleDialogReducer";

export const OPEN_ERROR_DIALOG = 'OPEN_ERROR_DIALOG'
export const OPEN_CONFIRMATION_DIALOG = 'OPEN_CONFIRMATION_DIALOG'
export const CLOSE_SIMPLE_DIALOG = 'CLOSE_SIMPLE_DIALOG'

export const openErrorDialog = (title, message, buttonMessage, onClose) => ({
  type: OPEN_ERROR_DIALOG,
  title,
  message,
  buttonMessage,
  onClose,
})

export const openConfirmationDialog = (title, message, buttonMessage, cancelButtonMessage, onConfirm, onClose) => ({
  type: OPEN_CONFIRMATION_DIALOG,
  title,
  message,
  buttonMessage,
  cancelButtonMessage,
  onConfirm,
  onClose,
})

export const closeSimpleDialog = () => (dispatch, getState) => {
  const dialog = getSimpleDialog(getState())
  const onClose = dialog && dialog.onClose

console.log('dispatching close simple dialog')

  dispatch({ type: CLOSE_SIMPLE_DIALOG })
  if (onClose)
    onClose()
}

export const confirmConfirmationDialog = () => (dispatch, getState) => {
  const dialog = getSimpleDialog(getState())
  const onConfirm = dialog && dialog.onConFirm
  dispatch({ type: CLOSE_SIMPLE_DIALOG })
  if (onConfirm)
    onConfirm()
}
