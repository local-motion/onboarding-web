/**
 * This file contains all validations used in the signup and authentication processes.
 */

 /**
  *     username
  */
export const usernameMinimumLength = 2
export const usernameMaximumLength = 40
export const usernameCharactersPattern = /^[a-zA-Z0-9]*$/

export const usernameValidations = [
     {
         validateThat: username => username.length >= usernameMinimumLength,
         message: 'De gebruikersnaam moet uit minimaal ' + usernameMinimumLength + ' karakters bestaan.',
     },
     {
         validateThat: username => username.length <= usernameMaximumLength,
         message: 'De gebruikersnaam mag niet uit meer dan ' + usernameMaximumLength + 'karakters bestaan.',
     },
     {
         validateThat: username => usernameCharactersPattern.test(username) === true,
         message: 'De gebruikersnaam mag alleen uit letters en cijfers bestaan.'
     },
 ]


 /**
  *     password
  */
        
 export const passwordMinimumLength = 2
 export const passwordMaximumLength = 40
 export const allowedSpecialCharacters = `^ $ * . [ ] { } ( ) ? - " ! @ # % & / \\ , > < ' : ; | _ ~ \``

// Password validation patterns
export const containsLowerCaseLetterPattern = /[a-z]/
export const containsUpperCaseLetterPattern = /[A-Z]/
export const containsDecimalPattern = /[0-9]/
export const containsSpecialCharacterPattern = /[^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]/

export const containsOnlyValidCharactersPattern = /^[a-zA-Z0-9^$*.[\]{}()?\-"!@#%&/\\,><':;|_~`]*$/



export const isValidPassword = (password) =>
    containsLowerCaseLetterPattern.test(password) &&
    containsUpperCaseLetterPattern.test(password) &&
    containsDecimalPattern.test(password) &&
    containsSpecialCharacterPattern.test(password) &&
    containsOnlyValidCharactersPattern.test(password) &&
    password.length >= passwordMinimumLength &&
    password.length <= passwordMaximumLength





