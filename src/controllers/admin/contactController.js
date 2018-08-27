// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
//CONTACTOS

const adminControllerContact = {};

//MUESTRA LAS CONSULTAS POR FORMULARIO DE CONTACTO
adminControllerContact.selecContact = (req, res) => {
  req.getConnection((err, connection) => {
    connection.query('SELECT * FROM contacto', (err, contacto) => {
      if (err) {
        res.json(err);
      }
      res.render('admin/contacts', {
        data: contacto
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
        data: rows[0]
      });
    });
  });
};

module.exports = adminControllerContact;
