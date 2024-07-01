const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { dataBase } = require('./dataBase.js')

// Inicializaciones
const app = express()
const PORT = 3000

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// <---------- CRUD ---------->

// Crear un usuario
app.post('/', (req, res) => {
    const { nombre } = req.body // Desestructuramos el nombre que viene por el body
    const id = dataBase.length + 1 // Creamos un id autoincremental para el nuevo usuario
    dataBase.push({ id, nombre }) // Agregamos el nuevo usuario a la base de datos
    res.send('El usuario se creo correctamente!') // Respondemos al cliente
})

// Obtener todos los usuarios
app.get('/', (req, res) => {
    res.json(dataBase) // Respondemos al cliente con la base de datos
})

// Obtener un usuario
app.get('/:id', (req, res) => { // Requerimos el id por parametros
    const { id } = req.params // Desesctructuramos el id que viene por parametro
    const user = dataBase.find(user => user.id == id) // Buscamos el usuario en la base de datos
    res.json(user) // Respondemos al cliente con el usuario encontrado
})

// Actualizar un usuario
app.put('/:id', (req, res) => { // Requerimos el id por parametros
    const { nombre } = req.body; // Desestructuramos el nombre que viene por el body
    const id = req.params.id; // Guardamos la id que viene por parametro
    dataBase.forEach(user => { // Recorremos la base de datos
        if (user.id == id) { // Si el id del usuario es igual al id que viene por parametro
            user.nombre = nombre; // Actualizamos el nombre del usuario
        }
    });
    res.send('El usuario se actualizo correctamente!') // Respondemos al cliente que todo salio bien
})

// Eliminar un usuario
app.delete('/:id', (req, res) => { // Requerimos el id por parametros
    const { id } = req.params // Desestructuramos el id que viene por parametro
    dataBase.forEach((user, index) => { // Recorremos la base de datos
        if (user.id == id) { // Si el id del usuario es igual al id que viene por parametro
            dataBase.splice(index, 1) // Eliminamos el usuario de la base de datos
        }
    })
    res.send('El usuario se elimino correctamente!') // Respondemos al cliente que todo salio bien
})

// Escuchando el servidor
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})