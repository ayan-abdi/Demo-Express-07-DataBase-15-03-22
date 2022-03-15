const messageController = require('../controllers/message-controller');
const messageRouter = require('express').Router();

messageRouter.get('/message/: id([0-9]+)', messageController.index)

messageRouter.get('/message/: id([0-9]+)', messageController.detail);

messageRouter.route('/message/new')
        .get(messageController.messageFormGet)
        .post(messageController.messageFormatPost);

module.exports = messageRouter; 