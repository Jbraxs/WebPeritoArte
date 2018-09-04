// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
//CONTACTOS


const controllerContact = {};
var nodemailer = require('nodemailer');


//ACA ME REDIRECCIONA AL FORMULARIO DE CONTACTO PERO DEL USUARIO
controllerContact.addContactForm = (req, res) => {
    res.render("../views/contact");
};
// ENVIA DATOS DEL FORMULARIO DE CONTACTO
controllerContact.addContact = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
        connection.query('INSERT INTO contacto set ?', data, (err, contacto) => {
            if (err) {
                console.log(err);
                return res.send("error al valorar");
            } else {
                var smtpTransport = nodemailer.createTransport("SMTP", {
                    service: "Gmail",
                    auth: {
                        user: "pruebawebperitoarte@gmail.com",
                        pass: "pruebawebperitoarte12345"
                    }
                });

                // setup e-mail data with unicode symbols
                var mailOptions = {
                    from: "pruebawebperitoarte@gmail.com", // sender address
                    to: "muydespacito@hotmail.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world ✔", // plaintext body
                    html: "<b>Hello world ✔</b>" // html body
                }

                // send mail with defined transport object
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Message sent: " + response.message);
                    }
                });
                smtpTransport.close();
            }
            res.redirect('/contact');
        })
    })
};

module.exports = controllerContact;
