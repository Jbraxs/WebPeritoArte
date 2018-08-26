const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: '/src/public/img_clientes/'})

const controllerUser = require('../controllers/adminController');
const controllerVal = require('../controllers/adminValuations');

//RUTAS Y CONTROLADORES
//ADMINISTRADOR
//MUESTRA LOS USUARIOS REGISTRADOS
router.get('/admin_user', controllerUser.selectUser);
//AÑADIR USUARIOS
router.post('/add', controllerUser.addUser);
//ME TRAE EL USUARIO QUE QUIERO MODIFICAR A OTRA VIEW
router.get('/update/:id', controllerUser.viewsUser);
//MODIFICA DATOS DE LOS USUARIOS 
router.post('/update/:id', controllerUser.editUser);
//ELIMINAR USUARIOS 
router.get('/delete/:id', controllerUser.delUser);
//FORMULARIO DE CONTACTO, SOLO PEDIR INFORMACION POR CORREO ELECTRONICO
router.post('/addContacto', controllerUser.addContact);
//MUESTRA LOS DATOS DEL FORMULARIO DE CONTACTO 
router.get('/veoFormcontacto', controllerUser.contactForm);
//MUESTRA TODAS LA VALORACIONES DE LOS CLIENTES
router.get('/views_valuations',controllerVal.viewValuations);
//AÑADE VALORACIONES
router.post('/insert_valuations',controllerVal.addValuations);

//PREGUNTAR SI ES CORRECTO
router.get('/registro', function (req, res) {
    res.render('registro');
});
router.get('/contacto', function (req, res) {
    res.render('contacto');
});
router.get('/valoraciones', function (req, res) {
    res.render('valoraciones');
});


module.exports = router;

