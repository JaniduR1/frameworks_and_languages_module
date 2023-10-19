const express = require('express')
const app = express()
const port = 8000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/item', (req, res) => {
  console.log("POST to item")
  //console.log(req.body)
  //var data = req.body
  //console.log(data)
  res.status(201).json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})