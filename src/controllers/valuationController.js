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
            } console.log(valuations);

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
        connection.query("SELECT * FROM categoria; SELECT * FROM tecnica; ", (err, results) => {
            console.log(results);
        

                // res.render("zonacliente/valuations_add", {
                    // categorias: results[0],
                    // tecnicas: results[1],
                    // tamanios: results[2]
                // });
        });
    });
};
    // else {
    //     categorias = result;         
    //     tipo_objeto = result2;
    //     // res.render("zonacliente/valuations_add", {categorias:categorias, });
    // }

    // var categorias = result;
    // console.log(result);
    // console.log(categorias)
    //     connection.query("SELECT * FROM tamanio", (err, tamanios) => {
    //     if(err) {
    //             res.json(err);
    //         }   
    //     })
    //     res.render("zonacliente/valuations_add", {tamanios:tamanios});
    // })
    // req.getConnection((err, connection) => {
    //     connection.query("SELECT * FROM tecnica", (err, tecnicas) => {
    //     if(err) {
    //             res.json(err);
    //         }   
    //     })
    // })
    // res.render("zonacliente/valuations_add", {categorias:categorias,tamanios:tamanios,tecnicas:tecnicas});
    // res.render("zonacliente/valuations_add", {categorias:categorias});

    controllerValuation.addValuation = (req, res) => {
        // const usuario = req.session.user;
        // let oldPath = req.files.imagenes.path;
        // let newPath = '/src/public/img_clientes/' + req.files.imagenes.originalFilename;
        // fs.rename(oldPath,newPathm function (err){
        // });
        // const data = req.body;
        req.getConnection((err, connection) => {
            let sql = `INSERT INTO objeto (idUsuario,nombre,
        idCategoria,
        idTipoObjeto,idTecnica) VALUES 
       ('${usuario.id}','${req.body.nombre}','${req.body.idTipoObjeto}','${req.body.idTecnica}')`;
            connection.query(sql, (err, valoraciones) => {
                // 'INSERT INTO objeto set ? ?', usuario , data,
                if (err) {
                    console.log(err);
                    return res.send("error al valorar");
                }
                res.redirect('/');
            })
        })
    };




    module.exports = controllerValuation;