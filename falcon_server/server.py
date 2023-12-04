import falcon
import json
import datetime
import random
from falcon_cors import CORS
from wsgiref.simple_server import make_server

cors = CORS(
    allow_all_origins=True,
    allow_all_headers=True,
    allow_all_methods=True,
)


## Returns a HTML page at start: https://stackoverflow.com/a/34827474
class StaticResource:
    def on_options(self, req, resp):
            resp.status = falcon.HTTP_204
            resp.set_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') # Set the header to allow GET, POST, OPTIONS methods, https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers, https://portswigger.net/web-security/cors/access-control-allow-origin

    def on_get(self, req, resp):
        resp.content_type = 'text/html'
        with open('client.html', 'r') as f:
            resp.body = f.read()

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

            keywordsList = data.get("keywords")
            
            #If the keyword is a string, https://www.w3schools.com/python/ref_func_isinstance.asp
            if isinstance(keywordsList, str):
                
                #https://docs.python.org/2/library/stdtypes.html#str.strip, https://stackoverflow.com/a/8270146 - Remove white spaces.
                keywords = [keyword.strip() for keyword in keywordsList.split(',')] # Split by ,
            else:
                keywords = keywordsList




            date_from = datetime.datetime.now().isoformat()
            date_to = datetime.datetime.now().isoformat()
            item_id = (random.randint(1,100)*random.randint(1,100))

            data['id'] = item_id
            data['Date From'] = date_from
            data['Date To'] = date_to

            ordered_fields = {
                "id": data.get('id'),
                "user_id": data.get('user_id'),
                "keywords": keywords,
                "description": data.get('description'),
                "image": data.get('image'),
                "lat": data.get('lat'),
                "lon": data.get('lon'),
                "date_from": data.get('Date From'),
                "date_to": data.get('Date To'),
            }

            #print(ordered_fields)
            resp.media = ordered_fields
            ITEMS.append(ordered_fields)
            resp.status = falcon.HTTP_201


# Getting Item by ID AND Deleting by ID
class ItemsResource:
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


class GetItems:
    def on_options(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin', '*') # Set the header to allow GET, POST, OPTIONS methods, https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers

    def on_get(self, req, resp, **kwargs):
        # uidQuery = req.get_param('user_id')
        # dateFromQuery = req.get_param('date_from')

        # requestedItem = [] # Empty array to hold a filtered user requested item like filterd by UID

        # for item in ITEMS:
        #     # Sets the default values, will be changed acordingly by the if statements below
        #     containsItem = True


        #     # Filter by UserID
        #     if uidQuery and item['user_id'] != uidQuery:
        #         containsItem = False

        #     ## Filter by date_from
        #     if containsItem and dateFromQuery:
        #         # Convert the date_from's to 'datetime' for comparison
        #         itemsDateFrom = datetime.datetime.fromisoformat(item['date_from'].replace('Z', '')) # Remove Z at the end
        #         queryDateFrom = datetime.datetime.fromisoformat(dateFromQuery.replace('Z', '')) # Remove Z at the end

        #         # Checks if the items date_from is earlier than the date_from query date, set to false
        #         if itemsDateFrom < queryDateFrom:
        #             containsItem = False


        #     ## Filter by keywords
        #     ### Need to implement

        #     # Add item to the requestedItem list if it passes the filters
        #     if containsItem:
        #         requestedItem.append(item)
        #resp.media = requestedItem


        resp.media = ITEMS
        resp.status = falcon.HTTP_200



# app = falcon.App()
app = falcon.App(middleware=[cors.middleware]) # Initialize the Falcon application with CORS middleware enabled - https://github.com/lwcolton/falcon-cors#usage

app.add_route('/', StaticResource()) # Start
app.add_route('/item', PostItem()) # POST Endpoint
app.add_route('/items', GetItems()) # Get All Items
app.add_route('/item/{id}', ItemsResource()) # Get AND Delete Item By ID
#app.add_route('/item/{id}', DeleteItem()) # Delete Item By ID


if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()