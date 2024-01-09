Technical Report
================

This technical report provides a thorough evaluation of a software application, containing individual server and client components. It delivers two distinct servers and clients built with the frameworks; Falcon, ExpressJS, VueJS and React. The servers built with Falcon and ExpressJS delivers two RESTApi which follows the openAI specification provided by the Freecycle-Inc company.


Critique of Server/Client prototype
---------------------

### Overview

The existing prototypes `example_server` and `example_client` are rudimentary versions that lack the saleability, robustness, and security required for the business of the application. Below are two of many issues with the current prototype and technical reasons why considering implementing a framework would be beneficial for the business.

### Manual State Management & DOM Manipulation

`example_client/index.html`
```javascript
function renderItems(data) {
		const $item_list = document.querySelector(`[data-page="items"] ul`);
		const new_item_element = () => document.querySelector(`[data-page="items"] li`).cloneNode(true);

		for (let item_data of data) {
			const $new_item_element = new_item_element();
			$item_list.appendChild($new_item_element);
			renderDataToTemplate(item_data, $new_item_element, renderItemListFieldLookup);
			attachDeleteAction($new_item_element);
		}
	}
```
The client's manual state management and DOM manipulation results in code that is difficult to maintain espically as applications get larger, this method is contaminating rendering with DOM changes and is making the code significantly less scalable which is not benifitial for a business application.



### Cumbersome Routing

`example_server/app/server.py`
```Python
from .views import get_index, get_item, post_item, delete_item, get_items
ROUTES = (
    ('OPTIONS', r'.*', options_response),
    ('GET', r'/$', get_index),
    ('POST', r'/item$', post_item),
    ('GET', r'/item/(?P<id>\d+)$', get_item),
    ('DELETE', r'/item/(?P<id>\d+)$', delete_item),
    ('GET', r'/items$', get_items),
)
```
The servers routing is defined globally and in a single location using regular expressions, this method lacks saleability and flexibility making the application difficult to manage and expand.

### Recommendation

As shown above, the current `example_server` and `example_client` prototypes are not fit for business-grade applications as they lack the scalability and robustness needed from such applications. The issues with manual state management and cumbersome routing are two of many issues with the prototypes. To meet the evolving business needs more efficiently, rebuilding the application with the use of frameworks would be the best-recommended approach.

Frameworks such as Falcon or Flask for the server side and React or Vue.js for the client provide not only solutions to the issues addressed above but also improve the scalability of the application and the overall performance of the application. To demonstrate this, I have rebuilt the application with the use of Falcon and React and have justified the benefits, reasons, and key features of both frameworks.


Server Framework Features
-------------------------

### Simple Routing

Falcon's routing mechanism demonstrates an efficient approach to URL management. This significantly streamlines the development process, enhancing both the readability and maintainability of application code. By abstracting intricate routing patterns, Falcon promotes accelerated development cycles and facilitates improved navigability within the codebase.

https://falcon.readthedocs.io/en/stable/api/routing.html

`falcon_server/server.py`
```python
app = falcon.App()
app.add_route('/', StaticResource()) # Start
app.add_route('/item', PostItem()) # POST Endpoint
app.add_route('/items', GetItems()) # Get All Items
app.add_route('/item/{id}', ItemsResource()) # Get AND Delete Item By ID

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')

        # Serve until process is killed
        httpd.serve_forever()
```
However, while Falcon's simplicity offers benefits for rapid prototyping and development of smaller applications, it is critical to acknowledge that more complex, larger scale projects may require further customisation. Ensuring optimal performance and organisational rationality in those scenarios might require integrating more sophisticated routing solutions to meet the demands of these complex applications.

https://www.geeksforgeeks.org/python-falcon-routing/ \
https://dev.to/m4cs/creating-a-rest-api-with-mongodb-and-the-falcon-framework-python-5i6


### WebSocket support

