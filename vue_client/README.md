# VueJS Client With Bootstrap Project

## How to run the client:
1. To run the client in a container, if you are in the root directory or another directory other than the 'vue_client' directory move from your present directory to the vue_client directory.

2. Open a terminal once you are within the 'vue_client' directory. Your terminal file path should now be similar to this: *`/workspaces/frameworks_and_languages_module/vue_client`*

3. Finally run this command - `make build && make run`
    - Note: Once you have run the command above you may not need to run that same command above which installs all the relevant packages, therefor run the command '`make run`' in the terminal which should run the client.

4. If you wish to connect to a server please make the clients and servers port visibilities public and at the end of the client url add *?api=* and the url of the server. Which should look similar to this: *`https://client-8001.app.github.dev/?api=https://server-8000.app.github.dev/`*

### Find a bug?
Oh you found a bug? No! you didn't, thats a feature.