import {FC, useCallback, useContext, useEffect} from 'react'
import WebSocketHandler from "./WebSocketHandler"
import {WSContext} from "../../context/WSContext"
import {ReducerAction, WSAction} from "../../../types/Actions"
import WebsocketManager from "./index"

const {VITE_SERVER_URL, VITE_WS_PATH} = import.meta.env
let socket: WebSocketHandler | null = null

type WebsocketProviderProps = {}
const WebsocketProvider: FC<WebsocketProviderProps> = ({}: WebsocketProviderProps) => {
    const {wsState: {mode}, dispatch} = useContext(WSContext)

    const handleMessage = useCallback((action: ReducerAction) => {
        dispatch(action)
    }, [dispatch])

    const handleSend = useCallback((action: WSAction) => {
        console.log("SHOULD EMIT", action)
        socket?.emit(action)
    }, [dispatch])

    useEffect(() => {
        WebsocketManager.addSendListener(handleSend)
        WebsocketManager.addMessageListener(handleMessage)
        return () => {
            WebsocketManager.removeSendListener(handleSend)
            WebsocketManager.removeMessageListener(handleMessage)
        }
    }, [])


    useEffect(() => {
        dispatch(ReducerAction.USER_DISCONNECTED)
        socket = new WebSocketHandler(VITE_SERVER_URL, handleMessage, {mode, path: VITE_WS_PATH})
    }, [dispatch])

    return <></>
}

export default WebsocketProvider