Falcons webSocket support facilitates persistant bidirectional communication for real time client updates. This could be useful for prompting users with new information, for example, when a product that matches their query becomes available. This provides an application that can push data to a list of users who are listning to a perticular area and can be notified through websocket.

https://www.geeksforgeeks.org/python-falcon-wsgi-vs-asgi/ \
https://www.tutorialspoint.com/python_falcon/python_falcon_tutorial.pdf

`falcon_server/server.py`
```python
import falcon.asgi
import falcon.media


class SomeResource:
    async def on_websocket(self, req: Request, ws: WebSocket, account_id: str):
        some_header_value = req.get_header('Some-Header')

        if some_condition:
            await ws.close()
            return

        if 'wamp' not in ws.subprotocols:
            return
        #...

        while True:
            try:
                event = await my_next_event()
                await ws.send_text(event)
            # ....

class SomeMiddleware:
    # ....

    async def process_resource_ws(self, req: Request, ws: WebSocket, resource, params):
        pass

app = falcon.asgi.App(middleware=SomeMiddleware())

```
*`not implemented on server prototype I have provided, however taken from falcon web documentation`*

However, while this would make a good proof of concept, webSocket may face scalability issues with Python in handling numerous concurrent connections, therefore with large scale applications, integrating with external brokers like MQTT for managing real-time data flow can be a more scalable solution.

https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/ \
https://mqtt.org/ \


### Request and response objects

Falcon uses the inversion of control (IoC) pattern to simplify the processing of HTTP requests and responses by giving developers direct access to headers and bodies through 'req (request)' and 'resp (response)' objects which encapsulates a wide range of functionalities for managing HTTP connections. This allows developers to easily manipulate HTTP requests and outgoing responses.

https://falcon.readthedocs.io/en/stable/api/request_and_response.html \
https://www.tutorialspoint.com/python_falcon/python_falcon_request_and_response.htm \


`falcon_server/server.py`
```python
class ItemsResource:
    def on_get(self, req, resp, id):
        #...
        for i in ITEMS:
            # ... (handling of the request)
                resp.media = found # Returns the found item
                resp.status = falcon.HTTP_200 # Return successful 200
            #...
    def on_delete(self, req, resp, id):
        # ... (handling of the delete request)
                resp.status = falcon.HTTP_204
#...
```

However, while these objects simplify HTTP interactions and encourage clean, maintainable code, in specialised scenarios which requires irregular handling of HTTP requests and responses they may introduce constraints. For applications with unique architectural requirements this feature could be impacting performance or developer overhead as the abstraction provided by Falcon might demand additional layers. Therefore, utilising proxy services that can handle a high-volume of transactions may be beneficial, resulting in maintaining the performance of the application while leveraging Falcon's streamlined request and response handling which guarantees scalability and flexibility.

https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/ \
https://www.cloudflare.com/learning/performance/types-of-load-balancing-algorithms/ \
https://www.digitalocean.com/community/conceptual-articles/introduction-to-proxies \



Server Language Features
-----------------------

### Dynamic Data Structure Handling

Python makes handling dynamic data structures easier allowing developers to create and manipulate lists, dictionaries, and other data structures more easily, and because of its versatile and straightforward data structure syntax that closely resembles JSON for smooth data representation and manipulation you can create intricate nested structures without using extensive declarations, unlike a static language.

https://www.dataquest.io/blog/data-structures-in-python/ \

`falcon_server/server.py`
```python
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
        #...
        "lat": 51.2798438,
        "lon": 1.0830275,
        "date_from": "2023-10-20T22:57:05.814Z",
        "date_to": "2023-10-20T22:57:05.814Z"
  }
]

class PostItem:
    def on_post(self, req, resp):
        #...
        ordered_fields = {
                "id": data.get('id'),
                "user_id": data.get('user_id'),
                "keywords": keywords,
                #...
            }
```
This feature of python is a great tool for web applications because not only does it speed up development it also improves the readability/maintainability of the code as it enables developers to express complicated data in a straightforward manner. However, while this is a very powerful feature for web applications if it is not handled appropriately, it may result in runtime issues.

