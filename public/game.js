export default function createGame() {
    const state = {
        players:{
            'player1': {x:30, y:225, width:5, height:50, score: 0},
            'player2': {x:470, y:225, width:5, height:50, score: 0}
        },
        balls:{
            'ball1': {x:248, y:248, width:10, height:10, horizontal:-1, vertical:-1}
        },
        screen: {width:500, height:500}
    }

    function movePlayer(command) {
        console.log(command)
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptedMoves = {
            w(player) {
                const move = 10
                console.log('game.movePlayer().ArrowUp() ->Moving PLayer Up')
                if (player.y - move >= 0) {
                    player.y -= move
                    return
                } else if (player.y > 0) {
                    player.y = 0
                    return
                }
            },
            s(player) {
                const move = 10
                console.log('game.movePlayer().ArrowDown() ->Moving PLayer Down')
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
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]
        
        if (moveFunction){
            moveFunction(player)
        } 
    }
    
    function moveBall() {
        state.balls["ball1"].x += 10*state.balls["ball1"].horizontal / 3
        state.balls["ball1"].y += 5*state.balls["ball1"].vertical / 3
        checkBallCollision()
    }
    
    function checkBallCollision() {
        const ball = state.balls["ball1"]
        if (ball.x >= 490) {
            victory(state.players['player1'])
        }

        if (ball.x <= 5) {
            victory(state.players['player2'])
        }

        if (ball.y >= 490 || ball.y <= 0) {
            ball.vertical = ball.vertical * (-1)
        }

        var player = state.players["player1"]

        if ((player.x <= ball.x && ball.x <= player.x + 2) && (player.y <= ball.y && ball.y <= player.y + 50)) {
            console.log(`Collision detected with ${player}`)
            ball.horizontal = 1
        }

        var player = state.players["player2"]

        if ((player.x - 5 <= ball.x && ball.x <= player.x + 2) && (player.y <= ball.y && ball.y <= player.y + 50)) {
            console.log(`Collision detected with ${player}`)
            ball.horizontal = -1
        }

        function victory(player) {
            player.score += 1

            document.getElementById("demo").innerHTML = `${state.players["player1"].score}:${state.players["player2"].score}`;

            console.log(`Placar: ${state.players["player1"].score}:${state.players["player2"].score}`)

            var num = -1
            if (player.x < 248){
                num = 1
            }
            
            ball.horizontal = num
            ball.vertical = -1
            ball.x = 248
            ball.y = 248

            state.players["player1"].x = 30
            state.players["player1"].y = 225

            state.players["player2"].x = 470
            state.players["player2"].y = 225
        }
    }

    return {
        movePlayer,
        checkBallCollision,
        moveBall,
        state
    }
}       
