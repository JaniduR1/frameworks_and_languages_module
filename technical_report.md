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

Falcon's routing system uses resource-based routing to promote a RESTful architectural style, therefore, permitting the easy mapping of URLs to sources which simplifies the development and upkeep of the web application(s).
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
However, while it shines in handling standard routing requirements, with applications containing numerous nested resources or dynamic URL parameters this may be adverse, as developers need to implement additional routing logic or utilise more sophisticated routing solutions.

https://falcon.readthedocs.io/en/stable/api/routing.html
https://www.geeksforgeeks.org/python-falcon-routing/


### ASGI, WSGI, and WebSocket support

Falcon framework extends its capabilities with WSGI, ASGI and WebSocket support. This allows it to offer a thorough collection for handling HTTP requests synchronously, asynchronously, and enables persistent bidirectional communication through WebSockets. 

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
##### *...might have to seperate WSGI ASGI and Websockets...*
WSGI is suitable for the traditional request and response cycles for the standard synchronous Python web applications. Whereas ASGI presents a more versatile interface that is capable of handling asynchronous requests which is essential for high-concurrency applications.The WebSockets support allows the server to update clients instantly prompting users with new information, for example, a product that matches their query becomes available.
While WSGI is reliable for standard web applications, ASGI excels in high-concurrency / real-time data scenarios offering better performance, however with added complexity. WebSocket may face scalability issues with Python in handling numerous concurrent connections, therefor with large scale applications, integrating with external brokers like MQTT for managing real-time data flow can be a more scalable solution.

https://www.geeksforgeeks.org/python-falcon-wsgi-vs-asgi/
https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/
https://mqtt.org/


### Request and response objects

Falcon uses the inversion of control (IoC) pattern to simplify the processing of HTTP requests and responses by giving developers direct access to headers and bodies through 'req (request)' and 'resp (response)' objects which encapsulates a wide range of functionalities for managing HTTP connections. This allows developers to easily manipulate HTTP requests and outgoing responses.

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
(Provide reference urls to your sources of information about the feature - required)


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
