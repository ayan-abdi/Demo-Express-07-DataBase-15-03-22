const  yup = require('yup');

const messageSchema = yup.object().shape({
    pseudo: yup.string().trim().min(3).max(50).required(),
    msg: yup.string().trim().max(1000).required()
});

module.exports = {
    messageSchema
};