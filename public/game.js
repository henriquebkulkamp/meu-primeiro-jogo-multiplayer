export default function createGame() {
    let player1 = 'xxxxxxxxx'
    let player2 = 'yyyyyyyyy'
    const playersConnected = []
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

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }
    
    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command)
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
        let player = undefined


        const moveFunction = acceptedMoves[keyPressed]
        
        if (moveFunction){
            moveFunction(player)
            console.log(">Roda até aqui tambem")
        } 
    }
    
    function moveBall() {
        state.balls.ball1.x += 10*state.balls.ball1.horizontal / 3
        state.balls.ball1.y += 5*state.balls.ball1.vertical / 3
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
                    console.log(`Collision detected with ${player.playerId}`)
                    ball.horizontal = 1
                }
            }else if((player.x - ball.width <= ball.x && ball.x <= player.x + player.width) && (player.y <= ball.y && ball.y <= player.y + player.height)){
                console.log(`Collision detected with ${player.playerId}`)
                ball.horizontal = -1
            }
        }
    }

    function victory(player) {
        player.score ++

        const ball1 = state.balls.ball1
        ball1.x = 248
        ball1.y = 248
        ball1.horizontal = 0
        ball1.vertical = 0


        const command = {
            type: 'victory',
            score: [state.players.player1.score, state.players.player2.score]
        }
        if (player.score > 1){endGame(player)}

        notifyAll(command)
        setTimeout(() => {ball1.horizontal=1, ball1.vertical=1}, 5000)

    }

    function endGame(player) {
        substitutePlayer(player)
        const p1 = state.players.player1
        const p2 = state.players.player2
        p1.score = 0
        p1.x = 30
        p1.y = 225
        p2.score = 0
        p2.x = 470
        p2.y = 225 
        console.log(`${p1.playerId} e ${p2.playerId}`)
    }

    function substitutePlayer(winner) {
        if (playersConnected.length > 2) {
            let loser = playersConnected[0]
            let num = 0
            if (winner == playersConnected[0]) {
                loser = playersConnected[1]
                num = 1
            }
            playersConnected.plice(num, 1)
            playersConnected.push(loser)
            return
        }

        if (playersConnected.length == 2) {
            array2()
        }

        if (playersConnected.length == 1) {
            array1()
        }

        state.players.player1.playerId = player1
        state.players.player2.playerId = player2

        function array1() {
            if (player1 == playersConnected[0] || player2 == playersConnected[0]) {return}
            if (player1 == 'xxxxxxxxx') {
                player1 = playersConnected[0]
            } else if (player2 == 'yyyyyyyyy') {
                player2 = playersConnected[0]
            }  
            return player1, player2        
        }
        function array2() {
            if (player1 == 'xxxxxxxxx' && player2 == 'yyyyyyyyy') {
                player1 = playersConnected[0]
                player2 = playersConnected[1]
                return player1, player2
            }
            array1()           
        }
    }
    

    return {
        subscribe,
        setState,
        movePlayer,
        moveBall,
        victory,
        playersConnected,
        state
    }
}