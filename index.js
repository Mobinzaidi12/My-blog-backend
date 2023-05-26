const express = require("express");
const cors = require("cors");
const appRouter = require('./routers')

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api', appRouter);


app.listen(5000)
