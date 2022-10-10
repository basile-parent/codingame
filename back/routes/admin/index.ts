import * as express from "express"
const router = express.Router()

import gameRoutes from "./game"
import playersRoutes from "./players"

// Temp hard coded admin token
const HARD_CODED_ADMIN_TOKEN = "21d6f773-4fa8-40da-bd81-15f3e8578218"

const _checkAdminCode = (req, res, next) => {
    const token = req.headers["x-admin-token"]

    if (token !== HARD_CODED_ADMIN_TOKEN) {
        res.status(403)
            .send("Missing admin token")
        next("Missing admin token")
        return
    }

    next()
}

router.use('/game', _checkAdminCode, gameRoutes)
router.use('/players', _checkAdminCode, playersRoutes)

export default router
