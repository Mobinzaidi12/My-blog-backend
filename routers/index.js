const { Router } = require("express");
const userRouter = require('./userRouter');
const postRouter = require("./postRouter")


const appRouter = Router();


appRouter.use('/user', userRouter);
appRouter.use('/post', postRouter);


module.exports = appRouter;