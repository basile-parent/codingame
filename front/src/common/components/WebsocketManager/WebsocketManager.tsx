import {EventEmitter} from 'events'
import {WSAction} from "../../../types/Actions";

class WebsocketManager extends EventEmitter {
    constructor() {
        super();
    }

    setName = (name: string) => this.emit("send", WSAction.SET_NAME(name))
    saveTempCode = (code: string) => this.emit("send", WSAction.SAVE_TEMP_CODE(code))
    commitCode = (code: string) => this.emit("send", WSAction.COMMIT_CODE(code))
    shareCode = () => this.emit("send", WSAction.SHARE_CODE())

    startGame = () => this.emit("send", WSAction.START_GAME())
    resetGame = () => this.emit("send", WSAction.RESET_GAME())
    startTopic = (topicId: number) => this.emit("send", WSAction.START_TOPIC(topicId))
    reinitTopic = (topicId: number) => this.emit("send", WSAction.REINIT_TOPIC(topicId))
    addTime = (time: number) => this.emit("send", WSAction.ADD_TIME(time))
    finishTopic = () => this.emit("send", WSAction.FINISH_TOPIC())
    calculateTopicScore = (topicId: number) => this.emit("send", WSAction.CALCULATE_SCORE(topicId))
    showScores = () => this.emit("send", WSAction.SHOW_SCORES())
    showPodium = () => this.emit("send", WSAction.SHOW_PODIUM())
    setAdditionalScreenProps = (newProps: string[]) => this.emit("send", WSAction.SET_ADDITIONAL_SCREEN_PROPS(newProps))

    approvePlayer = (uuid: string) => this.emit("send", WSAction.APPROVE_PLAYER(uuid))
    deletePlayer = (uuid: string) => this.emit("send", WSAction.DELETE_PLAYER(uuid))
    deleteAdmin = (uuid: string) => this.emit("send", WSAction.DELETE_ADMIN(uuid))
    deletePresentation = (uuid: string) => this.emit("send", WSAction.DELETE_PRESENTATION(uuid))

    addSendListener = (callback: (param: any) => void) => this.addListener("send", callback)
    removeSendListener = (callback: (param: any) => void) => this.removeListener("send", callback)
    addMessageListener = (callback: (param: any) => void) => this.addListener("message", callback)
    removeMessageListener = (callback: (param: any) => void) => this.removeListener("message", callback)
}

export default new WebsocketManager()