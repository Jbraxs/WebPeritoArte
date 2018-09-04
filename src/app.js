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


//prubea de mails 

// var smtpTransport = nodemailer.createTransport("SMTP",{
//   service: "Gmail",
//   auth: {
//       user: "pruebawebperitoarte@gmail.com",
//       pass: "pruebawebperitoarte12345"
//   }
// });

// // setup e-mail data with unicode symbols
// var mailOptions = {
//   from: "pruebawebperitoarte@gmail.com", // sender address
//   to: "muydespacito@hotmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world ✔", // plaintext body
//   html: "<b>Hello world ✔</b>" // html body
// }

// // send mail with defined transport object
// smtpTransport.sendMail(mailOptions, function(error, response){
//   if(error){
//       console.log(error);
//   }else{
//       console.log("Message sent: " + response.message);
//   }

//   // if you don't want to use this transport object anymore, uncomment following line
//   //smtpTransport.close(); // shut down the connection pool, no more messages
// });
