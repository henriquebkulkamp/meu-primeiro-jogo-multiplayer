// cd Desktop/jogo

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)
const game = createGame()

app.use(express.static('public'))
let playersConnected = []

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on server with id ${playerId}`)
    playersConnected.push(playerId)
})


server.listen(3000, () => {
    console.log('>listening on port: 3000')
})