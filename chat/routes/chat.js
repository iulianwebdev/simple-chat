const Chat = require('../services/chat')
const chat = new Chat()
/**
 *
 * @param {SocketIO} socket
 */
const router = function (socket) {
  socket.on('user-connect', (userName) => {
    if (!socket.username) {
      socket.username = userName
      chat.addToUsers(userName)
    }
    console.log(socket.username, chat.getUsers.length)
    socket.emit('user-connected', chat.getUsers())
    socket.broadcast.emit('user-connected', chat.getUsers())
  })
}

module.exports = router
