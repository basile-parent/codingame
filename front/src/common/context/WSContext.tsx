import {createContext, Dispatch, FC, ReactElement, useEffect, useReducer} from "react"
import {DisplayMode} from "../../types/DisplayMode"
import {Screen} from "../../types/Screen"
import {Game} from "../../types/Game"
import {GamePlayer} from "../../types/Player"
import {ReducerAction} from "../../types/Actions"

type WSState = {
    mode: DisplayMode,
    connected: boolean,
    players: GamePlayer[],
    admins?: GamePlayer[],
    presentations?: GamePlayer[],
    screen: Screen,
    game: Game | null,
    transitionTimeout: number,
    delayedState: WSState | null,
    waitForApprouval: boolean,
}
type WSStateAction = {
    type: string,
    payload?: any
}

const INTIAL_STATE: WSState = {
    mode: DisplayMode.PLAYER,
    connected: false,
    players: [],
    screen: Screen.LANDING_PAGE,
    game: null,
    transitionTimeout: 0,
    delayedState: null,
    waitForApprouval: false,
}
const WSContext = createContext<{ wsState: WSState, dispatch: Dispatch<any> }>({ wsState: INTIAL_STATE, dispatch: () => null })

const logWsStateReducer = (state: WSState, action: WSStateAction): WSState => {
    console.groupCollapsed("Reducer WS", action)
    console.debug("State before", state)
    const stateAfter = wsStateReducer(state, action)
    console.debug("State after", stateAfter)
    console.groupEnd()
    return stateAfter
}
const wsStateReducer = (state: WSState, action: WSStateAction): WSState => {
    switch (action.type) {
        case ReducerAction.USER_CONNECTED().type: {
            return { ...state, connected: true }
        }
        case ReducerAction.USER_DISCONNECTED().type: {
            return { ...state, connected: false }
        }
        case ReducerAction.SET_PLAYERS().type: {
            return { ...state, players: action.payload }
        }
        case ReducerAction.NEW_END_TIME().type: {
            return { ...state, game: { ...state.game, endTimer: action.payload } as Game}
        }
        // Just for debug
        case ReducerAction.DELAYED_STATUS().type: {
            return { ...state, ...action.payload }
        }
        case ReducerAction.STATUS().type: {
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
        let timeoutRef: ReturnType<typeof setTimeout> | null = null
        const transitionTimeout = wsState.transitionTimeout
        if (transitionTimeout && wsState.delayedState) {
            timeoutRef = setTimeout(() => {
                return dispatch({
                    type: "delayedStatus",
                    payload: {
                        ...wsState.delayedState,
                        transitionTimeout: 0,
                        delayedState: null
                    }
                })
            }, transitionTimeout)
        }
        return () => {
            if (timeoutRef) {
                clearTimeout(timeoutRef)
            }
        }
    }, [ wsState.delayedState ])

    const value = {wsState, dispatch}

    return <WSContext.Provider value={value}>{children}</WSContext.Provider>
}


export {WSProvider, WSContext}