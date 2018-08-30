// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// USUARIOS

const controllerUser = {};
var bcrypt = require("bcrypt-nodejs");

//CON ESTO ME REDIRECCIONA A LA PLANTILLA.
controllerUser.registerform = (req, res) => {
  res.render("register");
};
//INSERTA DATOS PARA EL REGISTRO, ENCRIPTANDO LA CONTRASEÑA
controllerUser.register = (req, res) => {
  let dato = req.body;
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
                console.log('estas logeado correctamente');
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
  }else{
      return res.send('No existe un login de usuario')
  }
};


module.exports = controllerUser;
