app-with-metrics
-------------

App for demonstrating swagger-stats and express-prom-bundle on an express application. 
Has endpoints for various http status codes, see index.js for details. 

### swagger-stats
Metrics: http://localhost:3000/swagger-stats/metrics
UI: http://localhost:3000/swagger-stats/ux

### prom-bundle
Metrics: http://localhost:3000/prom-bundle/metrics

## Run
First, run `npm install`.
Then run `node index.js` to start the app. 

The app should run on localhost:3000. Visit the different endpoints, i.e.
- http://localhost:3000/good-service
- http://localhost:3000/bad-service
- http://localhost:3000/unstable-service
- http://localhost:3000/slow-service
- http://localhost:3000/unknown-service 
to generate stats.

![Dashboard screenshot](/screenshot.png?raw=true "Dashboard screenshot")