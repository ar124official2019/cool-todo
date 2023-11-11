const { Router } = require('express');
const AuthController = require('../controllers/auth');
const passport = require('passport');
const TodoController = require('../controllers/todo');
const TodoRouter =  Router();

TodoRouter.use(passport.authenticate("jwt", { session: false }));

TodoRouter.post("/", TodoController.createOne);
TodoRouter.patch("/:id", TodoController.updateOne);
TodoRouter.get("/", TodoController.get);
TodoRouter.get("/:id", TodoController.getOne);
TodoRouter.delete("/:id", TodoController.deleteOne);

module.exports = TodoRouter;