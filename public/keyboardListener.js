export default function createKeyboardListener() {
    const state = {
        observers: [],
        playerId: null
    } 
    
    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }
    
    function notifyAll(command) {
        console.log(`keyboardListener -> Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }
    function runAll(keydown, playerId) {
        const keyPressed = keydown

        const command = {
            playerId: playerId,
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe,
        runAll
    }
}