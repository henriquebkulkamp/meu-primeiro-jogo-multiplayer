export default function createKeyboardListener() {
    const state = {
        observers: [],
        playerId: null
    } 
    
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }
    
    function notifyAll(command) {
        console.log(`keyboardListener -> Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }
    function runAll(command) {
        notifyAll(command)
    }

    return {
        subscribe,
        runAll,
        state
    }
}