const app = require('express')()
const cors = require('cors')
app.use(cors())

const http = require('http').createServer(app)
const io = require('socket.io')(http)
const chatSocketRoutes = require('../chat/routes/chat')
const PORT = 3001

io.on('connection', chatSocketRoutes)

http.listen(PORT, () => console.log(`Chat opened on ${PORT}!`))
