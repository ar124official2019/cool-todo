const { Router } = require('express');
const AuthController = require('../controllers/auth');
const AuthRouter =  Router();

AuthRouter.post("/signup", AuthController.signup);
AuthRouter.post("/login", AuthController.login);

module.exports = AuthRouter;