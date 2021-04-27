const { Quiz } = require('../models');

const quizController = {
	showOneQuiz: (req, res) => {
		const id = parseInt(req.params.id, 10);

		if (!isNaN(id)) {
			Quiz.findByPk(id, {
				include: [
					'author',
					{
						association: 'questions',
						include: ['level', 'answers'],
					},
					'tags',
				],
			})

				.then((quiz) => {
					res.render('quiz', { quiz });
				})

				.catch((error) => {
					console.log(error);
					res.status(404).send('erreur');
				});
		} else {
			res.status(404).send('erreur');
		}
	},
};

module.exports = quizController;
