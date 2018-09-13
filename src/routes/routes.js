const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './src/public/img_clientes/' });


const auth = function (req, res, next) {
    if (req.session && req.session.admin){
        return next();
    } else {
        return res.render('../views/errores/error401');
    }  
};
//RECORDAR PONER LAS AUTENTIFICACIONES EN LA PARTE DE ADMIN!!
// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
const adminControllerUser = require('../controllers/admin/userController');
const adminControllerContact = require('../controllers/admin/contactController');
const adminControllerValuation = require('../controllers/admin/valuationController');
// USUARIOS 
router.get('/admin/users',auth, adminControllerUser.selectUser);
router.get('/admin/users/add',auth, adminControllerUser.addUserForm);
router.post('/admin/users/add',auth, adminControllerUser.addUser);
router.get('/admin/users/update/:id',auth, adminControllerUser.viewsUser);
router.post('/admin/users/update/:id',auth, adminControllerUser.editUser);
router.get('/admin/users/delete/:id',auth, adminControllerUser.delUser);
router.get('/admin/users',auth, adminControllerUser.selectUserRegister);
//CONTACTOS
router.get('/admin/contacts',auth, adminControllerContact.selecContact);
router.get('/admin/contacts/delete/:id',auth, adminControllerContact.delContact);
router.get('/admin/contacts/view/:id',auth, adminControllerContact.viewContact);
router.get('/admin/contacts/view/:id',auth, adminControllerContact.answerContactForm);
router.post('/admin/contacts/view/:id',auth, adminControllerContact.answerContact);
//VALORACIONES
router.get('/admin/valuations',auth, adminControllerValuation.selectValuation);
router.get('/admin/valuations/delete/:id',auth, adminControllerValuation.delValuation);
router.get('/admin/valuations/estimate/:id',auth, adminControllerValuation.estimateValuation);
router.get('/admin/valuations/rates/add_auto',auth, adminControllerValuation.addAutoRates);



//CONTROLADORES DEL USUARIO
//USUARIOS 
const controllerUser = require('../controllers/userController');
router.get('/register', controllerUser.registerform);
router.post('/register', controllerUser.register);
router.get('/login', controllerUser.loginForm);
router.post('/login', controllerUser.login);
router.get('/logout', controllerUser.logout);
router.get('/zonacliente/user', controllerUser.selectUser);
router.get('/zonacliente/data/update/:id', controllerUser.viewsUser);
router.post('/zonacliente/data/update/:id', controllerUser.editUser);
router.get('/zonacliente/contact', controllerUser.addContactForm);
router.post('/zonacliente/contact', controllerUser.addContact);
//RECORDAR CONTRASEÑA
const controllerUserPass = require('../controllers/userRememberPass');
router.get('/zonacliente/rememberpass',controllerUserPass.rememberPassForm);
router.post('/zonacliente/rememberpass',controllerUserPass.rememberPass);
router.get('/zonacliente/rememberpass/update/:id', controllerUserPass.viewsUserPass);
router.post('/zonacliente/rememberpass/update/:id',controllerUserPass.editPass);
//VALORACIONES
const controllerValuation = require('../controllers/valuationController');
router.get('/zonacliente/valuations', controllerValuation.selectValuation);
router.get('/zonacliente/valuations/add',multipartMiddleware, controllerValuation.addValuationForm);
router.post('/zonacliente/valuations/add',multipartMiddleware, controllerValuation.addValuation);
router.get('/zonacliente/valuations/delete/:id', controllerValuation.delValuation);


//CONTROLADORES DEL CONTACTO 
//FORMULARIO DE CONTACTO
const controllerContact = require('../controllers/contactController');
router.get('/contact', controllerContact.addContactForm);
router.post('/contact', controllerContact.addContact);



// RUTAS COMUNES
router.get('/admin', auth, function (req, res) {
        res.render('admin/admin', {usuario: req.session.user});
});
router.get('/zonacliente', function (req, res) {
    res.render('zonacliente/zonacliente', {usuario: req.session.user});
});
router.get('/index', function (req, res) {
    res.render('../views/index');
});

router.get('/index_signin', function (req, res) {
    res.render('../views/index_login', {
        data: req.session.user,
        usuario: req.session.user
    });
});

module.exports = router;