https://docs.python.org/3/library/json.html \
https://docs.python.org/3/tutorial/datastructures.html?highlight=data%20structures \
https://www.danielmorell.com/blog/dynamically-calling-functions-in-python-safely \

### Large Standard Library

Pythons `batteries included` viewpoint provides developers with a wide range of tools within its standard library. Having this extentive library in python provides pre built modules for a large number of functionalities.

https://docs.python.org/3/library/ \
https://www.computer.org/csdl/magazine/cs/2007/03/c3007/13rRUzpQPH7 \

`falcon_server/server.py`
```python
import datetime
import random

class PostItem:
    def on_post(self, req, resp):
        data = json.loads(req.bounded_stream.read().decode('utf-8'))
        # ...
        date_from = datetime.datetime.now().isoformat()
```
This feature streamlines web application development and helps with rapid prototyping by offering out of the box solutions for common tasks and reduces dependency management. 


Client Framework Features
-------------------------

### Custom Hooks

Custom hooks are a feature used for extracting component logic into reusable functions. Within the application built, the `useItemOperations.js` custom hook encapsulates API interactions, providing functionalities like posting new items, fetching items, and deleting items.

https://legacy.reactjs.org/docs/hooks-custom.html \
https://www.w3schools.com/react/react_customhooks.asp \

`react_client/src/useItemOperations.js`
```javascript
const useItemOperations = (urlAPI) => {
    // State and Axios calls for item operations
    const [items, setItems] = useState([]);
    // ...

    return { items, getItems, postForm, deleteItem };
};
```
Custom hooks in React aim to simplify logic reuse and enhances component readability in applications. However, while this aids in making more maintainable code, thsey introduce an additional layer of abstraction which may obscure the direct data flow for new developers, therefore it is cruital to have documentation and clear naming conventions to maintain clarity in the application's structure.

https://dev.to/adevnadia/why-custom-react-hooks-could-destroy-your-app-performance-nid \
https://richbray.medium.com/hot-take-react-hooks-are-bad-for-your-code-heres-why-d95410d07402 \

### One-Way Data Binding

In React one way data binding refers to the unidirectional data flow pattern where the application's data is managed by means of the state and the UI is rendered as a function of this state. This consequently promotes predictable data flow and enhanced performance by minimising direct DOM manipulations.

https://www.geeksforgeeks.org/reactjs-unidirectional-data-flow/ \
https://dev.to/parnikagupta/one-way-data-binding-in-react-30ea \

`react_client/src/useItemOperations.js`
```javascript
const Form = () => {
    const [user_id, setUserID] = useState('');

    return (
        <div className='form'>
            {/* ...*/}
            <div className='flex flex-col md:flex-row items-center'>
                <label className='block font-bold pr-4 mb-2 md:mb-0 md:w-32' htmlFor="UserID">UserID: </label>
                <input
                    // ...
                    value={user_id}
                    onChange={(event) => setUserID(event.target.value)}
                />
            </div>
            {/* ... */}
        </div>
```

React's one-way data binding makes the connection between the user interface and the underlying data simpler. It guarantees a single source of truth by showing components as a function of state, which makes state management predictable. However, when passing data through several nested children components, problems can arise, especially with complex applications and deep component trees when passing down props. With complex applications, state management libraries like Redux can help manage and distribute state more efficiently therefore preventing prop passing and maintaining a manageable code structure.

https://www.educative.io/answers/what-is-unidirectional-data-flow-in-react \
https://blog.logrocket.com/understanding-redux-tutorial-examples/ \

### Component Based Architecture

In React, components composition is where components are built using smaller and reusable pieces, therefore encapsulating their structure and logic.

https://nandbox.com/all-you-need-to-know-about-component-based-architecture/ \

