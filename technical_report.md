Technical Report
================

This technical report provides a thorough evaluation of a software application, containing individual server and client components. It delivers two distinct servers and clients built with the frameworks; Falcon, ExpressJS, VueJS and React. The servers built with Falcon and ExpressJS delivers two RESTApi which follows the openAI specification provided by the Freecycle-Inc company.


Critique of Server/Client prototype
---------------------

### Overview
The existing prototypes `example_server` and `example_client` are rudimentary versions that lack the saleability, robustness, and security required for the business of the application. Below are two of many issues with the current prototype and technical reasons why considering implementing a framework would be beneficial for the business.

### Inadequate Error Handling

`example_server/app/server.py`
```python
def app(request):
    request = decode_json_request(request)

    if _func := find_route_func(request, ROUTES):
        return _func(request)

    return {'code': 404, 'body': 'no route'}
```
The error handling in the server code is basic as it simply returns a 404 response for any unspecified route. From a business perspective, this could negatively impact the user experience and as it leads to insufficient logging for administrators, it would complicate the debugging process for developers ultimately taking more time to fix an issue related to this.

### Absent Middleware Support
`example_server/app/server.py`
```Python
def app(request):
    # Middleware
    request = decode_json_request(request)
    if _func := find_route_func(request, ROUTES):
        return _func(request)
```

Not implementing middleware in the server reduces its scaleability, hinders its performance, and overall limits the application's functionality. With the application having deficiencies such as these the application would ultimately fail to meet client and business needs/demands. Introducing a framework that has middleware support would help develop a robust, scalable, and more secure application for the business.

### Recommendation
As shown above, the current `example_server` and `example_client` prototypes are not fit for business-grade applications as they lack the scalability and robustness needed from such applications. The issues with error handling and the absence of middleware are two of many issues with the prototypes. To meet the evolving business needs more efficiently, rebuilding the application with the use of frameworks would be the best-recommended approach.

Frameworks such as Falcon or Flask for the server side and React or Vue.js for the client provide not only solutions to the issues addressed above but also improve the scalability of the application and the overall performance of the application. To demonstrate this, I have rebuilt the application with the use of Falcon and React and have justified the benefits, reasons, and key features of both frameworks.



Server Framework Features
-------------------------

### Simple Routing
Falcon's routing mechanism demonstrates an efficient approach to URL management. This significantly streamlines the development process, enhancing both the readability and maintainability of application code. By abstracting intricate routing patterns, Falcon promotes accelerated development cycles and facilitates improved navigability within the codebase.
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

https://falcon.readthedocs.io/en/stable/api/routing.html
https://www.geeksforgeeks.org/python-falcon-routing/


### WebSocket support
Falcons webSocket support facilitates persistant bidirectional communication for real time client updates. This could be useful for prompting users with new information, for example, when a product that matches their query becomes available. This provides an application that can push data to a list of users who are listning to a perticular area and can be notified through websocket. 
`falcon_server/server.py`
```python
###_
```
However, while this would make a good proof of concept, webSocket may face scalability issues with Python in handling numerous concurrent connections, therefor with large scale applications, integrating with external brokers like MQTT for managing real-time data flow can be a more scalable solution.
https://www.geeksforgeeks.org/python-falcon-wsgi-vs-asgi/
https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/
https://mqtt.org/


### Request and response objects

Falcon uses the inversion of control (IoC) pattern to simplify the processing of HTTP requests and responses by giving developers direct access to headers and bodies through 'req (request)' and 'resp (response)' objects which encapsulates a wide range of functionalities for managing HTTP connections. This allows developers to easily manipulate HTTP requests and outgoing responses.

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



Server Language Features
-----------------------

### Interpreted Language

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

### Custom Hooks

Custom hooks are a feature used for extracting component logic into reusable functions. Within the application built, the `useItemOperations.js` custom hook encapsulates API interactions, providing functionalities like posting new items, fetching items, and deleting items.

`react_client/src/useItemOperations.js`
```react(js)
const useItemOperations = (urlAPI) => {
    // State and Axios calls for item operations
    const [items, setItems] = useState([]);
    // ...

    return { items, getItems, postForm, deleteItem };
};
```
However, while custom hooks are aid in making more maintainable and readable code, thsey introduce an additional layer of abstraction which may obscure the direct data flow for new developers, therefor it is cruital to have documentation and clear naming conventions to maintain clarity in the application's structure.

### One-Way Data Binding
In React one way data binding refers to the unidirectional data flow pattern where the application's data is managed by means of the state and the UI is rendered as a function of this state. This consequently promotes predictable data flow and enhanced performance by minimising direct DOM manipulations.

`react_client/src/useItemOperations.js`
```javascript react(js)
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

https://www.geeksforgeeks.org/reactjs-unidirectional-data-flow/
https://dev.to/parnikagupta/one-way-data-binding-in-react-30ea
https://www.educative.io/answers/what-is-unidirectional-data-flow-in-react
https://blog.logrocket.com/understanding-redux-tutorial-examples/

### Component Based Architecture

In React, components composition is where components are built using smaller and reusable pieces, therefore encapsulating their structure and logic. This promotes maintainability and reusability allowing complex UIs to be made from separated components.

(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

https://legacy.reactjs.org/docs/composition-vs-inheritance.html
https://www.freecodecamp.org/news/avoid-prop-drilling-in-react/#:~:text=What%20is%20Prop%20Drilling%3F,component%20that%20finally%20consumes%20it.



Client Language Features
------------------------

### Event Handling

In JavaScript, Event handling allows for the interaction with HTML elements through actions performed by a user such as clicks or keyboard input. Registering event listeners allows developers to define responsive behaviours, therefore enabling interactive and dynamic web applications, It is fundamental in DOM manipulation and UI updates.

`react_client/src/Form.js`
```JavaScript
<button onClick={handleSubmit}>Post</button>

function handleSubmit(event) {
    event.preventDefault(); // Prevents default button action
    // Submission logic here
}
```
However, while event handling promotes interactive and dynamic web applications, improper event handling can lead to performance issues or memory leaks, therefor using delegation or modern frameworks can rationalise event management and consequently mitigate drawbacks.
https://www.w3schools.com/js/js_events.asp
https://www.javascripttutorial.net/javascript-dom/handling-events-in-javascript/
https://devblogs.microsoft.com/visualstudio/unlocking-the-secrets-of-managed-memory-dive-into-event-handler-leak-insights/

### Dynamic Typing

In JavaScript, dynamic typing means that the variable data types are determined at runtime which allows variables to hold any type of data and to change types during execution. This flexibility allows for rapid development and ease of scripting for varied and complex functionalities.

`react_client/src/...`
```JavaScript

```

While dynamic typing enables flexibility, it can lead to unexpected bugs if the variables change types by mistake. To mitigate this, using a static typing language such as TypeScript or implement precise type-checking and testing practices in JavaScript will reduce the errors which may occur due to dynamic typing.
https://medium.com/@easyexpresssoft/dynamic-typing-coercion-and-operators-a8986be8c198
https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)
