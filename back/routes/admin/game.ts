import * as express from "express"
const router = express.Router()
import webSocketHandler from "../../websocket/websocket-handler"
import * as bodyParser from "body-parser"

const startGame = (req, res, next) => {
    webSocketHandler.startGame()

    res.status(200).send("Game started")
    next()
}

const resetGame = (req, res, next) => {
    webSocketHandler.resetGame()

    res.status(200).send("Game reset")
    next()
}

const startTopic = (req, res, next) => {
    const id = req.params['id']
    webSocketHandler.startTopic({ id })

    res.status(200).send(`Topic #${ id } started`)
    next()
}

const addTime = (req, res, next) => {
    webSocketHandler.addTime(req.body)

    res.status(200).send("Time added")
    next()
}

const finishTopic = (req, res, next) => {
    webSocketHandler.finishTopic()

    res.status(200).send("Topic ended")
    next()
}

const calculateScores = (req, res, next) => {
    const id = req.params['id']
    webSocketHandler.calculateTopicScores({ id: +id })

    res.status(200).send("Score calculated")
    next()
}

const showScores = (req, res, next) => {
    webSocketHandler.showScores()

    res.status(200).send("Screen changed to scores")
    next()
}
const showPodium = (req, res, next) => {
    webSocketHandler.showPodium()

    res.status(200).send("Screen changed to podium")
    next()
}

const PODIUM_POSITION_PROPS = {
    3: [ "podium-3-revealed" ],
    2: [ "podium-3-revealed", "podium-2-revealed" ],
    1: [ "podium-3-revealed", "podium-2-revealed", "podium-1-revealed" ],
}
const showPodiumPosition = (req, res, next) => {
    const position = req.params['position']
    const podiumPositionProp = PODIUM_POSITION_PROPS[+position];
    if (!podiumPositionProp) {
        throw new Error(`Position ${ position } does not exists`)
    }
    webSocketHandler.setAdditionalScreenProps(podiumPositionProp)

    res.status(200).send(`Position ${ position } (and lower) displayed`)
    next()
}
const resetPodiumPosition = (req, res, next) => {
    webSocketHandler.setAdditionalScreenProps([])

    res.status(200).send("Positions reset")
    next()
}

router.post('/start', startGame)
router.post('/reset', resetGame)
router.post('/addTime', bodyParser.json(), addTime)
router.post('/topic/:id/start', startTopic)
router.post('/topic/finish', finishTopic)
router.post('/topic/:id/calculateScores', calculateScores)
router.post('/scores/show', showScores)
router.post('/podium', showPodium)
router.post('/podium/showPosition/:position', showPodiumPosition)
router.post('/podium/resetPositions', resetPodiumPosition)

export default router