const {Quiz} = require('../models');

const mainController = {
    homePage: async (req, res) => {
        const quizzes = await Quiz.findAll({
            include: ['author']
        });

        res.render('index', { quizzes });
    },

    notFound: (req, res) => {
        res.render('404');
    }
};

module.exports = mainController;