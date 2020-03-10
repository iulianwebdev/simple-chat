const ENTER_KEY_CODE = 13
const Chat = function () {
  /**
   * @type {String}
   */
  this.name = null
  /**
   * @type {HTMLFormElement}
   */
  this.form = null
  /**
   * @type {Object[]}
   */
  this.lobbyUsers = []
  /**
   * @type {HTMLTextAreaElement}
   */
  this.text = null
  Object.defineProperty(this, 'users', {
    get () {
      return this.lobbyUsers
    },
    set (user) {
      this.lobbyUsers.push(user)
      console.log('set called', this.lobbyUsers)

      document.dispatchEvent(new CustomEvent('lobby-render', {
        bubbles: false,
        detail: {
          template: this.renderUsers()
        }
      }))
    }
  })
}

Chat.prototype.init = function (name) {

  this.name = name
  this.chatForm = document.getElementById('chat-form')
  this.text = document.getElementById('chat-input')

  this.chatForm.addEventListener('submit', function (event) {
    event.preventDefault()
  })
  this.text.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEY_CODE && event.ctrlKey && this.valid()) {
      this.send()
    }
  })
}

Chat.prototype.valid = function () {
  return this.text.value.trim().length > 0
}

Chat.prototype.addUsers = function (users) {
  this.lobbyUsers.splice(0)
  for (var i in users) {
    this.users = users[i]
  }
}

Chat.prototype.loginAs = function (userName) {
  var user = window.localStorage.getItem('loggedInChatUser')
  if (!user) {
    window.localStorage.setItem('loggedInChatUser', userName)
  }
  this.lobbyUsers.forEach(function (user) {
    user.active = false
    if (user.name === userName) {
      user.active = true
    }
  })
}

Chat.prototype.send = function () {
  this.ajax(this.text.value)
}

Chat.prototype.renderUsers = function () {
  return '<ul>' + this.lobbyUsers.reduce(function (acc, user) {
    var activeClass = user.active ? 'active' : ''
    acc += '<li class="' + activeClass + '">' + user.name + '</li>'
    return acc
  }, '') + '</ul>'
}
