
/*
    This component check value against a series of validations.
    The format of a validation is:
    {
        validateThat: function returning a boolean. When true the validation passes.
        message: message to return when the validation fails
        stages: array of stages when the validation applies. When no or an empty array is supplies the validation will be performed in all stages
    }

*/

/**
 * Validate an item against a list of validations. The stage parameter is optional, if left empty all validations will be applied.
 * returns an array of error messages
 */
export const validateToList = (item, validations, stage) => {
 
    const errorMessages = []

    for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];

        if (!validation.stages || !stage || validation.stages.includes(stage))
            if (!validation.validateThat(item))
                errorMessages.push(validation.message)
    }

    return errorMessages
}

/**
 * Validate an item against a list of validations. The stage parameter is optional, if left empty all validations will be applied.
 * returns the message of the first validation that fails or an empty string
 */
export const validateToMessage = (item, validations, stage) => {

    for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];

        if (!validation.stages || !stage || validation.stages.includes(stage))
            if (!validation.validateThat(item))
                return validation.message
    }

    return ''
}

