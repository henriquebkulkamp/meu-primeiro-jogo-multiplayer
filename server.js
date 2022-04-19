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

function filterPlayer(command) {
    if (command.playerId == game.playersConnected[0] || command.playerId == game.playersConnected[1]) {return true}
    return false
}


sockets.on('connection', (socket) => {
    const playerId = socket.id

    console.log(`> Player connected on server with id ${playerId}`)

    game.playersConnected.push(playerId)
    console.log(game.playersConnected)
    socket.emit('setup', game.state)
    socket.on('disconnect', () => {
        console.log(`> Player disconnect: ${playerId}`)
        for (let i=0; i<game.playersConnected.length; i++) {
            if (game.playersConnected[i] === playerId) {
                game.playersConnected.splice(i, 1)
                console.log(game.playersConnected)
            }
        }
    })

    socket.on('keyPressed', (command) => {
        console.log("> reciving a key press")
        console.log(command)
        if (game.state.players.player1.playerId == command.player) {
            command.player = state.players.player1
            console.log('player1')
            keyboardListener.runAll(command)
            sockets.emit('movePlayer', game.state)
        }
        if (game.state.players.player2.playerId == command.player) {
            command.player = state.players.player2
            console.log('player2')
            keyboardListener.runAll(command)
            sockets.emit('movePlayer', game.state)
        }
    })
})


setInterval(() => {
    game.moveBall()
    sockets.emit('move ball', game.state)
},
30)





server.listen(3000, () => {
    console.log('>listening on port: 3000')
})