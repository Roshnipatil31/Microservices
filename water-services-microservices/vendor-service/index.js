const express = require('express');

const app = express();

app.listen(4002, () => {
    console.log('User Service listening on port 4002');
});