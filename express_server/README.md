# ExpressJS Framework Server Project

## Overview
This project is an ExpressJS javascript based REST server. Please refer to the `openapi.yml` file for the specfication.

## Files
- **server.js**: The main JS code for the server.
- **Dockerfile**: Docker container setup.
- **Makefile**: Simplified commands for building and running the server.
- **package.json**: Contains the dependencies.
- **client.html**: Index html file for the server to show it is running.

## Running The Server:
#### Installing dependencies
To run the server locally, *cd* in to the correct directory and ensure the correct dependencies have been installed. You can use the commands below:
```
$ npm install requirements.txt
```
#### Running Locally
Once the dependencies have been installed correctly, you can run the server using the following command:
```
$ make run_local
```

#### Run Containerised
To run the server in a container run the command, *cd* in to the server directory then run the command, `make build run`.
This project is built with docker, you may want to check the Dockerfile.
 - Note  - If you run `make build` once you do not need to build it again unless you make changes to the files therefor just run the command `make run` after it.

## Connect Server to Client
If you wish to connect to a client please run and make the server and client port visibilities public and at the end of the client url add `?api=` and the url of the server. 
- Note - It should look similar to this: *`https://client-8001.app.github.dev/?api=https://server-8000.app.github.dev/`*

### Testing Server Functionality
```
$ curl -X POST http://localhost:8000/item -H "Content-Type: application/json" -d '{"user_id": "user1234", "keywords": ["hammer", "nails", "tools"], "description": "A hammer and nails set. In canterbury", "lat": 51.2798438, "lon": 1.0830275}'
$ curl -X GET http://localhost:8000/items
$ curl -X GET http://localhost:8000/item/1
$ curl -X GET http://localhost:8000/items?user_id=user1234</li>
$ curl -X DELETE http://localhost:8000/item/1
```
### Find a bug?
Oh you found a bug? No! you didn't, thats a feature.