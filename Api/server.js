const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const winston = require('winston');
const squareService = require("./controllers/SquareControllers");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/db');
const port = process.env.PORT || 4000;
const models = require('./Models/index');
const indexRouter = require('./Router/app');
const authRouter = require('./Router/auth.routers');
const adminRouter = require('./Router/admin.routers');
const leaderRouter = require('./Router/leader.routers');
const moment = require('moment-timezone');
const axios = require("axios");



// Get timezone from environment variable, default to UTC if not set
const timezone = process.env.TIMEZONE || 'UTC';

// Calculate the start and end of the week based on the provided timezone
// Here, startOf('week') returns the start (Sunday) and endOf('week') returns the end (Saturday)
const startOfWeek = moment().tz(timezone).startOf('week'); // e.g., Sunday 00:00:00 in the specified timezone
const endOfWeek = moment().tz(timezone).endOf('week');       // e.g., Saturday 23:59:59 in the specified timezone
// Get the current moment in the specified timezone
const now = moment().tz(timezone);

// Get hours and minutes
const hours = now.hour();    // Returns an integer (0-23)
const minutes = now.minute(); // Returns an integer (0-59)

// Log the results
console.log(`Current Time in ${timezone} is ${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
// Winston Logger Configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/success.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

// If in development, also log to the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, 'public')));

// Log all successful requests
app.use((req, res, next) => {
    res.on('finish', () => {
        logger.info({
            method: req.method,
            url: req.url,
            status: res.statusCode
        });
    });
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'controllers/public/uploads')));
app.use('/qrcodes', express.static(path.join(__dirname, 'controllers/public/qrcodes')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter.router);
app.use('/api', authRouter.router);
app.use('/ad', adminRouter.router);
app.use('/ld', leaderRouter.router);

// Error Handling Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found 404');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    logger.error({
        message: error.message,
        status: error.status || 500,
        stack: error.stack
    });

    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

// Start Server
db.sync().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port => ' + port);
        logger.info(`Server started on port ${port}`);

        // Call the function immediately when the server starts
        squareService.getTopEmployeesByPaymentsBackup();

        // Define the interval time (24 hours)
        const intervalTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        let remainingTime = intervalTime / 1000; // Convert to seconds

        // Countdown display function
        const countdown = setInterval(() => {
            remainingTime--;

            if (remainingTime % 60 === 0) { // Show message every 1 minute
                console.log(`Next backup in ${Math.floor(remainingTime / 60)} minutes...`);
            }

            if (remainingTime <= 0) {
                console.log("Executing getTopEmployeesByPaymentsBackup...");
                logger.info("Executing getTopEmployeesByPaymentsBackup...");
                squareService.getTopEmployeesByPaymentsBackup();
                remainingTime = intervalTime / 1000; // Reset countdown
            }
        }, 1000); // Update every second
    });
}).catch(err => {
    console.error(err);
    logger.error(`Database sync failed: ${err.message}`);
});
