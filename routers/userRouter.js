const { Router } = require("express");
const { loginUser } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/login', loginUser)


module.exports = userRouter;
