import { parseISO, formatDistance } from 'date-fns';
import { nl } from 'date-fns/locale';


const isSameDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
const getTimeString = date => date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()


/**
 * Returns the absolute date and time. The date is omitted if equal to today. On all other days of the same week the day-of-week is printed and the full date in all other cases.
 * @param {*} messageDateString UTC date time string to prettify
 */
export const getPrettyAbsoluteMessageDatetime = messageDateString => {

    // Convert the messageDateString to a valid ECMAScript format.
    // So 2019-04-03T18:28:20.437+0000 should become 2019-04-03T18:28:20.437Z
    const dateString = messageDateString.indexOf('+') !== -1 ? messageDateString.substring(0,messageDateString.indexOf('+')) + 'Z' : messageDateString

    const displayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const displayOptionsThisWeek = { weekday: 'long'}

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today-1)
    const sixDaysAgo = new Date(today-6)

    const messageDate = new Date(dateString)

    if (isSameDate(messageDate, today))
        return getTimeString(messageDate)
    else if (isSameDate(messageDate, yesterday))
        return 'gisteren ' + getTimeString(messageDate)
    else if (messageDate > sixDaysAgo)
        return messageDate.toLocaleDateString('nl-NL', displayOptionsThisWeek) + ' ' + getTimeString(messageDate)
    else
        return messageDate.toLocaleDateString('nl-NL', displayOptions) + ' ' + getTimeString(messageDate)
}

/**
 * Returns the relative date and time as is 'X minutes/hours/days ago'.
 * @param {*} messageDateString UTC date time string to prettify
 */
export const getPrettyRelativeMessageDatetime = messageDateString =>
  formatDistance(parseISO(messageDateString), new Date(), { locale: nl }) + ' geleden';

/**
 * Returns the relative date and time for datetimes less than 5 days ago and the absolute date/time for all before that
 * @param {*} messageDateString UTC date time string to prettify
 */
export const getPrettyHybridMessageDatetime = messageDateString => {
    // Convert the messageDateString to a valid ECMAScript format.
    // So 2019-04-03T18:28:20.437+0000 should become 2019-04-03T18:28:20.437Z
    const dateString = messageDateString.indexOf('+') !== -1 ? messageDateString.substring(0,messageDateString.indexOf('+')) + 'Z' : messageDateString

    const messageDate = new Date(dateString)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const fiveDaysAgo = new Date(today-5)
    return messageDate > fiveDaysAgo ? getPrettyRelativeMessageDatetime(messageDateString) : getPrettyAbsoluteMessageDatetime(messageDateString)
}