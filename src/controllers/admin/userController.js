// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
// USUARIOS

const adminControllerUser = {};
var bcrypt = require("bcrypt-nodejs");

//MUESTRA LOS USUARIOS REGISTRADOS
adminControllerUser.selectUser = (req, res) => {
  req.getConnection((err, connection) => {
    connection.query("SELECT * FROM usuario", (err, clientes) => {
      if (err) {
        res.json(err);
      }
      res.render("admin/users", {
        data: clientes
      });
    });
  });
};

//ACA ME REDIRECCIONA A LA PLANTILLA PERO DEL ADMIN.
adminControllerUser.addUserForm = (req, res) => {
  res.render("./admin/users_add");
};
//INSERTA DATOS PARA EL REGISTRO DESDE EL PANEL DEL ADMIN, ENCRIPTANDO LA CONTRASEÑA
adminControllerUser.addUser = (req, res) => {
  let data = req.body;
  let fecha = data.fechaNacimiento.split("/");
  data.fechaNacimiento = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(data.password, salt, null, function (err, hash) {
      data.password = hash;
      console.log(hash);
      req.getConnection((err, connection) => {
        connection.query("INSERT INTO usuario set ?", data, (err, result) => {
          if (err) {
            console.log(err);
            return res.send(err);
          } else {
            //ASIGNO IDUSUARIO GUARDADO 
            dato.id = result.insertId;
            //ASIGNO DATOS DE USUARIO A LA SESION
            req.session.user = dato;
            //REDIRECCIONO A LA RUTA 
            res.redirect("./index_signin");
          }
        });
      })
    });
  });
};

//VISTA LOS DATOS A MODIFICAR
adminControllerUser.viewsUser = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query("SELECT * FROM usuario WHERE id = ?",[id],(err, rows) => {
        res.render("./admin/user_edit", {
          data: rows[0]
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
    connection.query("UPDATE usuario set ? where id = ?", [newUsuario, id],(err, rows) => {
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

module.exports = adminControllerUser;
