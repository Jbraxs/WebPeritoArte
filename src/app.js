const express = require('express'),
      app = express();
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      bodyParser = require('body-parser'),
      session = require('express-session');


// IMPORTO LAS RUTAS
const Routes = require('./routes/routes');

// CONFIGURACION
app.set('port', process.env.PORT || 100);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE EXPRESS-SESSION
app.use(session({
  secret:'c0dId0 al3at0ri0',
  resave:true,
  saveUninitialized:true
}));


// MIDDLEWARE
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'leeloo',
  port: 3306,
  database: 'alexis_navas'
}, 'single'));


//BODYPARSER
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// RUTAS
app.use('/', Routes);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// INICIO EL SERVIDOR
app.listen(app.get('port'), () => {
  console.log(`servidor ok ${app.get('port')}`);
});


// //prubea de mails 
// var nodemailer = require('nodemailer')
// var transporter = nodemailer.createTransport('smtps://pruebawebperitoarte@gmail.com:pruebawebperitoarte12345');
// // var transporte = nodemailer.createTransport('SMTP',
// // {
// //   service:'Gmail',
// //   auth:{ 
// //     user:'pruebawebperitoarte@gmail.com',
// //     password:'pruebawebperitoarte12345'
// //   }
// // });
// //lo que envio como html
// var mivariable='<h1>Hola</h1>'
// // quien lo envia
// var mailOptions= {
//   from:'Nombre',
//   to:'direccion de correo electronico',
//   subject: 'el asunto va aca ',
//   text:'mundo',
//   html:mivariable

// };
// Prueba 2
