const express = require('express');
const expressProxy = require('express-http-proxy');


const app = express();

app.use('/users', expressProxy('http://localhost:4001'));
app.use('/vendors', expressProxy('http://localhost:4002'));

app.listen(4000, () => {
    console.log('API Gateway listening on port 4000');
});
