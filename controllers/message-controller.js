const res = require('express/lib/response');

const messageController = {

    index: (req, res) => {
        // Affichage de la liste des messages
        res.render('message/index');

    },
    detail: (req, res)=> {
        const { id } = req.params;
        res.render('message/detail')
    },

    // GET 
    messageFormGet: (req, res) => {
        res.render('message/new')
    },
    // POST 
    messageFormatPost: (req, res) => {
        res.render('message/new');
    }

}

module.exports = messageController;