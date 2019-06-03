import { OPEN_ERROR_DIALOG, CLOSE_SIMPLE_DIALOG, OPEN_CONFIRMATION_DIALOG, OPEN_INFORMATION_DIALOG } from "./SimpleDialogActions";

// State definition

const initialState = null

  /* 
    We support three kinds of dialogs
    - error dialog: displays an error where the user has no choice but accept
    - information dialog: displays some information where the user has no choice but accept
    - confirmation dialog: displays a statement that the user can confirm or reject

    Properties:
    - type: ERROR_DIALOG | INFORMATION_DIALOG | CONFIRMATION_DIALOG
    - title
    - message
    - buttonMessage (optional): text to print on the confirm button, defaults to 'OK'
    - cancelButtonMessage (optional): text to print on the cancel/reject button, defaults to 'Annuleren' (only applicable to the confirmation dialog)
    - onClose: function that will be called when the dialog is closed. The parent component should use this to set the 'open' prop to false or disable rendering of this dialog altogether
               In the error dialog this function is triggered by the confirm button and by closing the dialog by just clicking beside it.
               In the confirmation dialog this function is triggered by the cancel/reject button and by closing the dialog by just clicking beside it.
    - onConfirm: function that will be called when the user clicks the confirm button in the confirmation dialog (not applicable to the error and information dialog)

  */

// Constants

export const ERROR_DIALOG = 'ERROR_DIALOG'
export const INFORMATION_DIALOG = 'INFORMATION_DIALOG'
export const CONFIRMATION_DIALOG = 'CONFIRMATION_DIALOG'


// Selectors

export const getSimpleDialog = state => state.simpleDialog



// Reducer

const SimpleDialogReducer = (state = initialState, action) => {
  switch (action.type) {

    case OPEN_ERROR_DIALOG:
      return {
        type: ERROR_DIALOG,
        title: action.title,
        message: action.message,
        buttonMessage: action.buttonMessage,
        onClose: action.onClose
      }

    case OPEN_INFORMATION_DIALOG:
      return {
        type: INFORMATION_DIALOG,
        title: action.title,
        message: action.message,
        buttonMessage: action.buttonMessage,
        onClose: action.onClose
      }

    case OPEN_CONFIRMATION_DIALOG:
      return {
        type: CONFIRMATION_DIALOG,
        title: action.title,
        message: action.message,
        buttonMessage: action.buttonMessage,
        cancelButtonMessage: action.cancelButtonMessage,
        onConfirm: action.onConfirm,
        onClose: action.onClose
      }

    case CLOSE_SIMPLE_DIALOG:
      return initialState

    default:
      return state
  }
}

export default SimpleDialogReducer
