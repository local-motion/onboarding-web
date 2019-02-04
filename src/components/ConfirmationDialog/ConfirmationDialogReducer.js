import { OPEN_CONFIRMATION_DIALOG, CLOSE_CONFIRMATION_DIALOG } from "./ConfirmationDialogActions";

// State definition

const initialState = null
  // title
  // message
  // buttonMessage (optional): text to print on the confirm button, defaults to 'OK'
  // onClose: function that will be called when the dialog is closed. The parent component should use this to set the 'open' prop to false or disable rendering of this dialog altogether


// Selectors

export const getConfirmationDialog = (state) => state.confirmationdialog


// Reducer

const confirmationDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CONFIRMATION_DIALOG:
    console.log("opening confirmation dialog", action)
      return {
        title: action.title,
        message: action.message,
        buttonMessage: action.buttonMessage,
        onClose: action.onClose
      }

    case CLOSE_CONFIRMATION_DIALOG:
      return initialState

    default:
      return state
  }
}

export default confirmationDialogReducer
