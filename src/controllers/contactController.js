// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
//CONTACTOS

const controllerContact = {};
var nodemailer = require("nodemailer");

//ACA ME REDIRECCIONA AL FORMULARIO DE CONTACTO PERO DEL USUARIO
controllerContact.addContactForm = (req, res) => {
  res.render("../views/contact",{usuario: req.session.user});
};
// ENVIA DATOS DEL FORMULARIO DE CONTACTO
controllerContact.addContact = (req, res) => {
  let usuario = req.session.user;
  const data = req.body;
  req.getConnection((err, connection) => {
    connection.query("INSERT INTO contacto set ?", data, usuario.id ,(err, contacto) => {
      if (err) {
        res.render('../views/errores/error409');
      } else {

        //SERVIDOR EMAIL
        let smtpTransport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "pruebawebperitoarte@gmail.com",
            pass: "pruebawebperitoarte12345"
          }
				});
				
        //TEXTO Y ENVIO DE EMAIL PARA CLIENTE 
        let mailOptions = {
          from: "pruebawebperitoarte@gmail.com",
          to: data.email,
          subject: "Alexis Navas - Perito | alexisnavas.com",
          html:
            "Hola &nbsp;" +
            data.nombre +
            ", <br> <br>" +
            'Hemos recibido su consulta: <br><br> <i>"' +
            data.comentario +
            '"</i><br><br>En la mayor brevedad posible contactaremos usted. <br><br>' +
            "Gracias por su consulta."
        };
        
        //TEXTO Y ENVIO DE EMAIL PARA ADMIN
        let mailOptions2 = {
          from: "pruebawebperitoarte@gmail.com",
          to: "pruebawebperitoarte@gmail.com",
          subject: "Alexis Navas - Perito | alexisnavas.com",
          html:"Hola &nbsp;" + "Alexis" + ",<br>" + 'tienes una consulta de &nbsp;' + data.nombre + '&nbsp; en el formulario de contacto. <br>' + 'http://localhost:100/admin/contacts'
				};
				
        //FUNCION PARA ENVIAR EL EMAIL
        smtpTransport.sendMail(mailOptions,mailOptions2, function(error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log("El correo se envio correctamente");
          }
        });
        smtpTransport.sendMail(mailOptions2, function(error, response) {
          if (error) {
            console.log(error);
          } else {
            console.log("El correo se envio correctamente");
          }
				});
				
        //CIERRO EL ENVIO DEL EMIAL
				smtpTransport.close();
				
        res.redirect("/contact");
      }
    });
  });
};

module.exports = controllerContact;
