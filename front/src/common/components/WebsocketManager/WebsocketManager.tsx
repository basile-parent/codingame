import {EventEmitter} from 'events'
import {WSAction} from "../../../types/Actions";

class WebsocketManager extends EventEmitter {
    constructor() {
        super();
    }

    // send = (action: ReducerAction) => this.emit("send", action)
    setName = (name: string) => this.emit("send", WSAction.SET_NAME(name))

    addSendListener = (callback: (param: any) => void) => this.addListener("send", callback)
    removeSendListener = (callback: (param: any) => void) => this.removeListener("send", callback)
    addMessageListener = (callback: (param: any) => void) => this.addListener("message", callback)
    removeMessageListener = (callback: (param: any) => void) => this.removeListener("message", callback)
}

export default new WebsocketManager()