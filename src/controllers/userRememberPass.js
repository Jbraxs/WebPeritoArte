// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// RECORDAR CONTRASEÑA

const controllerUserPass = {};
let bcrypt = require("bcrypt-nodejs");
let nodemailer = require("nodemailer");

//CON ESTO ME REDIRECCIONA A LA PLANTILLA PARA CONFIRMAR EL EMAIL.
controllerUserPass.rememberPassForm = (req, res) => {
  res.render("zonacliente/remember_pass");
};

//CON ESTO ME COMPARA EL EMAIL Y SI ES CORRECTO ME ENVIA UN LINK
//PARA RECUPERAR LA CONTRASEÑA.
controllerUserPass.rememberPass = (req, res) => {
  const email = req.body.email;
  req.getConnection((err, connection) => {
    connection.query(`SELECT * FROM usuario WHERE email = ?`, email, function(err,result) {
      if (err) {
        return res.send(err);
      }else {
        (email == email)
        console.log(email) 
        res.redirect('/zonacliente/rememberpass');
      }
    });
  });
};
//CON ESTO MODIFICO LA CONTRASEÑA ANTERIOR POR UNA NUEVA.
controllerUserPass.editPass = (req,res) => {
  
};

module.exports = controllerUserPass;
// //SERVIDOR EMAIL
// let smtpTransport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "pruebawebperitoarte@gmail.com",
//     pass: "pruebawebperitoarte12345"
//   }
// });

// //TEXTO Y ENVIO DE EMAIL
// let mailOptions = {
//   from: "pruebawebperitoarte@gmail.com",
//   to: req.body.email,
//   subject: "Alexis Navas - Perito | alexisnavas.com",
//   html: 'Para recuperar su contraseña haga clik en el siguiente enlace'

// };

// //FUNCION PARA ENVIAR EL EMAIL
// smtpTransport.sendMail(mailOptions, function(error, response) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("El correo se envio correctamente");
//   }
// });

// //CIERRO EL ENVIO DEL EMIAL
// smtpTransport.close();