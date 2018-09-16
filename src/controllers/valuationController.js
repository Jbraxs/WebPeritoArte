// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// VALORACIONES

const controllerValuation = {};
const fs = require('fs');
let nodemailer = require("nodemailer");

//CONSULTA LAS VALORACIONES REALIZADAS
controllerValuation.selectValuation = (req, res) => {
    let sql = 'SELECT obj.id, obj.valor_estimativo, obj.nombre, cat.nombre as categoria, tec.nombre as tecnica,'
    sql += 'tip.nombre as tipo_objeto, tam.medida as tamanio, est.nombre as estado, con.nombre as conservacion, '
    sql += 'obj.firmado, obj.comentario, obj.imagen '
    sql += 'FROM alexis_navas.objeto obj '
    sql += 'INNER JOIN categoria cat ON obj.idCategoria = cat.id '
    sql += 'INNER JOIN tecnica tec ON obj.idTecnica = tec.id '
    sql += 'INNER JOIN tipo_objeto tip ON obj.idTipoObjeto = tip.id '
    sql += 'INNER JOIN tamanio tam ON obj.idTamanio = tam.id '
    sql += 'INNER JOIN estado_peritaje est ON obj.idEstadoPeritaje = est.id '
    sql += 'INNER JOIN conservacion con ON obj.idConservacion = con.id WHERE idUsuario = ? '
    let usuario = req.session.user;
    req.getConnection((err, connection) => {
        connection.query(sql, usuario.id, (err, valuations) => {
            if (err) {
                res.json(err);
            }
        
            res.render("zonacliente/valuations", {
                valuations: valuations,
                usuario: req.session.user
            })
        })
    })
};
//AÑADE VALORACIONES FORMULARIO
controllerValuation.addValuationForm = (req, res) => {
    let usuario = req.session.user;
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM categoria', (err, categorias) => {
            connection.query('SELECT * FROM tipo_objeto', (err, tipo_objetos) => {
                connection.query('SELECT * FROM tecnica', (err, tecnicas) => {
                    connection.query('SELECT * FROM tamanio', (err, tamanios) => {
                        connection.query('SELECT * FROM conservacion', (err, conservacions) => {
                            res.render("zonacliente/valuations_add", {
                                categorias: categorias,
                                tipo_objetos: tipo_objetos,
                                tecnicas: tecnicas,
                                tamanios: tamanios,
                                conservacions: conservacions,
                                usuario: req.session.user
                            });
                        });
                    });
                });
            });
        });
    });
};
//AÑADE VALORACIONES 
controllerValuation.addValuation = (req, res) => {
    const usuario = req.session.user;
    let oldPath = req.files.imagen.path;
    let newPath = __dirname + '/../public/img_clientes/' + usuario.id + '-' + req.files.imagen.originalFilename;
    fs.rename(oldPath, newPath, function (err) {
    });
    req.getConnection((err, connection) => {
        let sql = `INSERT INTO objeto (idUsuario,nombre,idCategoria,idTipoObjeto,idTecnica,idTamanio,firmado,comentario,IdConservacion,idEstadoPeritaje,imagen) VALUES 
            ('${usuario.id}','${req.body.nombre}','${req.body.categoria_id}','${req.body.tipoObjeto_id}','${req.body.tecnica_id}','${req.body.tamanio_id}',
            '${req.body.firmado_id}','${req.body.comentario}','${req.body.conservacion_id}','1','${req.files.imagen.originalFilename}')`;
        connection.query(sql, (err, valuations) => {
            if (err) {
             console.log(err);
                res.render('../views/errores/error409')
            }
            
          // //SERVIDOR EMAIL
          let smtpTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "pruebawebperitoarte@gmail.com",
              pass: "pruebawebperitoarte12345"
            }
          });

          //TEXTO Y ENVIO DE EMAIL
          let mailOptions = {
            from: "pruebawebperitoarte@gmail.com",
            to: usuario.email,
            subject: "Alexis Navas - Perito | alexisnavas.com",
            html: 'Gracias por solicitar la estimación económica.<br><br>' + 
            'En la mayor brevedad posible, el Dc. Alexis Navas realizara su estimación. <br><br>' + 
            'Reciba un cordial saludo.'
         };

          //FUNCION PARA ENVIAR EL EMAIL
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
            } else {
              console.log("El correo se envio correctamente");
            }
          });

          //CIERRO EL ENVIO DEL EMIAL
          smtpTransport.close();

            res.redirect('/zonacliente/valuations');

        })
    })
};
//ELIMINA VALORACIONES
controllerValuation.delValuation = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM objeto WHERE id = ?", [id], (err, rows) => {
            res.redirect("/zonacliente/valuations")
        });
    });

};



module.exports = controllerValuation;