require('express-async-errors');
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
    origin: '*',
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
            status: 'error',
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
})

const PORT = 3333;

app.listen(PORT, () => {console.log(`🚀Server listening on port ${PORT}`)});

