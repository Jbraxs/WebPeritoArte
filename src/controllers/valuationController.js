// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// VALORACIONES

const controllerValuation = {};
const fs = require('fs');

//CONSULTA LAS VALORACIONES REALIZADAS
controllerValuation.selectValuation = (req, res) => {
    let sql = 'SELECT obj.id, obj.nombre, cat.nombre as categoria, tec.nombre as tecnica,' 
    sql += 'tip.nombre as tipo_objeto, tam.medida as tamanio, est.nombre as estado, con.nombre as conservacion, '
    sql += 'obj.firmado, obj.comentario, obj.imagen '
    sql += 'FROM alexis_navas.objeto obj '
    sql += 'INNER JOIN categoria cat ON obj.idCategoria = cat.id '
    sql += 'INNER JOIN tecnica tec ON obj.idTecnica = tec.id '
    sql += 'INNER JOIN tipo_objeto tip ON obj.idTipoObjeto = tip.id '
    sql += 'INNER JOIN tamanio tam ON obj.idTamanio = tam.id '
    sql += 'INNER JOIN estado_peritaje est ON obj.idEstadoPeritaje = est.id '
    sql += 'INNER JOIN conservacion con ON obj.idConservacion = con.id WHERE idUsuario = ? '
    req.session.user = { id: 39, nombre: '2', email: '2' };
    req.getConnection((err, connection) => {
        connection.query(sql, req.session.user.id, (err, valuations) => {
            if (err) {
                res.json(err);
            } 
            res.render("zonacliente/valuations", {
                valuations: valuations
            })
        })
    })
};
//AÑADE VALORACIONES FORMULARIO
controllerValuation.addValuationForm = (req, res) => {
    req.session.user = { id: 39, nombre: '2', email: '2' };
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
                                conservacions: conservacions
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
    req.session.user = { id: 39, nombre: '2', email: '2' };
    const usuario = req.session.user;
    let oldPath = req.files.imagen.path;
    let newPath = './public/img_clientes/' + req.files.imagen.originalFilename;
    fs.rename(oldPath,newPath, function (err){
        console.log(req.files.imagen);
    });
    req.getConnection((err, connection) => {
        let sql = `INSERT INTO objeto (idUsuario,nombre,idCategoria,idTipoObjeto,idTecnica,idTamanio,firmado,comentario,IdConservacion,idEstadoPeritaje,imagen) VALUES 
        ('${usuario.id}','${req.body.nombre}','${req.body.categoria_id}','${req.body.tipoObjeto_id}','${req.body.tecnica_id}','${req.body.tamanio_id}',
        '${req.body.firmado_id}','${req.body.comentario}','${req.body.conservacion_id}','1','${req.files.imagen.path.split('//')[3]}')`;
        connection.query(sql, (err, valuations) => {
            if (err) {
                console.log(err);
                return res.send("error al valorar");
            }
            res.redirect('/zonacliente/valuations');
            console.log(req.files.imagen.originalFilename);
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