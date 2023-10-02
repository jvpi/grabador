const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
const pool = require('./dbCredenciales.js')
const whiteList = ['http://localhost:5050']
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ type: "*/*" }));


async function obtenerUsuario() {
    const consultaBaseDeDatos = await pool.query('select * from  usuario')
    return consultaBaseDeDatos.rows

}
async function guardarUsuario(req) {
    let { nombre, correo, ciudad } = req
    const consultaBaseDeDatos = await pool.query(`insert into  usuario (nombre,correo,ciudad) 
                                                values($1,$2,$3)`, [nombre, correo, ciudad])
}
async function eliminarUsuario(req) {
    let { id } = req
    const consultaBaseDeDatos = await pool.query('delete from usuario  WHERE id = $1', [id])
}
async function editarUsuario(req) {
    let { id, nombre, correo, ciudad } = req
    const consultaBaseDeDatos = await pool.query(`update usuario set nombre =$2, correo=$3, ciudad=$4
                                                WHERE id = $1`,
                                                [id, nombre, correo, ciudad])
}
app.get('/prueba', cors(corsOptions), async function (req, res) {
    let respuesta = await obtenerUsuario()
    res.json(respuesta)

})
app.post('/prueba',cors(corsOptions), function (req, res) {
    guardarUsuario(req.body)
    res.json({ 'mensaje': 'succes' })
})
app.put('/editar',cors(corsOptions), function (req, res) {
    editarUsuario(req.body)
    // res.json({'mensaje':'succes'} )
})
app.delete('/delete',cors(corsOptions), function (req, res) {
    eliminarUsuario(req.body)
})
app.listen(3000, function () {

})