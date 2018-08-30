// RUTAS Y CONTROLADORES
// CONTROLADORES DEL USUARIO
// VALORACIONES

const controllerValuation = {};

controllerValuation.addValuationForm = (req, res) => {
    res.render("zonacliente/valuations");
};

controllerValuation.addValuation = (req, res) =>{
    // const data = req.body;
    const usuario = req.session.user;
    // let oldPath = req.files.imagenes.path;
    // let newPath = '/src/public/img_clientes/' + req.files.imagenes.originalFilename;
    // fs.rename(oldPath,newPathm function (err){
    // });
    // const data = req.body;
    req.getConnection((err,connection) => {
       let sql = `INSERT INTO objeto (idUsuario,nombre,
        idCategoria,
        idTipoObjeto,idTecnica) VALUES 
       ('${usuario.id}','${req.body.nombre}','${req.body.idTipoObjeto}','${req.body.idTecnica}')`; 
        connection.query(sql, (err, valoraciones) => {
            // 'INSERT INTO objeto set ? ?', usuario , data,
        if (err){
                console.log(err);
                return res.send("error al valorar");
            } 
            console.log(data);
            console.log(valoraciones);
            res.redirect('/');
        })
    })
}; 




module.exports = controllerValuation;