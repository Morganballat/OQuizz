const { Router } = require('express');

const router = Router();

const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');

router.get('/', mainController.homePage);

router.get('/quiz/:id', quizController.showOneQuiz);

router.get('/tags', tagController.showTags);

router.get('/login', userController.loginPage);

router.post('/login', userController.loginAction);

router.get('/logout', userController.logoutAction);

router.get('/signup', userController.signupPage);

router.post('/signup', userController.signupAction);

router.get('/admin', userController.adminPage);

module.exports = router;