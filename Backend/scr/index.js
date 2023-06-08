const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const protocol = process.env.PROTOCOL || "http";
const ip = require('ip').address();
const port = process.env.PORT || 3030;

const routes = require('./routes');
app.use(routes);

app.listen(port , () => console.log(`
    server started in http://localhost:${port} or ${protocol}://${ip}:${port}
`))