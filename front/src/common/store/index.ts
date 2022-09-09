import {combineReducers, configureStore, PayloadAction} from "@reduxjs/toolkit"
import _ from "lodash"
import playersReducer, {setPlayers} from "./players"
import adminsReducer, {setAdmins} from "./admins"
import presentationsReducer, {setPresentations} from "./presentations"
import modeReducer, {setMode} from "./mode"
import screenReducer, {setScreen} from "./screen"
import connectedReducer, {connect, disconnect} from "./connected"
import gameReducer, {setGame, newEndTime} from "./game"
import waitForApprovalReducer, {setWaitForApproval} from "./waitForApproval"
import transitionTimeoutReducer, {setTransitionTimeout} from "./transitionTimeout"

const combinedReducer = combineReducers({
    players: playersReducer,
    admins: adminsReducer,
    presentations: presentationsReducer,
    mode: modeReducer,
    screen: screenReducer,
    connected: connectedReducer,
    game: gameReducer,
    waitForApproval: waitForApprovalReducer,
    transitionTimeout: transitionTimeoutReducer,
})

// TODO Add state type
const rootReducer = (state: any, action: PayloadAction<any>) => {
    if (action.type === 'update_store') {
        state = action.payload
    }
    return combinedReducer(state, action)
}

const store = configureStore({
    reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayersState, mode: ModeState, ...}
export type AppDispatch = typeof store.dispatch

// TODO delayedState
const updateStore = (currentState: RootState, newState: RootState): PayloadAction<RootState> => {
    console.log(rootReducer)
    if (!_.isEqual(currentState.players, newState.players)) { setPlayers(newState.players) }
    if (!_.isEqual(currentState.admins, newState.admins)) { setPlayers(newState.admins) }
    if (!_.isEqual(currentState.presentations, newState.presentations)) { setPlayers(newState.presentations) }
    if (currentState.mode !== newState.mode) { setMode(newState.mode) }
    if (currentState.screen !== newState.screen) { setScreen(newState.screen) }
    if (currentState.connected !== newState.connected) {
        newState.connected ? connect() : disconnect()
    }
    if (!_.isEqual(currentState.game, newState.game)) {
        setGame(newState.game!)
    }
    if (currentState.waitForApproval !== newState.waitForApproval) { setWaitForApproval(newState.waitForApproval) }
    if (currentState.transitionTimeout !== newState.transitionTimeout) { setTransitionTimeout(newState.transitionTimeout) }

    return { type: "update_store", payload: newState }
}

export const ReduxActions = {
    players: { setPlayers },
    admins: { setAdmins },
    presentations: { setPresentations },
    mode: { setMode },
    screen: { setScreen },
    connected: { connect, disconnect },
    game: { setGame, newEndTime },
    waitForApproval: { setWaitForApproval },
    transitionTimeout: { setTransitionTimeout },
    updateStore
}

export default store