const express = require('express');
const path = require('path');

require('dotenv').config();
const app = express();
const squareService = require("./controllers/SquareControllers");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/db');
const port =  process.env.PORT || 4000;
const models = require('./Models/index');
const indexRouter = require('./Router/app');
const authRouter = require('./Router/auth.routers');  
const adminRouter = require('./Router/admin.routers');  
const leaderRouter = require('./Router/leader.routers');  
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, 'public')));
const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const BASE_URL = process.env.SQUARE_API_URL;
// // Redirect root ("/") to index.html
// app.get("/userQr/:id", (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "index.html"));
// });
const axios = require("axios");


app.use('/uploads', express.static(path.join(__dirname, 'controllers/public/uploads')));
app.use('/qrcodes', express.static(path.join(__dirname, 'controllers/public/qrcodes')));
app.use('/', indexRouter.router);
app.use('/api', authRouter.router);
app.use('/ad', adminRouter.router);
app.use('/ld', leaderRouter.router);
// app.use('/api', userRouter.router);
app.use((req, res, next) => { 
    const error = new Error('Not Found 404');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


db.sync().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port => ' + port);
        
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
                squareService.getTopEmployeesByPaymentsBackup();
                remainingTime = intervalTime / 1000; // Reset countdown
            }
        }, 1000); // Update every second
    });
}).catch(err => {
    console.log(err);
});
