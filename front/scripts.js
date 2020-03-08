const chat = new Chat()

chat
  .setAjax(ajax)
  .init()

const name = window.prompt('Username:')
/** @type {import('socket.io').Socket} */
var socket = io.connect('http://localhost:3001')

socket.emit('user-connect', name)

socket.on('user-connected', function (userName) {
  // console.log('User logged in', userName)
  chat.loginAs({ name: userName })
})
