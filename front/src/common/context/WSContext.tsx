import {createContext, Dispatch, FC, ReactElement, useEffect, useReducer} from "react"
import WebSocketHandler from "./WebSocketHandler"
import {DisplayMode} from "../../types/DisplayMode";
import {Screen} from "../../types/Screen";
import {Game} from "../../types/Game";
import {GamePlayer} from "../../types/Player";

type WSState = {
    ws: WebSocketHandler | null,
    mode: DisplayMode,
    connected: boolean,
    players: GamePlayer[],
    screen: Screen,
    game: Game | null,
    transitionTimeout: number,
    delayedState: WSState | null,
    forceSubmit: boolean
}
type WSStateAction = {
    type: string,
    payload?: any
}

const INTIAL_STATE: WSState = {
    ws: null,
    mode: DisplayMode.PLAYER,
    connected: false,
    players: [],
    screen: Screen.LANDING_PAGE,
    game: null,
    transitionTimeout: 0,
    delayedState: null,
    forceSubmit: false,
}
const WSContext = createContext<{ wsState: WSState, dispatch: Dispatch<any> }>({ wsState: INTIAL_STATE, dispatch: () => null })

const logWsStateReducer = (state: WSState, action: WSStateAction): WSState => {
    console.groupCollapsed("Reducer action", action)
    console.debug("State before", state)
    const stateAfter = wsStateReducer(state, action)
    console.debug("State after", stateAfter)
    console.groupEnd()
    return stateAfter
}
const wsStateReducer = (state: WSState, action: WSStateAction): WSState => {
    switch (action.type) {
        case 'connected': {
            return { ...state, connected: true }
        }
        case 'disconnect': {
            if (state.ws) {
                state.ws.close()
            }
            return { ...state, connected: false }
        }
        case 'disconnected': {
            return { ...state, connected: false }
        }
        case 'setWs': {
            return { ...state, ws: action.payload }
        }
        case 'setName': {
            state.ws?.setName(action.payload)
            return state
        }
        case 'forceSubmit': {
            return state.screen === Screen.GAME_EDITOR ? {...state, forceSubmit: true} : state
        }
        case 'commitCode': {
            state.ws?.commitCode(action.payload)
            return { ...state, forceSubmit: false }
        }
        case 'setPlayers': {
            return { ...state, players: action.payload }
        }
        case 'startGame': {
            state.ws?.startGame()
            return state
        }
        case 'addTime': {
            state.ws?.addTime(action.payload)
            return state
        }
        case 'newEndTime': {
            return { ...state, game: { ...state.game, endTimer: action.payload } as Game}
        }
        case 'finishTopic': {
            state.ws?.finishTopic()
            return state
        }
        case 'calculateScore': {
            state.ws?.calculateScore()
            return state
        }
        case 'resetGame': {
            state.ws?.resetGame()
            return state
        }
        case 'status': {
            const newState = action.payload
            if (newState.transitionTimeout) {
                return {
                    ...state,
                    transitionTimeout: newState.transitionTimeout,
                    delayedState: {...newState, game: newState.game ? {...newState.game, transitionTimeout: 0} : null}
                }
            }
            return { ...state, ...newState }
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`, action.payload)
            return state
        }
    }
}

type WSProviderProps = {
    mode: DisplayMode,
    children: ReactElement,
}
const WSProvider: FC<WSProviderProps> = ({ mode, children }) => {
    const [wsState, dispatch] = useReducer(logWsStateReducer, { ...INTIAL_STATE, mode })

    // Set the delayed state after the timeout
    useEffect(() => {
        let timeout: number | null = null
        const transitionTimeout = wsState.transitionTimeout
        if (transitionTimeout && wsState.delayedState) {
            timeout = setTimeout(() => {
                return dispatch({
                    type: "status",
                    payload: {
                        ...wsState.delayedState,
                        transitionTimeout: 0,
                        delayedState: null
                    }
                })
            }, transitionTimeout)
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [ wsState.delayedState ])

    useEffect(() => {
        dispatch({ type: "disconnect" })
        const socket = new WebSocketHandler("http://localhost:9090", dispatch, { mode })
        dispatch({ type: "setWs", payload: socket })
    }, [ dispatch ])

    const value = {wsState, dispatch}

    return <WSContext.Provider value={value}>{children}</WSContext.Provider>
}


export {WSProvider, WSContext}