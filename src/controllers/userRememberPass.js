// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// RECORDAR CONTRASEÑA

const controllerUserPass = {};
let bcrypt = require("bcrypt-nodejs");
let nodemailer = require("nodemailer");

//CON ESTO ME REDIRECCIONA A LA PLANTILLA PARA CONFIRMAR EL EMAIL.
controllerUserPass.rememberPassForm = (req, res) => {
  let messages = {
    notices: req.session.notices,
    errors: req.session.errors
  };
  res.render("zonacliente/remember_pass", { messages: messages });
};

//CON ESTO ME COMPARA EL EMAIL Y SI ES CORRECTO ME ENVIA UN LINK
//PARA RECUPERAR LA CONTRASEÑA.
controllerUserPass.rememberPass = (req, res) => {
  const email = req.body.email;
  req.getConnection((err, connection) => {
    connection.query(`SELECT * FROM usuario WHERE email = ?`, email, function (err, result) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        if (usuario = result[0]) {
          req.session.notices = ['El email se ha enviado para reiniciar su contraseña. Por favor compruebe su carpeta de Spam']

          // //SERVIDOR EMAIL
          let smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "pruebawebperitoarte@gmail.com",
              pass: "pruebawebperitoarte12345"
            }
          });

          //TEXTO Y ENVIO DE EMAIL
          let mailOptions = {
            from: "pruebawebperitoarte@gmail.com",
            to: req.body.email,
            subject: "Alexis Navas - Perito | alexisnavas.com",
            //CUANDO ES UNA CUENTA DE HOTMAL EL LINK NO APARECE COMO TAL.
            html: 'Para recuperar su contraseña haga clik en el siguiente enlace<br><br>' + 'http://localhost:100/zonacliente/rememberpass/update/' + usuario.id + '<br><br> Gracias y un saludo.'
          };

          //FUNCION PARA ENVIAR EL EMAIL
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
            } else {
              console.log("El correo se envio correctamente");
            }
          });

          //CIERRO EL ENVIO DEL EMIAL
          smtpTransport.close();

        } else {
          req.session.errors = ['No se ha encontrado ese email registrado']
        }

        res.redirect('/zonacliente/rememberpass');
      }
    });
  });
};
//VISTA DE LOS DATOS DEL CLIENTE QUE VA A MODIFICAR SU CONTRASEÑA
controllerUserPass.viewsUserPass = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query("SELECT * FROM usuario WHERE id = ?", [id], (err, rows) => {
      res.render("../views/zonacliente/remember_pass_edit", {
        data: rows[0],
        usuario: req.session.user

      });
    });
  });
};

//CON ESTO MODIFICO LA CONTRASEÑA ANTERIOR POR UNA NUEVA.
controllerUserPass.editPass = (req, res) => {
  // let dato = req.body;
  const { id } = req.params;
  const newUsuario = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUsuario.password, salt, null, function (err, hash) {
      newUsuario.password = hash;
      req.getConnection((err, connection) => {
        connection.query("UPDATE usuario set ? where id = ?", [newUsuario, id], (err, rows) => {
          res.redirect("/login");

        });
      });
    });
  });
};

module.exports = controllerUserPass;