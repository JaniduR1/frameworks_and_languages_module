Technical Report
================

(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### (name of Issue 1)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### (name of Issue 2)

(A code snippet example demonstrating the issue)
(Explain why this pattern is problematic - 40ish words)

### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

### Simple Routing

Falcon's routing system is straightforward. It uses resource-based routing to promote a RESTful architectural style, therefore, permitting the easy mapping of URLs to sources. This characteristic simplifies the development and upkeep of the web application(s).
`falcon_server/server.py`
```python
app = falcon.App()
app.add_route('/item', PostItem()) # POST Endpoint
app.add_route('/items', GetItems()) # Get All Items

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()
```
This feature addresses the complexity of internet routing, offering a clear and concise way to define routes. It also advantages developers by decreasing boilerplate code and enhancing the clarity of the application.
https://falcon.readthedocs.io/en/stable/api/routing.html


### ASGI, WSGI, and WebSocket support

Falcon provides support for ASGI and WSGI therefor enabling asynchronous and synchronous server interfaces. Furthermore, it provides WebSocket communications protocol which supports real-time bi-directional communication between server and client. This allows developers to choose between synchronous or asynchronous standards based on the needs of their application.
`falcon_server/server.py`
```python
import falcon
#...
from wsgiref.simple_server import make_server
#...
if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()
```
This is beneficial as the ASGI and WebSocket support in Falcon allows developers to build more responsive applications and WSGI support provides compatibility with multiple hosting environments and maintains simplicity for a straightforward web application.
https://www.geeksforgeeks.org/python-falcon-wsgi-vs-asgi/
https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/





### Straightforward access to headers and bodies through request and response objects

Falcon uses the inversion of control (IoC) pattern to simplify the processing of HTTP requests and responses by giving developers direct access to headers and bodies through 'req (request)' and 'resp (response)' objects. This allows developers to easily read and control the incoming requests and outgoing responses.
`falcon_server/server.py`
```python
class StaticResource:
    def on_options(self, req, resp):
            resp.status = falcon.HTTP_204
            resp.set_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

    def on_get(self, req, resp):
        resp.content_type = 'text/html'
        with open('client.html', 'r') as f:
            resp.body = f.read()
#...
```
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
https://falcon.readthedocs.io/en/stable/api/request_and_response.html#rr


Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)
