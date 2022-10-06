import {configureStore, PayloadAction} from "@reduxjs/toolkit"
import playersReducer, {setPlayers} from "./players"
import adminsReducer from "./admins"
import presentationsReducer from "./presentations"
import modeReducer, {setMode} from "./mode"
import screenReducer from "./screen"
import additionalScreenPropsReducer from "./additionalScreenProps"
import connectedReducer, {connect, disconnect} from "./connected"
import gameReducer, {newEndTime} from "./game"
import waitForApprovalReducer from "./waitForApproval"
import transitionTimeoutReducer, { setTransitionTimeout } from "./transitionTimeout"
import delayedStateReducer from "./delayedState"
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
    additionalScreenProps: string[],
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
        additionalScreenProps: additionalScreenPropsReducer,
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

const updateStore = (newState: RootState, meta?: string): PayloadAction<RootState, string, string | undefined> => {
    return { type: "update_store", payload: newState, meta }
}

export const ReduxActions = {
    players: { set: setPlayers },
    mode: { set: setMode },
    connected: { connect, disconnect },
    game: { newEndTime },
    transitionTimeout: { set: setTransitionTimeout },
    updateStore
}

export default store