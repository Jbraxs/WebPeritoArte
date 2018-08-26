const controller = {};

//CONSULTA DATOS DESDE EL PANEL DEL ADMINISTRADOR 
controller.selectUser = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM usuario', (err, clientes) => {
      if (err) {
        res.json(err);
      }
      res.render('admin_user', {
        data: clientes
      });
    });
  });
};
//INSERTAR USUARIOS
controller.addUser = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO usuario set ?', data, (err, clientes) => {
      console.log(clientes)
      res.redirect('registro');
    })
  })
};
//VISTA LOS DATOS A MODIFICAR
controller.viewsUser = (req, res) => {
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
controller.editUser = (req, res) => {
  const { id } = req.params;
  const newUsuario = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE usuario set ? where id = ?', [newUsuario, id], (err, rows) => {
    res.redirect('/admin_user');
  });
  });
};
//ELIMINA DATOS
controller.delUser = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows) => {
      res.redirect('/admin_user');
    });
  });
};
// ENVIA DATOS DEL FORMULARIO DE CONTACTO
controller.addContact = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO contacto set ?', data, (err, contacto) => {
      console.log(contacto)
      res.redirect('/contacto');
    })
  })
};
controller.contactForm = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM contacto', (err, contacto) => {
      if (err) {
        res.json(err);
      }
      res.render('/', {
        data: contacto
      });
    });
  });
};
module.exports = controller;
