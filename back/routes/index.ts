import * as bodyParser from "body-parser"
import checkCode from "./checkCode"
import * as express from "express"
const routes = express.Router()

routes.post('/code', bodyParser.text({type: '*/*'}), checkCode)

routes.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'PING OK' })
})

export default routes