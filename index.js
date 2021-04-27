require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const session = require('express-session');
const mainController = require('./app/controllers/mainController');

const app = express();

app.locals.appName = 'Oquiz';

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'zziuqo',
		cookie: {
			secure: false,
			maxAge: 60 * 60 * 1000, // une heure
		},
	})
);

app.use((req, res, next) => {
	if (req.session.user) {
		res.locals.user = req.session.user;
	}

	next();
});

app.use((req, res, next) => {
	if (req.session.flash) {
		res.locals.flash = req.session.flash;

		delete req.session.flash;
	}

	next();
});

app.use(express.static(__dirname + '/static'));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(mainController.notFound);

app.listen(port, () => {
	console.log('Running on http://localhost:' + port);
});
