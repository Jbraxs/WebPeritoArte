const router = require('express').Router();
const fs = require('fs');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './public/img_clientes/' })
const auth = function (req, res, next) {
    if (req.session.user)
        return next();
    else
        return res.sendStatus(404);
};

// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
const adminControllerUser = require('../controllers/admin/userController');
const adminControllerContact = require('../controllers/admin/contactController');
const adminControllerValuation = require('../controllers/admin/valuationController');
// USUARIOS 
router.get('/admin/users', adminControllerUser.selectUser);
router.get('/admin/users/add', adminControllerUser.addUserForm);
router.post('/admin/users/add', adminControllerUser.addUser);
router.get('/admin/users/update/:id', adminControllerUser.viewsUser);
router.post('/admin/users/update/:id', adminControllerUser.editUser);
router.get('/admin/users/delete/:id', adminControllerUser.delUser);
//CONTACTOS
router.get('/admin/contacts', adminControllerContact.selecContact);
router.get('/admin/contacts/delete/:id', adminControllerContact.delContact);
router.get('/admin/contacts/view/:id', adminControllerContact.viewContact);
// VALORACIONES
router.get('/admin/valuations', adminControllerValuation.selectValuation);
router.get('/admin/valuations/view/:id', adminControllerValuation.viewValuation);
// router.get('/admin/valuations/assess/:id', adminControllerValuation.assessValuation); FALTAR POR HACER 
// router.get('/admin/valuations/schedule/:id', adminControllerValuation.scheduleValuation); FALTA POR HACER 


//CONTROLADORES DEL USUARIO
//USUARIOS 
const controllerUser = require('../controllers/userController');
router.get('/register', controllerUser.registerform);
router.post('/register', controllerUser.register);
router.get('/login', controllerUser.loginForm);
router.post('/login', controllerUser.login);
router.get('/logout', controllerUser.logout);
router.get('/zonacliente', controllerUser.selectUser);
router.get('/zonacliente/data/update/:id', controllerUser.viewsUser);
router.post('/zonacliente/data/update/:id', controllerUser.editUser);
//VALORACIONES
const controllerValuation = require('../controllers/valuationController');
router.get('/zonacliente/valuations', controllerValuation.selectValuation);
router.get('/zonacliente/valuations/add',multipartMiddleware, controllerValuation.addValuationForm);
router.post('/zonacliente/valuations/add',multipartMiddleware, controllerValuation.addValuation);
router.get('/zonacliente/valuations/delete/:id', controllerValuation.delValuation);
// router.get('/zonacliente/valuations/assess/:id', controllerValuation.assessValuation);

//CONTROLADORES DEL CONTACTO 
//FORMULARIO DE CONTACTO
const controllerContact = require('../controllers/contactController');
router.get('/contact', controllerContact.addContactForm);
router.post('/contact', controllerContact.addContact);




// RUTAS COMUNES
router.get('/admin', function (req, res) {
    res.render('admin/admin');
});
router.get('/', function (req, res) {
    res.render('../views/index');
});

router.get('/index_signin', auth, function (req, res) {
    res.render('../views/index_login', {
        data: req.session.user
    });
});

module.exports = router;

