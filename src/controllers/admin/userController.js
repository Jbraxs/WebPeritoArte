// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
// USUARIOS

const adminControllerUser = {};
let bcrypt = require("bcrypt-nodejs");
let nodemailer = require("nodemailer");

//MUESTRA LOS USUARIOS REGISTRADOS
adminControllerUser.selectUser = (req, res) => {
  let usuario = req.session.user;
  req.getConnection((err, connection) => {
    connection.query(
      "SELECT *, DATE_FORMAT(us.fechaNacimiento, '%d/%m/%Y') as fechaNac FROM usuario us", usuario.id,
      (err, clientes) => {
        if (err) {
          res.json(err);
        }
        res.render("admin/users", {
          data: clientes,
          usuario: req.session.user

        });
      }
    );
  });
};

//ACA ME REDIRECCIONA A LA PLANTILLA PERO DEL ADMIN.
adminControllerUser.addUserForm = (req, res) => {
  res.render("./admin/users_add", { usuario: req.session.user });

};
//INSERTA DATOS PARA EL REGISTRO DESDE EL PANEL DEL ADMIN, ENCRIPTANDO LA CONTRASEÑA
adminControllerUser.addUser = (req, res) => {
  let data = req.body;
  let fecha = data.fechaNacimiento.split("/");
  data.fechaNacimiento = fecha[2] + "/" + fecha[1] + "/" + fecha[0];
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(data.password, salt, null, function (err, hash) {
      data.password = hash;
      req.getConnection((err, connection) => {
        connection.query("INSERT INTO usuario set ?", data, (err, result) => {
          if (err) {

            console.log(data, err);
            console.log(req.session.user);
            res.render('../views/errores/error409');
          } else {
            //ASIGNO IDUSUARIO GUARDADO
            data.id = result.insertId;
            //ASIGNO DATOS DE USUARIO A LA SESION
            req.session.user = data;
            console.log(data);
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
              to: data.email,
              subject: "Alexis Navas - Perito | alexisnavas.com",
              html:
                "Hola &nbsp;" +
                data.nombre +
                ", <br> <br>" +
                'Por su seguridad, haga click en el siguiente enlace para modificar su contraseña<br><br>' +
                'http://localhost:100/zonacliente/rememberpass/update/' + data.id + '<br><br> Gracias y un saludo.'
            };

            //FUNCION PARA ENVIAR EL EMAIL
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
              } else {
                console.log("El correo se envio correctamente");
              }
            });
            // CIERRO EL ENVIO DEL EMIAL
            smtpTransport.close();
            //REDIRECCIONO A LA RUTA
            res.redirect("/index_signin");
          }
        });
      });
    });
  });
};

//VISTA LOS DATOS A MODIFICAR
adminControllerUser.viewsUser = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM usuario WHERE id = ?",
      [id],
      (err, rows) => {
        res.render("./admin/user_edit", {
          data: rows[0],
          usuario: req.session.user
        });
      }
    );
  });
};
//MODIFICA LOS DATOS
adminControllerUser.editUser = (req, res) => {
  const { id } = req.params;
  const newUsuario = req.body;
  req.getConnection((err, connection) => {
    connection.query("UPDATE usuario set ? where id = ?", [newUsuario, id], (err, rows) => {
      res.redirect("/admin/users");
    }
    );
  });
};
//ELIMINA DATOS
adminControllerUser.delUser = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query("DELETE FROM usuario WHERE id = ?", [id], (err, rows) => {
      res.redirect("/admin/users");
    });
  });
};

//VER USUARIOS REGISTADOS CONTADOR
adminControllerUser.selectUserRegister = (req, res) => {
  let usuario = req.session.user;
  req.getConnection((err, connection) => {
    connection.query("select COUNT(*) FROM usuario;", usuario, (err, clientes) => {
        if (err) {
          res.json(err);
        }
        res.render("admin/users", {
          data: clientes,
          usuario: req.session.user

        });
      }
    );
  });
};


module.exports = adminControllerUser;
