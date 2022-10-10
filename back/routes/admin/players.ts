import * as express from "express"
const router = express.Router()
import webSocketHandler from "../../websocket/websocket-handler"
import * as bodyParser from "body-parser"

const deletePlayer = (req, res, next) => {
    const { uuid, type } = req.query
    if (!type) {
        throw new Error("Missing player type")
    }
    if (!uuid) {
        throw new Error("Missing player uuid")
    }

    switch(type) {
        case "player":
            webSocketHandler.deletePlayer({ uuid })
            res.status(200).send("Player deleted")
            break
        case "admin":
            webSocketHandler.deleteAdmin({ uuid })
            res.status(200).send("Admin deleted")
            break
        case "presentation":
            webSocketHandler.deletePresentation({ uuid })
            res.status(200).send("Presentation deleted")
            break
        default:
            throw new Error(`Type ${ type } does not exists`)
    }

    next()
}

const approvePlayer = (req, res, next) => {
    const { uuid } = req.query
    webSocketHandler.approvePlayer({ uuid })

    res.status(200).send("Player approved")
    next()
}

router.delete('/', deletePlayer)
router.post('/approve', approvePlayer)

export default router