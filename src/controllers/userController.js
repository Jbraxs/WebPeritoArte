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
            return res.send(err);
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
              html: 'Hola &nbsp;' + dato.nombre + ', <br> <br>' + 'Recuerda que en tu zona cliente, puedes realizar la valoracion económica que necesites. <br><br>' 
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
  const email = req.body.email;
  req.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM usuario WHERE email = ?`, email, function(err, result) {
        if (err) {
          return res.send(err);
        }
        if (result == "") {
          return res.send("Email introducido no válido");
        } else {
          bcrypt.compare(req.body.password, result[0].password, function(err,iguales) {            
            if (err) {
            return res.send(err);
            } else {
              if (iguales) {
                req.session.user = {
                  'id': result[0].id,
                  'nombre': result[0].nombre,
                  'email': result[0].email
                }
                if (result[0].isSuperAdmin == true){
                  req.session.admin = true;
                }
                console.log('estas logeado correctamente');
                console.log(req.session, result);
                res.redirect("/index_signin");
              } else {
                return res.send("La contraseña NO es correcta");
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
  req.session.user = { id: 39, nombre: '2', email: '2' };
  let usuario = req.session.user;
  req.getConnection((err, connection) => {
    connection.query('SELECT * FROM usuario WHERE id = ? ',usuario.id, (err, result) => {
      if (err){
        res.json(err);
      }
      res.render("zonacliente/index_zonacliente",{
        data:result
      });
    });
  });
};

//VISTA LOS DATOS A MODIFICAR
controllerUser.viewsUser = (req,res) => {
  const {id} = req.params;
  req.getConnection((err,connection) => {
    connection.query("SELECT * FROM usuario WHERE id = ?", [id], (err,rows) => {
      res.render("../views/zonacliente/user_edit", {
        data:rows[0]
      });
    });
  });
};

//MODIFICA LOS DATOS
controllerUser.editUser = (req, res) => {
  const { id } = req.params;
  const newUsuario = req.body;
  req.getConnection((err, connection) => {
    connection.query("UPDATE usuario set ? where id = ?",[newUsuario, id],(err, rows) => {
      console.log(newUsuario);
      res.redirect("/zonacliente");
      }
    );
  });
};
module.exports = controllerUser;
