import { isDeveloperMode } from "../utils/DeveloperMode";

/*
    This file contains the user-friendly translations of all error codes
    For each error code there is a developerMessage and a normal message. The developer message is only-shown in developer mode.

    Additionally the getTranslatedMessage function can translate a message into a message that we can present to the user.
*/

// Technical errors

export const ErrorCode = {
    GENERIC:                    {developerMessage: 'Generic error', message: 'Er is een technische fout opgetreden'},
    NOT_AUTHORISED:             {developerMessage: 'Not authorised', message: 'Er is een technische fout opgetreden'},
    INTERNAL_SERVER_ERROR:      {developerMessage: 'Internal server error', message: 'Er is een technische fout opgetreden'},
    JSON_PARSE:                 {developerMessage: 'Json did not parse', message: 'Er is een technische fout opgetreden'},
    NETWORK:                    {developerMessage: 'Network error', message: 'Er is een netwerk fout opgetreden'},
    EMAIL_ADDRESS_ALREADY_EXISTS: {developerMessage: 'Email address already exists', message: 'Dit emailadres is al in gebruik.'},
    DUPLICATE_EMAIL_ADDRESS:    {developerMessage: 'Cannot onboard user as email address already exists', message: 'Dit emailadres is al in gebruik. Neem contact op met de beheerder (zie contact link onderaan het scherm)'},
    DUPLICATE_USERNAME:         {developerMessage: 'Cannot onboard user as user name already exists', message: 'Deze gebruikersnaam is al in gebruik. Neem contact op met de beheerder (zie contact link onderaan het scherm)'},
    INVALID_COMMAND_RECORD:      {developerMessage: 'Command record contains invalid Json', message: 'Command record contains invalid Json'},
    REVIVAL_COOLDOWN_ACTIVE:      {developerMessage: 'A user cannot be revived within 60 seconds of being deleted', message: 'Je moet een minuut wachten voordat je je met dezelfde gebruiker opnieuw kunt aanmelden. Probeer nogmaals in te loggen.'},

// Cognito errors
    UserNotFoundException:      {developerMessage: 'User does not exist', message: 'Deze gebruikersnaam is onbekend'},
    NotAuthorizedException:     {developerMessage: 'Invalid user and/or password', message: 'Ongeldige gebruikersnaam en/of wachtwoord'},
    UserNotConfirmedException:  {developerMessage: 'User\'s email is not confirmed', message: 'Uw emailadres is nog niet bevestigd. Vraag een nieuwe code aan.'},
    UsernameExistsException:    {developerMessage: 'User already exists', message: 'Er bestaat al een gebruiker met deze naam'},
    CodeMismatchException:      {developerMessage: 'Invalid verification code provided', message: 'Ongeldige verificatiecode'},
    ExpiredCodeException:       {developerMessage: 'Invalid code provided, please request a code again.', message: 'Deze verificatiecode is verlopen, vraag een nieuwe code aan'},
    LimitExceededException:     {developerMessage: 'Attempt limit exceeded, please try after some time.', message: 'Teveel wachtwoord resets in korte tijd. Probeer het later nog eens.'},
    InvalidPasswordException:   {developerMessage: 'Password does not meet requirements', message: 'Je wachtwoord heeft minimaal 8 karakters, een cijfer, een hoofdletter en een speciaal karakter nodig.'},
    PasswordResetRequiredException:   {developerMessage: 'Password reset required for the user', message: 'Je moet je wachtwoord opnieuw instellen. Ga naar \'wachtwoord vergeten?\''},


// Functional validation errors


}

const translations = [
    ['Network error', 'Er is een probleem met de verbinding'],
    ['User cannot be confirm. Current status is CONFIRMED', 'Deze gebruiker is al bevestigd, ga verder met inloggen'],
    ['User is already confirmed.', 'Deze gebruiker is al bevestigd, ga verder met inloggen'],
    ['Cannot reset password for the user as there is no registered/verified email or phone_number', 'Een wachtwoord reset is niet mogelijk omdat het emailadres van deze gebruiker niet geverifieerd is'],
]

export const getTranslatedMessage = (sourceMessage) => {
    for (let i = 0; i < translations.length; i++) {
        if (translations[i][0].toUpperCase() === sourceMessage.toUpperCase())
            return translations[i][1]
    }
    return null
}

/**
 * Constructs an error message. The sourceMessage takes precedence over the error code. So if this message can be mapped that translation is returned.
 * When neither can be resolved the provided fallback message or a generic fallback message is returned.
 * @param {*} code error code to map
 * @param {*} sourceMessage error message to translate
 * @param {*} fallbackMessage message to present when neither of the other options work out
 */
export const getErrorMessage = (code, sourceMessage, fallbackMessage) => {
    const translatedMessage = sourceMessage ? getTranslatedMessage(sourceMessage) : ''
    if (!translatedMessage && code && ErrorCode[code])
        return isDeveloperMode() ? ErrorCode[code].developerMessage : ErrorCode[code].message
    else
        return translatedMessage || (isDeveloperMode() ? sourceMessage : fallbackMessage) || 'Er is een onbekende fout opgetreden'
}

export default ErrorCode


