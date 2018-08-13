const express = require('express')
const bodyParser = require('body-parser')

const logger = require('../logger')
const routes = require('./routes')
const { jwt } = require('../../adapters/middlewares') 

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use(routes)
app.use(jwt.initialize())

app.get('/', (req, res) => {
    
})

app.listen(port, () => {
    logger.log('info', 'server', 'Listening on %s', port)
})