const controllerUser = {};
var bcrypt = require('bcrypt-nodejs');

//CONSULTA LOS USUARIOS REGISTRADOS
controllerUser.selectUser = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario', (err, clientes) => {
      if (err) {
        res.json(err);
      }
      res.render('admin_user', {
        data: clientes
      })
    })
  })
};
//prueba
controllerUser.addUser = (req,res) =>{
  const data = req.body;
  const password = req.body.password;
  console.log(password);
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password,salt,null,function(err,hash){
      password = hash;
      console.log(hash);
      req.getConnection((err,connection) => {
        connection.query('INSERT INTO usuario set ?',data,(err,clientes) =>{
          if (err){
            console.log(err);
            return res.send(err);
          }
          else {
            let dato = {
              id: clientes.insertId,
              body: req.body
            }
          
          console.log(clientes);
          res.redirect('registro');          
        }
        })
      })
    })
  })
};
//INSERTAR USUARIOS
// ControllerUser.addUser = (req, res) => {
//   const data = req.body;
//   console.log(req.body)
//   req.getConnection((err, connection) => {
//     const query = connection.query('INSERT INTO usuario set ?', data, (err, clientes) => {
//       console.log(clientes)
//       res.redirect('registro');
//     })
//   })
// };
    //VISTA LOS DATOS A MODIFICAR
    controllerUser.viewsUser = (req, res) => {
      const { id } = req.params;
      req.getConnection((err, conn) => {
        conn.query("SELECT * FROM usuario WHERE id = ?", [id], (err, rows) => {
          res.render('cliente_edit', {
            data: rows[0]
          })
        });
      });
    };
    //MODIFICA LOS DATOS 
    controllerUser.editUser = (req, res) => {
      const { id } = req.params;
      const newUsuario = req.body;
      req.getConnection((err, conn) => {

        conn.query('UPDATE usuario set ? where id = ?', [newUsuario, id], (err, rows) => {
          res.redirect('/admin_user');
        });
      });
    };
    //ELIMINA DATOS
    controllerUser.delUser = (req, res) => {
      const { id } = req.params;
      req.getConnection((err, connection) => {
        connection.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows) => {
          res.redirect('/admin_user');
        });
      });
    };
    // ENVIA DATOS DEL FORMULARIO DE CONTACTO
    controllerUser.addContact = (req, res) => {
      const data = req.body;
      console.log(req.body)
      req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO contacto set ?', data, (err, contacto) => {
          console.log(contacto)
          res.redirect('/contacto');
        })
      })
    };
    controllerUser.contactForm = (req, res) => {
      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM contacto', (err, contacto) => {
          if (err) {
            res.json(err);
          }
          res.render('veoFormcontacto', {
            data: contacto
          });
        });
      });
    }

  module.exports = controllerUser;
