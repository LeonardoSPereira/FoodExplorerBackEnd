require('express-async-errors');
require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const database = require('./database');
const uploadConfig = require("./config/upload");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

// enable cors
app.use(cors({
origin: ["http://localhost:5173", "http:127.0.0.1:5173", "https://food-explorer-app.vercel.app"],
    credentials: true
}));

// enable cookie parser
app.use(cookieParser());

app.use(routes);

//route to serve the uploaded files
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

// connect to the database
database();

// Error handling middleware
app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'Error',
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: 'Error',
        message: 'Internal server error'
    });
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {console.log(`🚀Server listening on port ${PORT}`)});

