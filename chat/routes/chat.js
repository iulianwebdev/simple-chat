const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ chats: [1, 2, 3, 4] })
})

module.exports = router
