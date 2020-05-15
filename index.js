const express = require('express');
const swaggerStats = require('swagger-stats');
const promBundle = require('express-prom-bundle');
const promBundleMetrics = promBundle({
    includeMethod: true, 
    includePath: true,
    includeUp: true,
    metricsPath: '/prom-bundle/metrics',
    customLabels: { applicaton: 'app-with-metrics' },
});

const port = 3000;
const app = express();
app.use(swaggerStats.getMiddleware( {name: 'app-with-metrics'} ));
app.use(promBundleMetrics);

const links = 
`<ul>
    <li><a href="/good-service">/good-service</a></li>
    <li><a href="/bad-service">/bad-service</a></li>
    <li><a href="/unstable-service">/unstable-service</a></li>
    <li><a href="/slow-service">/slow-service</a></li>
</ul>
<h3>express-prom-bundle</h3>
<ul><li><a href="/prom-bundle/metrics">/prom-bundle/metrics</a></li></ul>
<h3>swagger-stats</h3>
<ul>
    <li><a href="/swagger-stats/metrics">/swagger-stats-metrics</a></li>
    <li><a href="/swagger-stats/ux">/swagger-stats-ux</a></li>
</ul>`;

const replySuccess = (req, res) => res.status(200).send(`OK\n${links}`);
const replyError = (req, res) => res.status(500).send(`Server error\n${links}`);
const replyRandomly = (errorRate) => (req, res) => {
    if (Math.random() <= errorRate)
    return replyError(req, res);
    return replySuccess(req, res);
}
const replyLate = delay => replyHandler => {
    return (req, res) => setTimeout(() => replyHandler(req, res), delay);
};

app.get('/', (req, res) => res.send('app-with-metrics\n' + links));
app.get('/good-service', replySuccess);
app.get('/bad-service', replyError);
app.get('/unstable-service', replyRandomly(0.5));
app.get('/slow-service', replyLate(1000)(replyRandomly(0.3)));

app.listen(port, () => 
    console.log(`App listening at http://localhost:${port}.`));
