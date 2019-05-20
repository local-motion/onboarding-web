
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