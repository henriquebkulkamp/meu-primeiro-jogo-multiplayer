export default function renderScreen(screen, state, requestAnimationFrame) {
    const context = screen.getContext('2d')
    context.fillStyle = 'black'
    context.fillRect(0, 0, state.scree.width, state.scree.height)


    for (const playerId in state.players) {
        const player = state.players[playerId]
        context.fillStyle = 'white'
        context.fillRect(player.x, player.y, player.width, player.height)
    }


    for (const ballId in state.balls) {
        const ball = state.balls[ballId]
        context.fillStyle = 'white'
        context.fillRect(ball.x, ball.y, ball.width, ball.height)
    }
    
    requestAnimationFrame(() => {
        renderScreen(screen, state, requestAnimationFrame)
    })
}