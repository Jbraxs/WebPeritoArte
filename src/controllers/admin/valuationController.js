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

adminControllerValuation.addAutoRates = (req, res) => {
    req.getConnection((err, connection) => {
        if (false) {
            // OBTENGO LA INFORMACIÓN DE DB
            connection.query("SELECT * FROM categoria", (err, categorias) => {
                connection.query("SELECT * FROM conservacion", (err, conservaciones) => {
                    connection.query("SELECT * FROM tamanio", (err, tamanios) => {
                        connection.query("SELECT * FROM tecnica", (err, tecnicas) => {
                            connection.query("SELECT * FROM tipo_objeto", (err, tipos) => {
                                // RECORRO LA INFORMACIÓN
                                categorias.forEach(function (cat) {
                                    console.log('recorriendo categoria ' + cat.id);
                                    conservaciones.forEach(function (con) {
                                    console.log('recorriendo conservacion ' + con.id);
                                        tamanios.forEach(function (tam) {
                                            if (tam.idCategoria == cat.id) {
                                                tecnicas.forEach(function (tec) {
                                                    if (tec.idCategoria == cat.id) {
                                                        tipos.forEach(function (tip) {
                                                            if (tip.idCategoria == cat.id) {
                                                                // INICIA LA ORQUILLA ECONOMICA
                                                                valMin = Math.floor(Math.random() * (3000 - 100)) + 100; // VALOR MINIMO ALEATORIO
                                                                valS = Math.floor((Math.random() * (9 - 1)) + 1) * 100; // DIFERENCIA ENTRE EL MAX Y MIN
                                                                valMax = valMin + valS; // VALOR MAX 
                                                                valor = valMin + ' € - ' + valMax + ' €'; // ORQUILLA ECONOMICA

                                                                let sql = 'INSERT INTO tarifa(idCategoria, idConservacion, idTamanio, idTecnica, idTipoObjeto, valor) '
                                                                sql += `VALUES(${cat.id},${con.id},${tam.id},${tec.id},${tip.id},"${valor}")`

                                                                connection.query(sql);
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    })
                                })
                                console.log('Fin de inserción de tarifas');
                            });
                        });
                    });
                });
            });
        }
    });
}



module.exports = adminControllerValuation;