import { createCookie, readCookie } from "./CookieUtils";

/**
 * A user can put his LocalMotion front-end in developer mode. This will show more detailed error messages, debug information and possibly
 * experimental and developer-oriented features.
 * 
 * Whether this feature is active is stored in a cookie.
 */

const USER_MODE_COOKIE_NAME = 'user_mode'
const USER_MODE_ENDUSER = 'enduser'
const USER_MODE_DEVELOPER = 'developer'

export const setDeveloperMode = active => {
    createCookie(USER_MODE_COOKIE_NAME, active ? USER_MODE_DEVELOPER : USER_MODE_ENDUSER)
    window.location.reload()
}

export const isDeveloperMode = () => getUserMode() === USER_MODE_DEVELOPER

const getUserMode = () => readCookie(USER_MODE_COOKIE_NAME) || USER_MODE_ENDUSER
