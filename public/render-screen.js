export default function renderScreen(screen, game, requestAnimationFrame) {
    const context = screen.getContext('2d')
    context.fillStyle = 'black'
    context.fillRect(0, 0, 500, 500)


    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'white'
        context.fillRect(player.x, player.y, player.width, player.height)
    }


    for (const ballId in game.state.balls) {
        const ball = game.state.balls[ballId]
        context.fillStyle = 'white'
        context.fillRect(ball.x, ball.y, ball.width, ball.height)
    }
    
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame)
    })
}
