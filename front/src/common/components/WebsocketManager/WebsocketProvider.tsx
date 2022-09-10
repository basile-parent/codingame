import {FC, useCallback, useEffect} from 'react'
import WebSocketHandler from "./WebSocketHandler"
import {WSAction} from "../../../types/Actions"
import WebsocketManager from "./index"
import {DisplayMode} from "../../../types/DisplayMode";
import {useDispatch} from "react-redux";
import {PayloadAction} from "@reduxjs/toolkit";
import {ReduxActions, RootState} from "../../store";

const {VITE_SERVER_URL, VITE_WS_PATH} = import.meta.env
let socket: WebSocketHandler | null = null

type WebsocketProviderProps = {
    mode: DisplayMode
}
const WebsocketProvider: FC<WebsocketProviderProps> = ({mode}: WebsocketProviderProps) => {
    const dispatch = useDispatch()

    const handleMessage = useCallback((action: PayloadAction<any>) => {
        dispatch(action)
    }, [dispatch])

    const handleUpdate = useCallback((newState: RootState) => {
        dispatch(ReduxActions.updateStore(newState))

        if (newState.transitionTimeout) {
            setTimeout(() => {
                dispatch(ReduxActions.updateStore({
                        ...newState.delayedState,
                        transitionTimeout: 0,
                        delayedState: null
                    } as RootState,
                    "delayedStatus"))
            }, newState.transitionTimeout)
        }
    }, [dispatch])

    const handleSend = useCallback((action: WSAction) => {
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
        dispatch(ReduxActions.connected.disconnect())
        socket = new WebSocketHandler(VITE_SERVER_URL, {
            mode,
            path: VITE_WS_PATH,
            onConnect: () => handleMessage(ReduxActions.connected.connect()),
            onDisconnect: () => handleMessage(ReduxActions.connected.disconnect()),
            onSetPlayers: (players) => handleMessage(ReduxActions.players.setPlayers(players)),
            onNewEndTime: (newEndTime) => handleMessage(ReduxActions.game.newEndTime(newEndTime)),
            onUpdate: (newState) => handleUpdate(newState),
        })
    }, [dispatch])

    return <></>
}

export default WebsocketProvider