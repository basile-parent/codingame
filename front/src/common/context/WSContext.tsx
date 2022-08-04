import {createContext, Dispatch, PropsWithChildren, useEffect, useMemo, useReducer} from "react"
import WebSocketHandler from "./WebSocketHandler"

type WSState = {
    connected: boolean,
    players: any[],
    ws: WebSocketHandler | null
}
type WSStateAction = {
    type: string,
    payload: any
}

const INTIAL_STATE: WSState = {
    connected: false,
    players: [],
    ws: null
}
const WSContext = createContext<{ state: WSState, dispatch: Dispatch<any> }>({ state: INTIAL_STATE, dispatch: () => null })

const wsStateReducer = (state: WSState, action: WSStateAction) => {
    switch (action.type) {
        case 'connected': {
            return { ...state, connected: true }
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
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const WSProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(wsStateReducer, INTIAL_STATE)
    const socket = useMemo(() => new WebSocketHandler("http://localhost:9090", dispatch, ""), [ dispatch ])

    useEffect(() => {
        dispatch({ type: "setWs", payload: socket })
    }, [])

    const value = {state, dispatch}

    return <WSContext.Provider value={value}>{children}</WSContext.Provider>
}


export {WSProvider, WSContext}