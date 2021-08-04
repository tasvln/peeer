const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
// const path = require('path')
const socketio = require('socket.io')
const {v4: uuidV4} = require('uuid')

const app = express()
const port = process.env.PORT || 2300
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
      origin: "*",
    },
})
  

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Api Working'))


// app.get('/api/all-users', (req, res) => {
//     try{

//     }
//     catch {

//     }
// })

// app.get('/api/register', (req, res) => {
//     try{

//     }
//     catch {

//     }
// })

// app.get('/api/login', (req, res) => {
//     try{

//     }
//     catch {

//     }
// })

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.emit('user-joined', userId)

        socket.on('room-chat', () => {
            socket.emit('message', userId)
        })
    
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(port, () => console.log(`Api Running On http://localhost:${port}`))