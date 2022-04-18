// cd Desktop/jogo

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import createGame from './public/game.js'
import createKeyboardListener from './public/keyboardListener.js'


const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

const game = createGame([])
const keyboardListener = createKeyboardListener() 
keyboardListener.subscribe(game.movePlayer)

app.use(express.static('public'))

game.subscribe((command) => {
    console.log(`> emitting ${command.type}`)
    sockets.emit(command.type, command)
})

function filterPlayer() {
    if (playerId == game.playersConnected[0] || playerId == game.playersConnected[1]) {return true}
    return false
}


sockets.on('connection', (socket) => {
    const playerId = socket.id

    console.log(`> Player connected on server with id ${playerId}`)

    game.playersConnected.push(playerId)
    console.log(game.playersConnected)
    socket.emit('setup', game.state)
})


setInterval(() => {
    game.moveBall()
    sockets.emit('move ball', game.state)
},
30)


sockets.on('keyPressed', (command) => {
    console.log("> reciving a key press")
    const keydown = command.keydown
    const playerId = command.playerId
    if (filterPlayer) {
        keyboardListener.runAll(keydown, playerId)
        sockets.emit('movePlayer', game.state)
    }
})



server.listen(3000, () => {
    console.log('>listening on port: 3000')
})