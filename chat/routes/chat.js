const Chat = require('../services/chat')
const chat = new Chat()
/**
 *
 * @param {SocketIO} socket
 */
const router = function (socket) {
  socket.on('user-connect', (userName) => {
    chat.addUser(userName)
    socket.emit('user-connected', userName)
  })
}

module.exports = router
