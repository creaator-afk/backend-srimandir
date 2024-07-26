require('dotenv').config();
const
    createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    cors = require('cors'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    apiRouter = require('./routes/api'),
    index = express(),
    bodyParser = require('body-parser'),
    CONFIG = require('./config');
    stripe = require('stripe')(CONFIG.STRIPE_SECRET_KEY);

const mongoose = require("mongoose");
mongoose.connect(CONFIG.DB_URL).then(r => {
    console.log(`Connected to DB @${CONFIG.DB_URL}`);
});

// view engine setup
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'pug');


index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(cookieParser());
index.use(express.static(path.join(__dirname, 'public')));
index.use(bodyParser.json({limit: "10mb"}));
index.use(cors({origin: CONFIG.ORIGIN}));

index.use('/', indexRouter);
index.use('/users', usersRouter);
index.use('/api', apiRouter);

// catch 404 and forward to error handler
index.use(function (req, res, next) {
    next(createError(404));
});

// error handler
index.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = index;
