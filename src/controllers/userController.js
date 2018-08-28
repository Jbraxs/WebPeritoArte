// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// USUARIOS



const controllerUser = {};
var bcrypt = require('bcrypt-nodejs');


controllerUser.registerform = (req,res) => {
    //ACA ME REDIRECCIONA A LA PLANTILLA. 
    res.render('register');
};
//INSERTA DATOS PARA EL REGISTRO, ENCRIPTANDO LA CONTRASEÑA 
controllerUser.register = (req,res) =>{
    let data = req.body;
    bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(data.password,salt,null,function(err,hash){
        data.password = hash;
        console.log(hash);
        req.getConnection((err,connection) => {
          connection.query('INSERT INTO usuario set ?',data,(err,clientes) =>{
            if (err){
              console.log(err);
              return res.send(err);
            }
            // req.session.user = {
            //     'id':clientes.insertId,
            //     'user': data.name,
            //     'email': data.email
            // }
            console.log(clientes);
            res.redirect('register');          
          })
        })
      })
    })
  };
  

  module.exports = controllerUser;