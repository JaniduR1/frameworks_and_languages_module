const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()
const port = 8000

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile('client.html', {root: __dirname})
    //res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));

})

let ITEMS = [
  {
    "id": 0,
    "user_id": "user1234",
    "keywords": 
    [
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

// POST

function CreateUID() 
{
  const rand = Math.floor(Math.random() * 10000);
  return rand;
}

app.post('/item', (req, res) => {
  //console.log("POST to item")
  //console.log(req.body)
  const dateFrom = new Date().toISOString(); //Current Date From to ISO Format 
  const dateTo = new Date().toISOString(); //Current Date From to ISO Format 
  //const id = Math.random() //Generate Random ID
  const data = req.body
  //data.date_to = dateTo;


  // Validation
  if (!data.user_id || !data.keywords || !data.description || !data.lat || !data.lon)
  {
    console.log("Error 405 - Invalid input - Some input fields are missing.")
    res.status(405).json({ error: "Invalid input - Some input fields are missing." });
  }
  else
  {


    //data.id = CreateUID(); //Adds ID field to body and sets it to const id above
    data['Date From'] = dateFrom; //Date From field
    data['Date To'] = dateTo; //Date From field

    //data["date_from:" ] = dateFrom // Adds Date_From field to body
    //data["id:" ] = id // Adds ID field to body

    // Format Body Field Order
    const orderdFields = 
    {
      "id": CreateUID(),
      "user_id": data.user_id,
      "keywords": data.keywords,
      "description": data.description,
      "image": data.image,
      "lat": data.lat,
      "lon": data.lon,
      "date_from": data['Date From'],
      "date_to": data['Date To'],
    };

    ITEMS.push(orderdFields)
    //console.log("Item created successfully")
    //console.log(orderdFields)
    return res.status(201).json(orderdFields)
  }
})


// Get single item by ID
app.get('/item/:id', (req, res) => {
  //console.log("I will get this in the future " + req.params.id)
  for (let item of ITEMS)
  {
    //console.log(i)
    if (item.id == req.params.id)
    {
      //console.log("Successful Operation - Item Found!")
      //console.log(item)
      return res.status(200).json(item)
    }
  }
  //console.log("Error 404 - Item not found")
  return res.status(404).json({ error: "Item not found" });
})

// Get single item by UID
app.get('/items', (req, res, next) => {

  if(req.query.user_id){
    const uID = ITEMS.find(uID => uID.user_id === req.query.user_id);
    if (uID) 
    {
      //console.log("User Found: ")
      //console.log(uID)
      //res.json()
      return res.json(uID)
    }
    else 
    {
      return res.json({ error: "User not found" });
    }
  }
  else 
  {
    //console.log(ITEMS)
    return res.status(200).json(ITEMS)
  }

  //console.log("Error 404 - Item not found")
  //res.status(404).json({ error: "Item not found" });
})


// Delete item by ID
app.delete('/item/:id', (req, res) => {

  itemToDelete  = parseFloat(req.params.id)
  const i = ITEMS.findIndex(item => item.id === itemToDelete);

  if (i === -1) 
  {
    return res.status(404).json({ error: 'Item not found' });
  }

  ITEMS.splice(i, 1)
  //console.log("Item Deleted ")
  return res.status(204).json();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', function() {process.exit()})
