const express = require('express');

const app = express();

app.listen(4001, () => {
    console.log('User Service listening on port 4001');
});