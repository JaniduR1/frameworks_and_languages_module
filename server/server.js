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
  const dateFrom = new Date().toISOString(); //Current Date From to ISO Format 
  const id = Math.random() //Generate Random ID
  const data = req.body
  //data.date_to = dateTo;

  data.id = id; //Adds ID field to body and sets it to const id above
  data['Date From'] = dateFrom; //Creates Date From field

  //data["date_from:" ] = dateFrom // Adds Date_From field to body
  //data["id:" ] = id // Adds ID field to body

  // Format Body Field Order
  const orderdFields = {
    "id": data.id,
    "user_id": data.user_id,
    "keywords": data.keywords,
    "description": data.description,
    "image": data.image,
    "lat": data.lat,
    "lon": data.lon,
    "date_from": data['Date From'],
  };


  console.log(orderdFields)
  res.status(201).json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})