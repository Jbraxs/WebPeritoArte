// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// USUARIOS



const controllerUser = {};
var bcrypt = require('bcrypt-nodejs');


//CON ESTO ME REDIRECCIONA A LA PLANTILLA. 
controllerUser.registerform = (req, res) => {
    res.render('register');
};
//INSERTA DATOS PARA EL REGISTRO, ENCRIPTANDO LA CONTRASEÑA 
controllerUser.register = (req, res) => {
    let data = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(data.password, salt, null, function (err, hash) {
            data.password = hash;
            console.log(hash);
            req.getConnection((err, connection) => {
                connection.query('INSERT INTO usuario set ?', data, (err, clientes) => {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }
                    req.session.user = {
                        'id': clientes.insertId,
                        'user': data.name,
                        'email': data.email
                    }
                    console.log(clientes);
                    res.redirect('register');
                })
            })
        })
    })
};

//CON ESTO ME REDIRECCIONA A LA PLANTILLA.
controllerUser.loginForm = (req, res) => {
    res.render('login');
};
// LOGIN DE USUARIO
controllerUser.login = (req, res) => {
    req.getConnection((err, connection) => {
        let sql = `SELECT * FROM usuario where email ='${req.body.email}'`;
        connection.query(sql, function (err, usuario) {
            console.log(usuario);
            if (err) {
                return res.send(err);
            }
            if (usuario == "") {
                return res.send('Email introducido no válido');
            } 
            
             else { 
                 bcrypt.compare(req.body,password, usuario.password,  function (err, result) {
                     if (err) {
                         return res.send(err);
                    } else {
                        if (result) {
                            req.session.usuario = {
                                'id': usuario[0].id,
                                'nombre': usuario[0].nombre,
                                'email':usuario[0].email
                            };
                            res.redirect("./admin/users_add");
                        }else {
                            return res.send('La contraseña no es correcta')
                        }
                        
                    };
                    
                })
            }
        })
    })
};





module.exports = controllerUser;