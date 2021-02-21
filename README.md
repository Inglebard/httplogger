# httplogger
Simple nodejs app to log http request. Usefull to debug some http request.

Can easily be use with docker.

```
version: '3'

services:        
    app:
        image: node:lts
        environment:
          - TZ=Europe/Paris
        ports:
          - 8080:3000
        volumes:
          - <path to this app>:/app
        restart: unless-stopped
        user: "node"
        command: bash -c "cd /app ; npm install; npm run startdev"
```

