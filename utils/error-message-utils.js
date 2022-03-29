const { ValidationError } = require('yup');
/**
 * 
 * @param {ValidationError} validationError 
 * @returns{object}
 */

const getErrorMessage = (validationError) => {
    const result = ValidationError.inner.reduce((errors, current) => {
        const { path, message } = current; 
        if(!errors[path]) {
            errors[path] = message;
        
        } return errors;
    }, {}); // Me permet d'initialser la valeur a un objet vide plutot que de renvoyer underfind
    return result;
}  


module.exports = getErrorMessage;