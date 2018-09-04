// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
// VALORACIONES

const adminControllerValuation = {};

//CONSULTA TODAS LAS VALORACIONES DE LOS CLIENTES
adminControllerValuation.selectValuation = (req, res) => {
    let sql = 'SELECT obj.id, obj.nombre, cat.nombre as categoria, tec.nombre as tecnica,' 
    sql += 'tip.nombre as tipo_objeto, tam.medida as tamanio, est.nombre as estado, con.nombre as conservacion, '
    sql += 'obj.firmado, obj.comentario, obj.imagen '
    sql += 'FROM alexis_navas.objeto obj '
    sql += 'INNER JOIN categoria cat ON obj.idCategoria = cat.id '
    sql += 'INNER JOIN tecnica tec ON obj.idTecnica = tec.id '
    sql += 'INNER JOIN tipo_objeto tip ON obj.idTipoObjeto = tip.id '
    sql += 'INNER JOIN tamanio tam ON obj.idTamanio = tam.id '
    sql += 'INNER JOIN estado_peritaje est ON obj.idEstadoPeritaje = est.id '
    sql += 'INNER JOIN conservacion con ON obj.idConservacion = con.id'
    req.getConnection((err, connection) => {
        connection.query(sql, (err, valuations) => {
            if (err) {
                res.json(err);
            } 
            res.render("admin/valuations", {
                valuations: valuations
            })
        })
    })
};
//VISTA DE UNA VALORACION 
adminControllerValuation.viewValuation = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query("SELECT * FROM objeto where id = ?", [id],(err, rows) => {
            res.render("../views/admin/valuations_view",{
                data:rows[0]
            });
        });
    });
};
;



module.exports = adminControllerValuation;