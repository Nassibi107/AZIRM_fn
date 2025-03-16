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
        
        // Schedule it to run every 24 hours (86,400,000 ms)
        setInterval(() => {
            console.log("Executing getTopEmployeesByPaymentsBackup...");
            squareService.getTopEmployeesByPaymentsBackup();
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    });
}).catch(err => {
    console.log(err);
});