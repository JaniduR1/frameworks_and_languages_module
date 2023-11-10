import falcon
import json
import datetime
import random
from wsgiref.simple_server import make_server


class GetItems:
    def on_get(self, req, resp, **kwargs):
        resp.text = ('POST Works')

        message = req.get_media()

        resp.media = {'message': message}
        resp.status = falcon.HTTP_200

class PostItem:
    def on_post(self, req, resp):

        data = json.loads(req.bounded_stream.read().decode('utf-8'))

        date_from = datetime.datetime.utcnow().isoformat()
        date_to = datetime.datetime.utcnow().isoformat()
        item_id = random.randint(1,100000)

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

        resp.status = falcon.HTTP_201


app = falcon.App()


app.add_route('/items', GetItems())
app.add_route('/item', PostItem())

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()