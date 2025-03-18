const express = require('express');
const expressProxy = require('express-http-proxy');
const cors = require('cors');



const app = express();
app.use(cors());

app.use('/users', expressProxy('http://localhost:4001'));
app.use('/vendors', expressProxy('http://localhost:4002'));
app.use('/admin', expressProxy('http://localhost:4003'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`)
});
