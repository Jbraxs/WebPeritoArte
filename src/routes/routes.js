const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: '/src/public/img_clientes/'})
/*
RUTAS Y CONTROLADORES
CONTROLADORES DEL ADMIN
const adminControllerUser = require('../controllers/admin/userController');
const adminControllerContact = require('../controllers/admin/contactController');
const adminControllerValuation = require('../controllers/admin/valuationController');
USUARIOS 
router.get('/admin/users', adminControllerUser.selectUser);
router.get('/admin/users/add', adminControllerUser.addUser);
router.post('/admin/users/add', adminControllerUser.addUser);
router.get('/admin/users/update/:id', adminControllerUser.viewsUser);
router.post('/admin/users/update/:id', controadminControllerUserllerUser.editUser);
router.get('/admin/users/delete/:id', adminControllerUser.delUser);
//CONTACTOS
router.get('/admin/contacts', adminControllerContact.selecContact);
router.get('/admin/contacts/delete/:id', adminControllerContact.delContact);FALTA HACER
router.get('/admin/contacts/view/:id', adminControllerContact.viewContact); FALTA POR HACER
VALORACIONES
router.get('/admin/valuations', adminControllerValuation.selectValuation);
router.get('/admin/valuations/view/:id', adminControllerValuation.viewValuation);
router.get('/admin/valuations/delete/:id', adminControllerValuation.delValuation);
router.get('/admin/valuations/assess/:id', adminControllerValuation.assessValuation); FALTAR POR HACER 
router.get('/admin/valuations/schedule/:id', adminControllerValuation.scheduleValuation); FALTA POR HACER 
*/
 
//CONTROLADORES DEL USUARIO
//USER 
const controllerUser = require('../controllers/userController');
router.get('/register',controllerUser.registerform);
router.post('/register',controllerUser.register);
// router.get('/login',controllerUser.login);
// router.post('/login',controllerUser.login);
// router.get('/logout',controllerUser.logout);
//VALORACIONES
// const controllerValuation = require('../controller/valuationController');
// router.get('/zonaCliente/valuations', controllerValuation.selectValuation);
// router.get('/zonaCliente/valuations/add', controllerValuation.addValuation);
// router.post('/zonaCliente/valuations/add', controllerValuation.addValuation);
// router.get('/zonaCliente/valuations/delete/:id', controllerValuation.delValuation);
// router.get('/zonaCliente/valuations/assess/:id', controllerValuation.assessValuation);

//CONTROLADORES DEL CONTACTO 
//FORMULARIO DE CONTACTO
// const controllerContact = require('../controller/contactController');
// router.get('/contact', controllerContact.addContact);
// router.post('/contact', controllerContact.addContact);








// router.get('/', function (req, res) {
//     res.render('index');
// });
// router.get('/contacto', function (req, res) {
//     res.render('contacto');
// });
// router.get('/valoraciones', function (req, res) {
//     res.render('valoraciones');
// });


module.exports = router;

