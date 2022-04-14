// cd Desktop/jogo

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import createGame from './public/game.js'
import createKeyboardListener from './public/keyboardListener.js'

const playersConnected = []

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

const game = createGame(playersConnected)
const keyboardListener = createKeyboardListener() 
keyboardListener.subscribe(game.movePlayer)

app.use(express.static('public'))

function filterPlayer() {
    if (playerId == playersConnected[0] || playerId == playersConnected[1]) {return true}
    return false
}


sockets.on('connection', (socket) => {
    const playerId = socket.id

    console.log(`> Player connected on server with id ${playerId}`)

    playersConnected.push(playerId)
    socket.emit('setup', game.state)
    socket.emit('player', playersConnected)
})

sockets.on('keyPressed', (command) => {
    const keydown = command.keydown
    const playerId = command.playerId
    if (filterPlayer) {
        keyboardListener.runAll(keydown, playerId)
    }
})

setInterval(() => {
    game.moveBall()
    sockets.emit('move', game.state)
},
30)


sockets.on('disconnect', () => {
    for (let i = 0; i < playersConnected.length; i++) {
        if (playersConnected[i] == playerId) {
            playersConnected.splice(i, 1)
            break
        }
    }
    console.log(`> Player disconnected: ${playerId}`)
})




server.listen(3000, () => {
    console.log('>listening on port: 3000')
})