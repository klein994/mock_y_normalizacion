const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const {routerMensajes} = require("./router/mensajes")
const {routerProductos} = require("./router/productos")
const {routerProductostest} = require("./router/productos-test")

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/api/mensajes',routerMensajes)
app.use('/api/productos',routerProductos)
app.use('/api/productos-test',routerProductostest)

io.on('connection', clientSocket => {
  console.log(`#${clientSocket.id} se conectó`)

  clientSocket.on('nuevoProducto', () => {
    console.log("Llego el evento del tipo Prod update")
    io.sockets.emit('updateProd')
  })
  
  clientSocket.on('nuevoMensaje', () => {
    console.log("Llego el evento del tipo Msj update")
    io.sockets.emit('updateMsj')
  })

})

app.get("/", (req,res)=> {
  res.sendFile('index.html')
})

const PORT =  8080
const server = httpServer.listen(PORT, () => {
console.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

