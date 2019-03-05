const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const webRoute = require('./routes/web')
const settings = require('./settings');

const app = express();
app.set('port',process.env.PORT || 3000)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: settings.cookieSecret,
	key: settings.db, //cookie name
	cookie: {maxAge: 3 * 60 * 60 * 1000}, //30days
	store: new MongoStore({
		db: settings.db,
		host: settings.host,
		port: settings.port,
		url: 'mongodb://angleeOwner:2842l3u03@127.0.0.1:30678/test'
	})
}));


app.listen(3001, function() {
	console.log('Express server listening on port 3001');
});

webRoute(app);


module.exports = app;
