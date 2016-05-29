# Trucksu Frontend

trucksu-frontend is the frontend of the Trucksu website. The application consists of a React/Redux app.

Webpack is used to build the JS bundle.

##### Running

Make sure you're running trucksu-web (the API) as well.

```sh
# you could also skip this step and run it on your host machine instead.
# if you run on the host machine, then make sure that port 4001 is not forwarded
# in the Vagrantfile
$ vagrant ssh

$ cd src/trucksu-frontend
$ npm install # when you're not on Windows
$ npm install --no-bin-links # only if you're on Windows

$ npm run dev # if you are running trucksu-web on port 8080

# If you are running trucksu-web on port 80, then run this instead
$ API_PORT=80 npm run dev
```

Now visit [http://localhost:4001](http://localhost:4001) in your browser!

