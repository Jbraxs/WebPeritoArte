const router = require('express').Router();

const Controller = require('../controllers/adminController');

//RUTAS Y CONTROLADORES
//MUESTRA LOS USUARIOS REGISTRADOS
router.get('/admin_user', Controller.selectUser);
//AÑADIR USUARIOS
router.post('/add', Controller.addUser);
//ME TRAE EL USUARIO QUE QUIERO MODIFICAR A OTRA VIEW
router.get('/update/:id', Controller.viewsUser);
//MODIFICA DATOS DE LOS USUARIOS 
router.post('/update/:id', Controller.editUser);
//ELIMINAR USUARIOS 
router.get('/delete/:id', Controller.delUser);
//FORMULARIO DE CONTACTO, SOLO PEDIR INFORMACION POR CORREO ELECTRONICO
router.post('/addContacto', Controller.addContact);
//MUESTRA LOS DATOS DEL FORMULARIO DE CONTACTO 
router.get('/prueba', Controller.contactForm);


//PREGUNTAR SI ES CORRECTO
router.get('/registro', function (req, res) {
    res.render('registro');
});
router.get('/contacto', function (req, res) {
    res.render('contacto');
});


module.exports = router;

