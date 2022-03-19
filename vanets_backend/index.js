const express = require('express')
const cors = require('cors')
const direction = require('./googleapi/direction')

const app = express()
const port = 4000

app.use(cors())
app.use('/api/direction', direction);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})