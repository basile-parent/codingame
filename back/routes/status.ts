import webSocketHandler from "../websocket/websocket-handler"

export const getStatus = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json(webSocketHandler.getAdminStatus())
    next()
}