const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/db');
const port =  process.env.PORT || 4000;
const models = require('./Models/index');
const indexRouter = require('./Router/app');
const authRouter = require('./Router/auth.routers');  
const adminRouter = require('./Router/admin.routers');  
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/', indexRouter.router);
app.use('/api', authRouter.router);
app.use('/ad', adminRouter.router);
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
    });
} ).catch(err => {
    console.log(err);
});