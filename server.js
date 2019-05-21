const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const page = fs.createReadStream('./recall-distribution.html');
    page.pipe(res);
});

server.listen(3000, () => {
    console.log('Server is up!');
});
