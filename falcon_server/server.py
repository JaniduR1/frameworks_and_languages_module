import falcon
import json
import datetime
import random
from wsgiref.simple_server import make_server
## Need CORS

ITEMS = [
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

# Post an Item to ITEMS list
class PostItem:
    def on_post(self, req, resp):

        data = json.loads(req.bounded_stream.read().decode('utf-8'))

        if data.get("user_id") is None or data.get("keywords") is None or data.get("description") is None or data.get("lat") is None or data.get("lon") is None:
            resp.media = {'Error 405': 'Invalid input - Some input fields are missing.'}
            resp.status = falcon.HTTP_405
        else:
            date_from = datetime.datetime.utcnow().isoformat()
            date_to = datetime.datetime.utcnow().isoformat()
            item_id = (random.randint(1,100)*random.randint(1,100))

            data['id'] = item_id
            data['Date From'] = date_from
            data['Date To'] = date_to

            ordered_fields = {
                "id": data.get('id'),
                "user_id": data.get('user_id'),
                "keywords": data.get('keywords'),
                "description": data.get('description'),
                "image": data.get('image'),
                "lat": data.get('lat'),
                "lon": data.get('lon'),
                "date_from": data.get('Date From'),
                "date_to": data.get('Date To'),
            }

            print(ordered_fields)
            ITEMS.append(ordered_fields)
            resp.status = falcon.HTTP_201

# Getting Item by ID
class GetItemID: 
    def on_get(self, req, resp, id):

        itemID = int(id)

        for i in ITEMS: # iterate through each item in ITEMS
            if i['id'] == itemID: # Check if requested ID matches an ID in ITEMS
                found = i
                resp.media = found # Returns the found item
                resp.status = falcon.HTTP_200 # Return successful 200
                break
            else:
                resp.media = {'error': 'Item not found'}
                resp.status = falcon.HTTP_404

# Getting All Items
class GetItems: 
    def on_get(self, req, resp, **kwargs):

        resp.media = ITEMS
        resp.status = falcon.HTTP_200


class DeleteItem:
    def on_delete(self, req, resp, id):
        itemID = int(id)
        i = -1 # Sets i to -1 to begin with

        # Go through ITEMS to find the item's index
        for j, item in enumerate(ITEMS):
            if item['id'] == itemID:
                i = j # Sets i to now store the index of item
                break
        
        if i == -1: # If i = -1 from start error
            resp.media = {'error': 'Item not found'}
            resp.status = falcon.HTTP_404
        else:
            ITEMS.pop(i) # If item is found Delete
            resp.status = falcon.HTTP_204



app = falcon.App()

app.add_route('/item', PostItem()) # POST Endpoint
app.add_route('/items', GetItems()) # Get All Items
#app.add_route('/item/{id}', GetItemID()) # Get Item By ID
app.add_route('/item/{id}', DeleteItem()) # Delete Item By ID

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()