const homeController = {

    index: (req, res) => {
        res.render('home/index', { title: 'Zone d accueil' });
    },

    about: (req, res) => {
        res.render('home/about', { title:'Page d acueil' });
    }
};

module.exports = homeController;


