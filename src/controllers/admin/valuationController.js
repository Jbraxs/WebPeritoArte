// RUTAS Y CONTROLADORES
// CONTROLADORES DEL ADMIN
// VALORACIONES

const adminControllerValuation = {};
let nodemailer = require("nodemailer");

//CONSULTA TODAS LAS VALORACIONES DE LOS CLIENTES
adminControllerValuation.selectValuation = (req, res) => {
    req.session.user = { id: 39, nombre: '2', email: '2' };
    let sql = 'SELECT obj.id, valor_estimativo,obj.nombre, cat.nombre as categoria, tec.nombre as tecnica,'
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
                valuations: valuations,
                //Borrar
                // usuario: req.session.user

            })
        })
    })
};
// ESTIMAR VALORACION
adminControllerValuation.estimateValuation = (req, res) => {
    req.session.user = { id: 39, nombre: '2', email: '2' };
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query(`SELECT * FROM objeto WHERE id = ?`, [id], (err, result) => {
            objeto = result[0]
            sql = `SELECT * FROM tarifa WHERE idCategoria = ${objeto.idCategoria} AND idConservacion = ${objeto.idConservacion} AND idTamanio = ${objeto.idTamanio} AND idTecnica = ${objeto.idTecnica} AND idTipoObjeto = ${objeto.idTipoObjeto}`
            connection.query(sql, (err, result2) => {
                tarifa = result2[0]
                connection.query(`UPDATE objeto set valor_estimativo = '${tarifa.valor}' where id = ?`, [id], (err, result3) => {
                    if (err) {
                        res.render('../views/errores/error409');
                    }

                    //SERVIDOR EMAIL 
                let smtpTransport = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:465,
                secure:true,
                auth: {
                  user: "pruebawebperitoarte@gmail.com",
                  pass: "pruebawebperitoarte12345"
                }
                });
                //TEXTO Y ENVIO DE EMAIL
                let mailOptions = {
                from: "pruebawebperitoarte@gmail.com",
                to: '',
                subject: "Alexis Navas - Perito | alexisnavas.com",
                html: 'Hola &nbsp;' + 'usuario.nombre' + ', <br> <br>' + 'Tu estimación económica se ha realizado correctamente, el valor estimado es de &nbsp;' + tarifa.valor + '.<br><br>' + 'Si usted desea realizar el peritaje del artículo, puede respondernos al correo y en la mayor brevedad posible, el Dc. Alexis Navas contactara con usted.<br><br>' + 'Gracias realizar su estimación económica con nosotros.' 
                };
                //FUNCION PARA ENVIAR EL EMAIL
                smtpTransport.sendMail(mailOptions, function(error, response) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('El correo se envio correctamente');
                }
                });
                //CIERRO EL ENVIO DEL EMIAL
                smtpTransport.close();
                    res.redirect("/admin/valuations");
                })
            })
        })
    })
};

//ELIMINA VALORACIONES
adminControllerValuation.delValuation = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query("DELETE FROM objeto WHERE id = ?", [id], (err, rows) => {
            res.redirect("/admin/valuations")
        });
    });

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