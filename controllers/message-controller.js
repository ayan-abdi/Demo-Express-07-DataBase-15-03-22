const { messageSchema } = require('../data-validators/message-validator');
const messageModel = require('../models/message-model');
const getErrorMessage = require('../utils/error-message-utils');

const messageController = {

    index: (req, res) => {
        // Affichage de la liste des messages
        messageModel.getAll()
        .then(messages => {
            console.log(messages);
            res.render('message/index', { title : 'Liste des messages', messages});
        });


    },
    detail: (req, res)=> {
        const { id } = req.params;
        
        // recup des datas
        messageModel.getById(id)
            .then(message => {

                if(!message) {
                    return res.sendStatus(404);               
                }

                const optionDate = {
                    dateStyle : 'long',
                    timeStyle : 'short',
                    timeZone: 'Europe/Brussels'
                };
                console.log(message.createDate);

                res.render('message/detail',
                { title: `Detail du message ${id}`,
                message,
                formatedCreateDate: message.createDate.toLocaleString('fr-be', optionDate)
                });
            });
    },

    // GET 
    messageFormGet: (req, res) => {
        res.render('message/new-message', { title: 'Nouveau message', errors: null, data: {} });
    },
    // POST 
    messageFormatPost: (req, res) => {
        //  On a des données que dans la requete
        // console.log(req.body);
        // const { body } = req;

        messageSchema.validate(req.body, { abortEarly:  false })
            .then((data) => {
                
                // Ajouter dans la DB
                messageModel.insert({
                    pseudo: data.pseudo,
                    content: data.msg
                }).then(id => {
                    console.log(`Message ${id}`);
                });
                res.redirect('/message');
            })
            .catch((ValidationError) => {
                const errors = getErrorMessage(ValidationError);
                const data = ValidationError.value;
                
                res.render('message/newMessage', { title: 'Corrige ton message stp', errors, data })

            });
      
    }

};

module.exports = messageController;