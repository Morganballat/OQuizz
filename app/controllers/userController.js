const bcrypt = require('bcrypt');
const validator = require("email-validator");

const { User } = require('../models');

const userController = {
    logoutAction: (req, res) => {
        delete req.session.user;

        res.redirect('/');
    },

    loginPage: (req, res) => {
        res.render('login');
    },

    loginAction: (req, res) => {
      
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
      
            if (user) {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (match) {
                
                        req.session.user = user;

                  
                        delete req.session.user.password;

                        res.redirect('/');
                    } else {
                
                        res.render('login', {
                            data: req.body,
                            message: `Identifiants incorrects`
                        });
                    }

            } else {
                res.render('login', {
                    data: req.body,
                    message: `Identifiants incorrects`
                });
            }
        });

    },

    signupPage: (req, res) => {
        res.render('signup');
    },

    signupAction: async (req, res) => {

        const errors = [];


        if (
            req.body.lastname.length === 0
            || req.body.firstname.length === 0
            || req.body.email.length === 0
            || req.body.password.length === 0
            || req.body.passwordConfirm.length === 0
        ) {
            errors.push('Au moins un champ du formulaire est vide');
        }

        if (req.body.password !== req.body.passwordConfirm) {
            errors.push('Les mots de passe ne correspondent pas');
        }


    
        if (!validator.validate(req.body.email)) {
            errors.push(`L'adresse email n'est pas valide`);
        }

      
        if (errors.length) {
            res.render('signup', {
                data: req.body,
                errors
            });

            return;
        }

     
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });


        if (user) { 
            res.render('signup', {
                data: req.body,
                errors: [`Vous avez déjà un compte. Souhaitez-vous <a href="/login">vous identifier</a> plutôt ?`]
            });

 
            return;
        }

    

        let hashedPassword;
        try { 
            hashedPassword = await bcrypt.hash(req.body.password, 10);
        } catch (err) {
            console.log(err);
            
            res.render('signup', {
                data: req.body,
                errors: [`Erreur de traitement. Merci de réessayer`]
            });

            return;
        }

 
        const newUser = User.build(req.body);


        newUser.password = hashedPassword;

      
        await newUser.save();

        req.session.user = user;


        delete req.session.user.password;

    
        req.session.flash = 'Compté créé';

        
        res.redirect('/');
        
    },

    adminPage: (req, res) => {

     
        if (req.session.user) {
        
            if (req.session.user.role === 'admin') {
                res.send('Bienvenue, monsieur l\'administrateur');
            } else {
                res.status(403).render('403');
            }
        } else {
            res.status(401).render('401');
        }

        
    }
}

module.exports = userController;