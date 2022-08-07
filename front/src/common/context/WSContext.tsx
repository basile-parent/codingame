import {createContext, Dispatch, FC, useEffect, useReducer} from "react"
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
}
const WSContext = createContext<{ wsState: WSState, dispatch: Dispatch<any> }>({ wsState: INTIAL_STATE, dispatch: () => null })

const logWsStateReducer = (state: WSState, action: WSStateAction): WSState => {
    console.debug("State before", state)
    console.log("Receive message", action)
    const stateAfter = wsStateReducer(state, action)
    console.debug("State before", stateAfter)
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
        case 'setPlayers': {
            return { ...state, players: action.payload }
        }
        case 'startGame': {
            state.ws?.startGame()
            return state
        }
        case 'status': {
            return { ...state, ...action.payload }
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`, action.payload)
            return state
        }
    }
}

type WSProviderProps = {
    mode: DisplayMode,
    children: any,
}
const WSProvider: FC<WSProviderProps> = ({ mode, children }) => {
    const [wsState, dispatch] = useReducer(logWsStateReducer, { ...INTIAL_STATE, mode })

    useEffect(() => {
        dispatch({ type: "disconnect" })
        const socket = new WebSocketHandler("http://localhost:9090", dispatch, { mode })
        dispatch({ type: "setWs", payload: socket })
    }, [ dispatch ])

    const value = {wsState, dispatch}

    return <WSContext.Provider value={value}>{children}</WSContext.Provider>
}


export {WSProvider, WSContext}