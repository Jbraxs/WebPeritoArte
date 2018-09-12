// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
//CONTACTOS

const adminControllerContact = {};
var nodemailer = require("nodemailer");

//MUESTRA LAS CONSULTAS POR FORMULARIO DE CONTACTO
adminControllerContact.selecContact = (req, res) => {
  req.session.user = { id: 39, nombre: '2', email: '2' };
  let usuario = req.session.user;
  req.getConnection((err, connection) => {
    connection.query('SELECT * FROM contacto',  usuario.id, (err, contacto) => {
      if (err) {
        res.json(err);
      }
      res.render('admin/contacts', {
        data: contacto,
        
        usuario: req.session.user

      });
    });
  });
};

//ELIMINA LAS CONSULTAS DEL FORMULARIO DE CONTACTO
adminControllerContact.delContact = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query("DELETE FROM contacto WHERE id = ?", [id], (err, rows) => {
      res.redirect("/admin/contacts");
    });
  });
};

//VISTA UNA CONSULLTA DEL FORMULARIO DE CONTACTO 
adminControllerContact.viewContact = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    console.log(id);
    connection.query("SELECT * FROM contacto WHERE id = ?", [id], (err, rows) => {
      res.render("../views/admin/contacts_view", {
        data: rows[0],
        usuario: req.session.user

      });
    });
  });
};
//RECOGE LOS DATOS DEL FORMULARIO PARA RESPONDER
adminControllerContact.answerContactForm = (req, res) =>{
  res.render('../views/admin/contacts_view')

};

//GUARDA EN BD LA RESPUESTA Y ENVIA EL EMAIL.
adminControllerContact.answerContact = (req,res)=>{
  const { id } = req.params;
  req.getConnection((err, connection) => {
    let sql = `INSERT INTO res_contact (idContacto,respuesta) VALUES ('${id}','${req.body.respuesta}')`;
    connection.query(sql,(err,answer) => {
      if(err){
        console.log(err);
        res.render('../views/errores/error409');
      }else {
        console.log(answer);
        data = answer
        
        
        
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
          to: req.body.email,
          subject: "Alexis Navas - Perito | alexisnavas.com",
          html:"Hola &nbsp;" + req.body.nombre +", <br> <br>" + req.body.respuesta
        };
        console.log(req.body.email);
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
        res.redirect("/admin");
      }
    })
  })
};

module.exports = adminControllerContact;