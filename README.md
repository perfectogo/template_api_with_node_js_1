# template_api_with_node_js_1
rest_full_api_with_node_js_+_postgresql


# permission
```
    sudo chmod 666 /var/run/docker.sock
```

# build image
```
    docker build . -t <your username>/node-web-app
```

# run
```
    docker run -p 49160:8080 -d <your username>/node-web-app
```