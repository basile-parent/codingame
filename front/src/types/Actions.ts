import playerUtils from "../utils/playerUtils"

class Action {
    public type: string
    public payload?: any

    constructor(type: string, payload?: any) {
        this.type = type
        this.payload = payload
    }

    protected static _build = (type: string) => (payload?: any): Action => new Action(type, payload)
}

export class ReducerAction extends Action {
    public static USER_CONNECTED = this._build("connected")
    public static USER_DISCONNECTED = this._build("disconnected")
    public static SET_PLAYERS = this._build("setPlayers")
    public static STATUS = this._build("status")
    public static NEW_END_TIME = this._build("newEndTime")
}

export class WSAction extends Action {
    public static SET_NAME = (name: string) => this._build("setName")({ uuid: playerUtils.getPlayerUuid(), name })
}
