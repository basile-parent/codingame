import {configureStore, PayloadAction} from "@reduxjs/toolkit"
import playersReducer, {setPlayers} from "./players"
import adminsReducer, {setAdmins} from "./admins"
import presentationsReducer, {setPresentations} from "./presentations"
import modeReducer, {setMode} from "./mode"
import screenReducer, {setScreen} from "./screen"
import connectedReducer, {connect, disconnect} from "./connected"
import gameReducer, {newEndTime, setGame} from "./game"
import waitForApprovalReducer, {setWaitForApproval} from "./waitForApproval"
import transitionTimeoutReducer, {setTransitionTimeout} from "./transitionTimeout"
import delayedStateReducer, {setDelayedState} from "./delayedState"
import {DisplayMode} from "../../types/DisplayMode"
import {GamePlayer} from "../../types/Player"
import {Screen} from "../../types/Screen"
import {Game} from "../../types/Game"

export type RootState = {
    mode: DisplayMode,
    connected: boolean,
    players: GamePlayer[],
    admins: GamePlayer[],
    presentations: GamePlayer[],
    screen: Screen,
    game: Game | null,
    transitionTimeout: number,
    delayedState: RootState | null,
    waitForApproval: boolean,
}

const store = configureStore<RootState>({
    reducer: {
        mode: modeReducer,
        connected: connectedReducer,
        players: playersReducer,
        admins: adminsReducer,
        presentations: presentationsReducer,
        screen: screenReducer,
        game: gameReducer,
        transitionTimeout: transitionTimeoutReducer,
        waitForApproval: waitForApprovalReducer,
        delayedState: delayedStateReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {players: PlayersState, mode: ModeState, ...}
export type AppDispatch = typeof store.dispatch

// TODO delayedState
const updateStore = (newState: RootState, meta?: string): PayloadAction<RootState, string, string | undefined> => {
    return { type: "update_store", payload: newState, meta }
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
    delayedState: { setDelayedState },
    updateStore
}

export default store