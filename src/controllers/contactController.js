// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
//CONTACTOS

const controllerContact = {};
var nodemailer = require("nodemailer");

//ACA ME REDIRECCIONA AL FORMULARIO DE CONTACTO PERO DEL USUARIO
controllerContact.addContactForm = (req, res) => {
  res.render("../views/contact");
};
// ENVIA DATOS DEL FORMULARIO DE CONTACTO
controllerContact.addContact = (req, res) => {
  const data = req.body;
  console.log(req.body);
  req.getConnection((err, connection) => {
    connection.query("INSERT INTO contacto set ?", data, (err, contacto) => {
      if (err) {
        console.log(err);
        return res.send("error al valorar");
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
				
        //TEXTO Y ENVIO DE EMAIL
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
				
        //FUNCION PARA ENVIAR EL EMAIL
        smtpTransport.sendMail(mailOptions, function(error, response) {
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
