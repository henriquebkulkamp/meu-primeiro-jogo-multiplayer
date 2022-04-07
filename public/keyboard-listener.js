export default function createKeyboardListener() {
    const state = {
        observers: []
    }

    // placing observers
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    // notify the observers about the value
    function notifyAll(command) {
        console.log(`keyBoardListener -> Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeyDown) // Get the value

    function handleKeyDown(event) {
        const keyPressed = event.key

        const command = {
            playerId : 'player1', 
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe
    }
}