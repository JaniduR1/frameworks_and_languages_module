const express = require('express')
const app = express()
const port = 8000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const ITEMS = 
[
  {
    "id": 0,
    "user_id": "user1234",
    "keywords": [
      "hammer",
      "nails",
      "tools"
    ],
    "description": "A hammer and nails set",
    "image": "https://placekitten.com/200/300",
    "lat": 51.2798438,
    "lon": 1.0830275,
    "date_from": "2023-10-20T22:57:05.814Z",
    "date_to": "2023-10-20T22:57:05.814Z"
  }
]


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
  ITEMS.push(orderdFields)
  res.status(201).json()
})


app.get('/items', (req, res) => {
  res.json(ITEMS)
})

app.get('/item/:id', (req, res) => {
  console.log("I will get this in the future " + req.params.id)
  for (let item of ITEMS)
  {
    //console.log(i)
    if (item.id == req.params.id)
    {
      console.log("Item Found!")
      console.log(item)
      res.status(200)
      return;
    }
  }

  res.status(404).json({ error: "Item not found" });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})