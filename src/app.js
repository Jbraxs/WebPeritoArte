const express = require('express'),
      app = express();
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');


// IMPORTO LAS RUTAS
const Routes = require('./routes/routes');

// CONFIGURACION
app.set('port', process.env.PORT || 100);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const session = require('express-session');
app.use(session({
  secret:'cadena aleatoria',
  resave:true,
  saveUninitialized:true
}));


// MIDDLEWARES
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'leeloo',
  port: 3306,
  database: 'alexis_navas'
}, 'single'));



app.use(express.urlencoded({extended: false}));

// RUTAS
app.use('/', Routes);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// INICIO EL SERVIDOR
app.listen(app.get('port'), () => {
  console.log(`servidor ok ${app.get('port')}`);
});
