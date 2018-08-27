const controllerVal = {};
var fs = require('fs');

//CONSULTA TODAS LAS VALORACIONES DE LOS CLIENTES
controllerVal.viewValuations = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM objeto', (err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.render('views_valuations', {
                data: clientes
            })
        })
    })
};
// controllerVal.addValuations = (req, res) => {
//     const data = req.body;
//     // const usuario = req.session.user;
//     // let oldPath = req.files.imagenes.path;
//     // let newPath = '/src/public/img_clientes/'+ req.files.imagenes.originalFilename;
//     // fs.rename(oldPath, newPath, function (err) {  
//     // });  
//     console.log(req.body)
//     req.getConnection((err, connection) => {
//         const query = connection.query('INSERT INTO objeto set ?', data, (err, valoraciones) => {
//             console.log(valoraciones)
//             res.redirect('/valoraciones');
//         })
//     })
// };
//prueba
controllerVal.addValuations  = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      connection.query('INSERT INTO objeto set ?', data, (err, valoraciones) => {
        console.log(valoraciones)
        res.redirect('/valoraciones');
      })
    })
  };





module.exports = controllerVal;