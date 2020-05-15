const express = require('express');
const swStats = require('swagger-stats');

const port = 3000;
const app = express();
app.use(swStats.getMiddleware( {name: 'swagger-stats-sandbox'} ));

const links = 
            `<ul>
                <li><a href="/good-service-1">/good-service-1</a></li>
                <li><a href="/good-service-2">/good-service-2</a></li>
                <li><a href="/bad-service">/bad-service</a></li>
                <li><a href="/unstable-service">/unstable-service</a></li>
            </ul>`;

const replySuccess = (req, res) => res.status(200).send(`OK\n${links}`);
const replyError = (req, res) => res.status(500).send(`Server error\n${links}`);
const replyRandomly = (errorRate) => (req, res) => {
    if (Math.random() <= errorRate)
        return replyError(req, res);
    return replySuccess(req, res);
}

app.get('/', (req, res) => res.send('Hello world\n' + links));
app.get('/good-service-1', replySuccess);
app.get('/good-service-2', replySuccess);
app.get('/bad-service', replyError);
app.get('/unstable-service', replyRandomly(0.5));
app.get('/unknown-service', (req, res) => res.status(404).send('Unknown service not found'));

app.listen(port, () => 
console.log(`App listening at http://localhost:${port}.\nStats at http://localhost:${port}/swagger-stats/ux`));
