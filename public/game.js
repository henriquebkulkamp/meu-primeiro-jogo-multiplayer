export default function createGame(playersConnected) {
    let player1 = 'xxxxxxxxx'
    let player2 = 'yyyyyyyyy'
    if (playersConnected.length > 3){
        player1 = playersConnected[0]
        player2 = playersConnected[1]
    }

    let state = {
        players:{
            player1: {playerId: player1, x:30, y:225, width:5, height:50, score: 0},
            player2: {playerId: player2, x:470, y:225, width:5, height:50, score: 0}
        },
        balls:{
            ball1: {x:248, y:248, width:10, height:10, horizontal:-1, vertical:-1}
        },
        screen: {width:500, height:500}
    }

    function resetAll() {
        state = {
            players:{
                player1: {playerId: player1, x:30, y:225, width:5, height:50, score: 0},
                player2: {playerId: player2, x:470, y:225, width:5, height:50, score: 0}
            },
            balls:{
                ball1: {x:248, y:248, width:10, height:10, horizontal:-1, vertical:-1}
            },
            screen: {width:500, height:500}
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function movePlayer(command) {
        const move = 10

        const acceptedMoves = {
            w(player) {
                if (player.y - move >= 0) {
                    player.y -= move
                    return
                } else if (player.y > 0) {
                    player.y = 0
                    return
                }
            },
            s(player) {
                if (player.y + move <= 500-player.height) {
                    player.y += move
                    return
                } else if (player.y < 500-player.height) {
                    player.y = 500-player.height
                    return
                }
            }
        }
        const keyPressed = command.keyPressed
        const playerId = command.playerId
        let player = undefined

        for (const obj in state.players) {
            const objPlayer = state.players[obj]
            if (objPlayer.playerId == playerId) {
                player = obj
                break
            }
        }

        const moveFunction = acceptedMoves[keyPressed]
        
        if (moveFunction && player){
            moveFunction(player)
        } 
    }
    
    function moveBall() {
        state.balls["ball1"].x += 10*state.balls["ball1"].horizontal / 3
        state.balls["ball1"].y += 5*state.balls["ball1"].vertical / 3
        checkBallCollision()
    }
    
    function checkBallCollision() {
        const ball = state.balls.ball1
        if (ball.x >= 490) {
            victory(state.players.player1)
        }

        if (ball.x <= 5) {
            victory(state.players.player2)
        }

        if (ball.y >= 490 || ball.y <= 0) {
            ball.vertical = ball.vertical * (-1)
        }


        for(const key in state.players) {
            const player = state.players[key]
            if (ball.horizontal == -1) {
                if ((player.x <= ball.x && ball.x <= player.x + player.width) && (player.y <= ball.y && ball.y <= player.y + player.height)) {
                    console.log(`Collision detected with ${player}`)
                    ball.horizontal = 1
                }
            }else if((player.x - ball.width <= ball.x && ball.x <= player.x + player.width) && (player.y <= ball.y && ball.y <= player.y + player.height)){
                console.log(`Collision detected with ${player}`)
                ball.horizontal = -1
            }
        }

        function victory(player) {
            player.score += 1
            const scorePlayer1 = state.players.player1.score
            const scorePlayer2 = state.players.player2.score

            // document.getElementById("demo").innerHTML = `${state.players.player1.score}:${state.players.player2.score}`;

            console.log(`Score: ${state.players["player1"].score}:${state.players["player2"].score}`)

            const num = -1
            if (player == state.players.player1){
                num.value = 1
            }

            state = {
                players:{
                    player1: {playerId: player1, x:30, y:225, width:5, height:50, score: scorePlayer1},
                    player2: {playerId: player2, x:470, y:225, width:5, height:50, score: scorePlayer2},
                },
                balls:{
                    ball1: {x:248, y:248, width:10, height:10, horizontal:0, vertical:0}
                },
                screen: {width:500, height:500}
            }

            setTimeout(() => {state.balls.ball1.horizontal=num, state.balls.ball1.vertical=-1}, 5000)
        }
    }

    return {
        resetAll,
        setState,
        movePlayer,
        checkBallCollision,
        moveBall,
        state
    }
}
 