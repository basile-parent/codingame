const bodyParser = require("body-parser");
const {checkCode} = require("./checkCode");
const routes = require('express').Router();

routes.post('/code', bodyParser.text({type: '*/*'}), checkCode);

routes.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'PING OK' });
});

module.exports = routes;