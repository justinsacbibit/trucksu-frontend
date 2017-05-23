# Trucksu Frontend
[![CircleCI](https://circleci.com/gh/justinsacbibit/trucksu-frontend.svg?style=svg)](https://circleci.com/gh/justinsacbibit/trucksu-frontend)

trucksu-frontend is the frontend of the Trucksu website. The application consists of a React/Redux app.

Webpack is used to build the JS bundle.

##### Prerequisites

If you're running on Windows or you'd simply like to run the app in a VM, a barebones (and untested) Vagrant setup can be found [here](https://github.com/justinsacbibit/node-vagrant).

##### Running

###### Running API locally

Make sure you're running trucksu-web (the API):

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

###### Connecting to production API

```sh
# Initial setup
$ git clone git@github.com:justinsacbibit/trucksu-frontend.git
$ npm install # when you're not on Windows
$ npm install --no-bin-links # only if you're on Windows

# Connect to the production server, but keep things like Redux logging enabled
$ NODE_ENV=production DEBUG=true npm run dev
```

Now visit [http://localhost:4001](http://localhost:4001) in your browser!

##### Deploying

The frontend is hosted on GitHub pages. Deployment is currently very easy (but could be automated more!)

```sh
# skip the following steps if you've deployed before
$ mkdir -p dist
$ cd dist
$ git init
$ git remote add origin git@github.com:justinsacbibit/trucksu-frontend.git # or use the https url
$ git fetch origin
$ git checkout gh-pages
$ cd ..

# start here if you've deployed before
$ npm run dist
$ cd dist
$ git add .
$ git commit -m 'Update'
$ git push origin gh-pages
```

