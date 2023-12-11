# React Client With Tailwind CSS Project

## Overview
This project is a ReactJS based client with Tailwind CSS added as a visual framework.

## Folders / Files
- **Dockerfile**: Docker container setup.
- **Makefile**: Simplified commands for building and running the client.
- **package.json**: Contains the dependencies.
- **_/src/_**: This folder contains the files which contains the front and back end code for the project

## Running The Client:
Firstly ensure you are in the correct folder and ensure you have npm installed and the correct dependencies installed:
```
$ npm install
$ npm install requirements.txt
```

#### Run Locally
Run the command, `make run_local` or in the terminal run the command `npm start`.

#### Run Containerised
To run the client in a container run the command, *cd* in to the server directory then run the command, `make build && make run`.
 - Note  - If you run make build once you do not need to run it again unless you make changes to the files therefore just run the command `make run` after it.

## Connect Server to Client
If you wish to connect to a server please make the server and client port visibilities public and at the end of the client url add `?api=` and the url of the server. 
- Note - It should look similar to this: *`https://client-8001.app.github.dev/?api=https://server-8000.app.github.dev/`*

## Find a bug?
Oh you found a bug? No! you didn't, thats a feature.
