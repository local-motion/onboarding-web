/*
    This file contains the user-friendly translations of all error codes
    For each error code there is a developerMessage and a normal message. The developer message is only-shown in developer mode.
*/

// Technical errors

export const ErrorCode = {
    GENERIC:                    {developerMessage: 'Generic error', message: 'Er is een technische fout opgetreden'},
    NOT_AUTHORISED:             {developerMessage: 'Not authorised', message: 'Er is een technische fout opgetreden'},
    INTERNAL_SERVER_ERROR:      {developerMessage: 'Internal server error', message: 'Er is een technische fout opgetreden'},
    JSON_PARSE:                 {developerMessage: 'Json did not parse', message: 'Er is een technische fout opgetreden'},
    NETWORK:                    {developerMessage: 'Network error', message: 'Er is een netwerk fout opgetreden'},
}

export default ErrorCode

// Functional validation errors
