const express = require("express");
const cors = require("cors");
const appRouter = require('./routers')
require("./config/db");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api', appRouter);


app.listen(4500)
