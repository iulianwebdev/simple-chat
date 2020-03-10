const chat = new Chat()

chat.init()

const name = window.prompt('Username:')
/** @type {import('socket.io').Socket} */
let socket = io.connect('http://localhost:3001')

socket.emit('user-connect', name)

socket.on('user-connected', function (users) {
  // console.log('User logged in', userName)
  chat.addUsers(users)
  chat.loginAs(name)
})

var chatUsersWrapper = document.getElementById('chat-users')
var chatMessagesWrapper = document.getElementById('chat-messages')

document.addEventListener('lobby-render', function (event) {
  if (!event.detail.template) {
    throw new Error('Element not provided on re-render')
  }
  chatUsersWrapper.innerHTML = event.detail.template
})