`react_client/src/App.js`
```Javascript
function App() {
    return (
        //<h1 className='text-7xl text-center text-blue-400'>Hello World</h1>
        <div className='App'>
            <Navbar />
            <div className='content'>
                <h2 className='text-4xl font-bold'>Create</h2>
                <Form />
            </div>
        </div>
    
    );
}
```
React's component based architecture solves the problem of code reusability and maintainability by breaking the UI into reusable components which simplifies the development process and enhances the application's scalability which is particularly useful in large scale business web applications.

https://legacy.reactjs.org/docs/composition-vs-inheritance.html \
https://medium.com/@dan.shapiro1210/understanding-component-based-architecture-3ff48ec0c238 \
https://handsonreact.com/docs/component-architecture \


Client Language Features
------------------------

### Arrow Functions
Arrow functions which were introduced in ES6 provides developers with a concise syntax for writing function expression, which allow for shorter syntax and binds the value lexically making them useful for callbacks where a clear scope is critical.

https://www.w3schools.com/js/js_es6.asp \
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions \

`react_client/src/Form.js`
```JavaScript
const useItemOperations = (urlAPI) => {
    // ...
    const postForm = (form) => {
        return axios.post(`${urlAPI}/item`, form)
        .then(() => {
            getItems(); // To Refresh
        })
    // ...
}
```
In web application development this feature is particularly useful as it addresses the need for concise and maintainable code, especially component based arcetectures like React as developers can write more intuitive code which fits with React's declarative programming model.

https://egghead.io/blog/wtf-is-declarative-programming \
https://www.educative.io/answers/what-is-declarative-programming-in-react \



### Functions as First-Class Citizens

Javascript treats funcutions as first-class citizens which means they can be assigned to variables, passed as arguments, and returned from other functions. This enables complex event handling, and functional programming techniques which enhances the flexibility of code.

https://www.geeksforgeeks.org/what-is-the-first-class-function-in-javascript/ \

`react_client/src/Form.js`
```Javascript
const Form = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
        {/*...*/}
    );
```

When developing web applications in Javascript this ability to pass functions as parameters streamlines event handling and asynchronous operations, leading to succinct and code patterns and enables dynamic UI interactions and server comunication in React.

https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function \
https://medium.com/@rabailzaheer/first-class-and-higher-order-functions-86d14e40c688 \


Conclusions
-----------
In conclusion, as justified above the prototype `example_server` and `example_client` show that they are unfit for a business application with its major deficiencies. To enhance the robustness and scaleability of the application I would recommend transitioning to more robust and established frameworks, such as, Falcon for the server side and React for the client side. The use of frameworks will also lead to faster development cycles, better code quality, and easier maintenance. Additionally, since these suggested frameworks are established they come with extensive documentation which is extremely useful for not only streamlining the development process but also industry standardising the application which will not only ensure its longevity and adaptability to the technological evolution but will also mean there is a larger quantity of developers that could be employed to improve and maintain the application. 

The suggested frameworks to be used are:\
- **Falcon** - Chosen for the server side not only due to the features justified above but also due to it being ideal for developing lightweight APIs as it is highly efficient in handling HTTP requests and its simplistic which promotes quick development and easy understanding which is essential in a fast-paced business environment.\
- **React** - React's component-based architecture enabling the creation of reusable UI components leading to more organised, maintainable, and scalable code, and React’s efficient data handling mechanisms ensuring seamless UI updates in response to state changes which enhances the overall user experience which is critical for the business. Similar to Falcon above, it has a large developer community and extensive documentation which is crucial for rapid development and problem-solving.Furthermore React’s ability to integrate with other tools and technologies offers flexibility and scalability and ensures the application adaptability for the future.

While these two frameworks do not provide every functionality available and different frameworks exist outside of these two which provide other functionality, I believe that using these frameworks would be significantly better than the current prototypes. This  would provide the business with a scalable, maintainable, and robust application that would not only be adaptable but would also provide the clients with a much more sophisticated and visually appealing client side, that could be integrated with a frontend design framework such as TailwindCSS or Bootstrap for an even more visually appealing client side front end client side.