
/**
 * Generate a uuid
 */
export function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
        return v.toString(16);
    })
}

/**
 * Test whether an object is a function
 * @param {*} functionToCheck 
 */
export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

/**
 * Binds all provided methods to the object. Typically used for binding methods in a class to 'this'
 * @param {*} methods array of method names
 * @param {*} object the object to bind the methods to. Typically 'this' when invoked from the class constructor.
 */
export const bindMethods = (methods, object) => {
    for (let i = 0; i < methods.length; i++) {
        const method = methods[i]
        object[method] = object[method].bind(object)
    }
}

/**
 * Shallow copies the selecties properties from one object to another
 * @param {*} source the object to copy the properties from
 * @param {*} destination the object to copy the properties to
 * @param {*} properties the list of property identifiers to copy
 * @returns the destination object
 */
export const copyProperties = (source, destination, properties) => {
    for (let i = 0; i < properties.length; i++)
        destination[properties[i]] = source[properties[i]]
    return destination
}

 /**
  * Write an object to the browser's local storage. This function takes care of the marshalling
  * @param {*} key label to be used for retrieving the object
  * @param {*} value object to store
  */
export const writeToBrowserStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
  * Read an object from the browser's local storage. This function takes care of the unmarshalling.
  * @param {*} key label identifying the object
  */
export const readFromBrowserStorage = (key) => {
    const item = localStorage.getItem(key)
    return item && JSON.parse(item)
}

/**
  * Delete an object from the browser's local storage.
  * @param {*} key label to be used for retrieving the object
  */
export const deleteFromBrowserStorage = (key) => {
    localStorage.removeItem(key)
}

/**
 * Encodes a GUID to a string that is suitable to be used as a property on an javascript object
 * @param {*} guid to encode
 * @returns the key string
 */
export const guidToObjectKey = guid => 'P' + guid.replace('-', '_')

/**
 * Decodes an encoded GUID (=object key) back to het guid
 * @param {*} key to decode
 * @returns the guid
 */
export const objectKeyToGuid = key => key.replace('_', '-').substring(1)

/**
 * Logger to be used for debugging. Just logs to console, but makes it easy to distinguish for the structural logging statements.
 */
export const dlog = (...args) => {
    console.log(...args)
}