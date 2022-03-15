const homeContoller = require('../controllers/home-controller');
const homeRouter = require('express').Router();

homeRouter.get('/', homeContoller.index);
homeRouter.get(['/index', '/home'], (req, res) => res.redirect(req, res));

homeRouter.get('/about', homeContoller.about);


module.exports = homeRouter;