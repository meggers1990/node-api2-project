// require your server and launch it here
const express = require('express');
const cors = require('cors');
const server = require('./api/server');

const port = process.env.PORT || 4000;
server.use(cors());

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});