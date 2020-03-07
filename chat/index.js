const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3001
app.use(cors)

app.listen(PORT, () => console.log(`Chat opened on ${PORT}!`))
