const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url.endsWith('.js')) {
        res.writeHead(200, { 'Content-type': 'text/javascript' });
    } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
    }

    let file = '.' + req.url;

    if (req.url.startsWith('/recall-distribution')) {
        file = './recall-distribution.html';
    }

    const page = fs.createReadStream(file);
    page.pipe(res);
});

server.listen(3000, () => {
    console.log('Server is up!');
});
