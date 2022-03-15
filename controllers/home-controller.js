const res = require('express/lib/response');

const homeContoller = {

    index: (req, res) => {
        res.sendStatus(501);
    },

    about: (req, res) => {
        res.sendStatus(501);
    }
};

module.exports = homeContoller;