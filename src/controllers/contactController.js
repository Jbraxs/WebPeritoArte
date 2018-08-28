// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
//CONTACTOS


const controllerContact = {};


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
      console.log(contacto)
      res.redirect('/contact');
    })
  })
};

module.exports = controllerContact;
