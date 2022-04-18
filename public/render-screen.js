export default function renderScreen(context, state) {
    context.fillStyle = 'black'
    context.fillRect(0, 0, state.screen.width, state.screen.height)


    for (const playerId in state.players) {
        const player = state.players[playerId]
        context.fillStyle = 'white'
        context.fillRect(player.x, player.y, player.width, player.height)
    }


    const ball = state.balls.ball1
    context.fillStyle = 'white'
    context.fillRect(ball.x, ball.y, ball.width, ball.height)
    
}