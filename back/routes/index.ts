import * as express from "express"
import * as bodyParser from "body-parser"
import checkCode from "./checkCode"
import {getStatus} from "./status"
import adminRoutes from "./admin"

const router = express.Router()

router.post('/code', bodyParser.text({type: '*/*'}), checkCode)
router.get('/status', getStatus)
router.use('/admin', adminRoutes)

router.get('/', (req, res) => {
  res.status(200)
      .setHeader('Content-Type', 'application/json')
      .json({ success: true, message: 'PING OK - Version finale !' })
})

export default router