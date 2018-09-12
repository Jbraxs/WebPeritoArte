// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// USUARIOS

const controllerUser = {};
let bcrypt = require("bcrypt-nodejs");
let nodemailer = require("nodemailer");

//CON ESTO ME REDIRECCIONA A LA PLANTILLA.
controllerUser.registerform = (req, res) => {
  res.render("register");
};

//INSERTA DATOS PARA EL REGISTRO, ENCRIPTANDO LA CONTRASEÑA
controllerUser.register = (req, res) => {
  let dato = req.body;
  let fecha = dato.fechaNacimiento.split("/");
  dato.fechaNacimiento = fecha[2] + '/' + fecha[1] + '/' + fecha[0]; 
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(dato.password, salt, null, function(err, hash) {
      dato.password = hash;
      req.getConnection((err, connection) => {
        connection.query("INSERT INTO usuario set ?", dato, (err, result) => {
          if (err) {
            res.render('../views/errores/error409');
          } else {
            //ASIGNO IDUSUARIO GUARDADO 
            dato.id = result.insertId;
            //ASIGNO DATOS DE USUARIO A LA SESION
            req.session.user = dato;

             //SERVIDOR EMAIL 
            let smtpTransport = nodemailer.createTransport({
              host:'smtp.gmail.com',
              port:465,
              secure:true,
              auth: {
                user: "pruebawebperitoarte@gmail.com",
                pass: "pruebawebperitoarte12345"
              }
              });
              //TEXTO Y ENVIO DE EMAIL
              let mailOptions = {
              from: "pruebawebperitoarte@gmail.com",
              to: dato.email,
              subject: "Alexis Navas - Perito | alexisnavas.com",
              html: 'Hola &nbsp;' + dato.nombre + ', <br> <br>' + 'Recuerda que en tu zona cliente, puedes realizar la valoración económica que necesites. <br><br>' 
              + 'Gracias por registrarte.' 
              };
              //FUNCION PARA ENVIAR EL EMAIL
              smtpTransport.sendMail(mailOptions, function(error, response) {
              if (error) {
                console.log(error);
              } else {
                console.log('El correo se envio correctamente');
              }
              });
              //CIERRO EL ENVIO DEL EMIAL
              smtpTransport.close();

            //REDIRECCIONO A LA RUTA 
            res.redirect("/index_signin");
          }
        });
      });
    });
  });
};

//CON ESTO ME REDIRECCIONA A LA PLANTILLA.
controllerUser.loginForm = (req, res) => {
  res.render("login");
};
// LOGIN DE USUARIO
controllerUser.login = (req, res) => {
  req.session.user = { id: 39, nombre: '2', email: '2' };
  const email = req.body.email;
  req.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM usuario WHERE email = ?`, email, function(err, result) {
        if (err) {
          res.render('../views/errores/errorlogin');
        }
        if (result == "") {
          res.render('../views/errores/errorlogin');
           
        } else {
          bcrypt.compare(req.body.password, result[0].password, function(err,iguales) {            
            if (err) {
              res.render('../views/errores/errorlogin');
     
            } else {
              if (iguales) {
                req.session.user = {
                  'id': result[0].id,
                  'nombre': result[0].nombre,
                  'email': result[0].email,
                  'isSuperAdmin': result[0].isSuperAdmin
                }
                if (result[0].isSuperAdmin == true){
                  req.session.admin = true;
                }
                res.redirect("/zonacliente/zonacliente");
              } else {
                res.render('../views/errores/error409');
              }
            }
          });
        }
      }
    );
  });
};
// LOGOUT DE USUARIO
controllerUser.logout = (req, res) => {
  if(req.session.user){
    console.log(req.session.destroy);
      req.session.destroy();
  }
    res.redirect('/login');
   
};
//VER DATOS PERSONALES DE UN USUARIO
controllerUser.selectUser = (req, res) => {
  // req.session.user = { id: 39, nombre: '2', email: '2' };
  req.session.user = { id: 53, nombre: '5', email: '5' };
  let usuario = req.session.user;
  req.getConnection((err, connection) => {
    connection.query("SELECT *, DATE_FORMAT(us.fechaNacimiento, '%d/%m/%Y') as fechaNac FROM usuario us WHERE id = ?",usuario.id, (err, result) => {
      if (err){
        res.json(err);
      }
      res.render("./zonacliente/user",{
        data:result
        //BORRAR
        // usuario: req.session.user 

      });
    });
  });
};

//VISTA LOS DATOS A MODIFICAR
controllerUser.viewsUser = (req,res) => {
  const {id} = req.params;
  // req.session.user = { id: 39, nombre: '2', email: '2' };
  req.session.user = { id: 53, nombre: '5', email: '5' };
  req.getConnection((err,connection) => {
    connection.query("SELECT * FROM usuario WHERE id = ?", [id], (err,rows) => {
      res.render("../views/zonacliente/user_edit", {
        data:rows[0],
        //borrar
        // usuario: req.session.user
      });
    });
  });
};

//MODIFICA LOS DATOS
controllerUser.editUser = (req, res) => {
  const { id } = req.params;
  const newUsuario = req.body;
  bcrypt.genSalt(10, function (err, salt){
    bcrypt.hash(newUsuario.password, salt,null,function(err,hash){
      newUsuario.password = hash;
      req.getConnection((err, connection) => {
        connection.query("UPDATE usuario set ? where id = ?",[newUsuario, id],(err, rows) => {
          res.redirect("/zonacliente/user");
        });
      });
      });
  });
};

//ACA ME REDIRECCIONA AL FORMULARIO DE CONTACTO PERO DEL USUARIO
controllerUser.addContactForm = (req, res) => {
  res.render("../views/zonacliente/contact",{usuario: req.session.user});
};
// ENVIA DATOS DEL FORMULARIO DE CONTACTO
controllerUser.addContact = (req, res) => {
  const data = req.body;
  req.session.user = { id: 53, nombre: '5', email: '5' };
  req.getConnection((err, connection) => {
    connection.query("INSERT INTO contacto set ?", data,(err, contacto) => {
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
				
        res.redirect("/zonacliente/contact");
       
      }
    });
  });
};


module.exports = controllerUser;
