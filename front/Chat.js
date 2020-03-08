const ENTER_KEY_CODE = 13
const Chat = function () {
  /**
   * @type {Function}
   */
  this.ajax = null
  /**
   * @type {String}
   */
  this.name = null
  /**
   * @type {HTMLFormElement}
   */
  this.form = null
  /**
   * @type {HTMLTextAreaElement}
   */
  this.text = null
  /**
   * @type {String}
   */
  this.userName = ''
}

Chat.prototype.setAjax = function (ajaxFunc) {
  this.ajax = ajaxFunc
  return this
}

Chat.prototype.init = function (name) {
  if (!this.ajax) {
    throw new Error('No ajax agent set.')
  }
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

Chat.prototype.setActiveUser = function (user) {
  this.activeUser = user
}

Chat.prototype.send = function () {
  this.ajax(this.text.value)
}
