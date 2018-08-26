const express = require('express'),
 app = express();
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');


// importing routes
const Routes = require('./routes/routes');

// settings
app.set('port', process.env.PORT || 100);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'leeloo',
  port: 3306,
  database: 'alexis_navas'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', Routes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
