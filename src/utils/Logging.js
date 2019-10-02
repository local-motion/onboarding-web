import { getLogLevelLabel, isDeveloperMode } from 'views/Developer/DeveloperControlCenter.jsx';


export const logLevelOff =      {   label: 'OFF',       prio: 100                           }
export const logLevelError =    {   label: 'ERROR',     prio: 4,    logger: console.error   }
export const logLevelWarn =     {   label: 'WARN',      prio: 3,    logger: console.warn    }
export const logLevelInfo =     {   label: 'INFO',      prio: 2,    logger: console.info    }
export const logLevelDebug =    {   label: 'DEBUG',     prio: 1,    logger: console.log     }

export const logLevels = [
    logLevelOff,
    logLevelError,
    logLevelWarn,
    logLevelInfo,
    logLevelDebug
]
const currentLogLevel = () => {
    const label = getLogLevelLabel()
    if (!label) 
        return logLevelOff

    const logLevel = logLevels.find(logLevel => logLevel.label === label)
    return logLevel || logLevelOff
}


export const log = (logLevel, message, ...substitutions) => {
    if (isDeveloperMode() && currentLogLevel().prio <= logLevel.prio)
        logLevel.logger(message, ...substitutions)
}

export const error = (message, ...substitutions) => log(logLevelError, message, ...substitutions)
export const warn = (message, ...substitutions) => log(logLevelWarn, message, ...substitutions)
export const info = (message, ...substitutions) => log(logLevelInfo, message, ...substitutions)
export const debug = (message, ...substitutions) => log(logLevelDebug, message, ...substitutions)

