// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// VALORACIONES

const controllerValuation = {};

controllerValuation.selectValuation = (req, res) => {
    req.session.user = { id: 39, nombre: '2', email: '2' };
    req.getConnection((err, connection) => {
        connection.query("SELECT * FROM objeto where idUsuario = ?", req.session.user.id, (err, valuations) => {
            if (err) {
                res.json(err);
            } 
            res.render("zonacliente/valuations", {
                valuations: valuations
            })
        })
    })
};
// SELECT * FROM tecnica; SELECT * FROM tamanio
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

// const usuario = req.session.user;
// let oldPath = req.files.imagenes.path;
// let newPath = '/src/public/img_clientes/' + req.files.imagenes.originalFilename;
// fs.rename(oldPath,newPathm function (err){
// });
// const data = req.body;
controllerValuation.addValuation = (req, res) => {
    req.session.user = { id: 39, nombre: '2', email: '2' };
    const usuario = req.session.user;
    req.getConnection((err, connection) => {
        let sql = `INSERT INTO objeto (idUsuario,nombre,idCategoria,idTipoObjeto,idTecnica,idTamanio,firmado,comentario,conservacion) VALUES 
        ('${usuario.id}','${req.body.nombre}','${req.body.categoria_id}','${req.body.tipoObjeto_id}','${req.body.tecnica_id}','${req.body.tamanio_id}',
        '${req.body.firmado_id}','${req.body.comentario}','${req.body.conservacion_id}')`;
        // console.log(usuario.id);
        // console.log(req.body.nombre);
        console.log(sql);
        connection.query(sql, (err, valoraciones) => {
            if (err) {
                // console.log(err);
                return res.send("error al valorar");
            }
            // console.log(valoraciones);
            res.redirect('/zonacliente/valuations');
        })
    })
};




module.exports = controllerValuation;