swagger-stats-demo
-------------

Simple app for demonstrating swagger-stats on an express application. 
Has endpoints for various http status codes, see index.js for details. 

## Run
First, run `npm install`.
Then run `node index.js` to start the app. 

The app should run on localhost:3000. Visit the different endpoints, i.e.
- http://localhost:3000/good-service-1
- http://localhost:3000/good-service-2
- http://localhost:3000/bad-service
- http://localhost:3000/unknown-service 
to generate stats.

Visit http://localhost:3000/swagger-stats/ux to view stats.


![Dashboard screenshot](/screenshot.png?raw=true "Dashboard screenshot")