const express = require('express');

const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Hello world'));
app.get('/good-service-1', (req, res) => res.send('Successful response from good service'));
app.get('/good-service-2', (req, res) => res.send('Successful response from good service 2'));
app.get('/bad-service', (req, res) => res.status(500).send('Error on bad service'));
app.get('/unknown-service', (req, res) => res.status(404).send('Unknown service not found'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
