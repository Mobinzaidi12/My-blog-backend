const { Router } = require("express");
const userRouter = require('./userRouter');


const appRouter = Router();


appRouter.use('/user', userRouter)


module.exports = appRouter;