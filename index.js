const express = require("express");
const cors = require("cors");
const appRouter = require('./routers');
const cookieParser = require("cookie-parser");
require("./config/db");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());




app.use('/api', appRouter);


app.listen(4500, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log('Server running on port 4500');
    }
});

