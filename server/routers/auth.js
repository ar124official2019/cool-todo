const { Router } = require('express');
const AuthController = require('../controllers/auth');
const passport = require('passport');
const AuthRouter =  Router();

const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn({
  redirectTo: "http://localhost:4200/login",
});

AuthRouter.post("/signup", AuthController.signup);
AuthRouter.post("/login", AuthController.login);
AuthRouter.get("/login/google", passport.authenticate("google"));

AuthRouter.get(
  "/login/google/success",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4200/login-google",
    failureRedirect: "http://localhost:4200/login",
  })
);

AuthRouter.post(
  "/login/google/persist",
  passport.authenticate("session"),
  ensureLoggedIn,
  AuthController.googleLoginPersist
);

module.exports = AuthRouter;