import * as express from "express"
import * as bodyParser from "body-parser"
import checkCode from "./checkCode"
import webSocketHandler from "../websocket/websocket-handler"

const router = express.Router()

router.post('/code', bodyParser.text({type: '*/*'}), checkCode)
router.get('/status',  (req, res) => {
  res.status(200)
      .setHeader('Content-Type', 'application/json')
      .json(webSocketHandler.getAdminStatus())
})

router.get('/', (req, res) => {
  res.status(200)
      .setHeader('Content-Type', 'application/json')
      .json({ success: true, message: 'PING OK' })
})

export default router