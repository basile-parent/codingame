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
    public static DELAYED_STATUS = this._build("delayedStatus")
}

export class WSAction extends Action {
    public static SET_NAME = (name: string) => this._build("setName")({ uuid: playerUtils.getPlayerUuid(), name })
    public static SAVE_TEMP_CODE = (code: string) => this._build("tempCode")({ uuid: playerUtils.getPlayerUuid(), code })
    public static COMMIT_CODE = (code: string) => this._build("commitCode")({ uuid: playerUtils.getPlayerUuid(), code })
    public static SHARE_CODE = () => this._build("shareCode")({ uuid: playerUtils.getPlayerUuid() })

    public static START_GAME = this._build("startGame")
    public static RESET_GAME = this._build("resetGame")
    public static START_TOPIC = (topicId: number) => this._build("startTopic")({ id: topicId })
    public static REINIT_TOPIC = (topicId: number) => this._build("reinitTopic")({ id: topicId })
    public static ADD_TIME = (time: number) => this._build("addTime")({ time })
    public static FINISH_TOPIC = this._build("finishTopic")
    public static CALCULATE_SCORE = (topicId: number) => this._build("calculateTopicScore")({ id: topicId })
    public static SHOW_SCORES = this._build("showScores")
    public static SHOW_PODIUM = this._build("showPodium")
    public static SET_ADDITIONAL_SCREEN_PROPS = (newProps: string[]) => this._build("setAdditionalScreenProps")(newProps)

    public static APPROVE_PLAYER = (uuid: string) => this._build("approvePlayer")({ uuid })
    public static DELETE_PLAYER = (uuid: string) => this._build("deletePlayer")({ uuid })
    public static DELETE_ADMIN = (uuid: string) => this._build("deleteAdmin")({ uuid })
    public static DELETE_PRESENTATION = (uuid: string) => this._build("deletePresentation")({ uuid })

}
