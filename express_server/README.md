# ExpressJS Framework Server Project

## Overview
This project is a ExpressJS javascript based REST server.

## Files
- **server.js**: The main JS code for the server.
- **Dockerfile**: Docker container setup.
- **Makefile**: Simplified commands for building and running the server.
- **package.json**: Contains the dependencies.
- **client.html**: Index html file for the server to show it is running.

## Running The Server:

#### Correct Folder
Open a terminal in the server folder or `cd` into the server directory.
- Note - Your terminal file path should now be similar to this: *`/workspaces/frameworks_and_languages_module/express_server`*

#### Run Locally
To run the server locally, *cd* in to the server directory then run the command, `make run_local` or in the terminal run the command `node server.js`.

#### Run Containerised
To run the server in a container run the command, *cd* in to the server directory then run the command, `make build && make run`.
 - Note  - If you run make build once you do not need to run it again unless you make changes to the files therefor just run the command `make run` after it.

## Connect Server to Client
If you wish to connect to a client please make the server and client port visibilities public and at the end of the client url add *?api=* and the url of the server. 
- Note - It should look similar to this: *`https://client-8001.app.github.dev/?api=https://server-8000.app.github.dev/`*

## Find a bug?
Oh you found a bug? No! you didn't, thats a feature.
