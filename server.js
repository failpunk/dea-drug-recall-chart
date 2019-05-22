const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    setMimeType(req, res);

    let file = '.' + req.url;

    // Our chart route.
    if (req.url.startsWith('/recall-distribution')) {
        file = './recall-distribution.html';
    }

    // Render our asset.
    const page = fs.createReadStream(file);
    page.pipe(res);
});

/**
 * Set Mime style of response
 */
function setMimeType(req, res) {
    console.log('req.url', req.url);

    if (req.url.endsWith('.js')) {
        res.writeHead(200, { 'Content-type': 'text/javascript' });
    } else if (req.url.endsWith('.css')) {
        res.writeHead(200, { 'Content-type': 'text/css' });
    } else if (req.url.endsWith('.jpg')) {
        res.writeHead(200, { 'Content-type': 'image/jpeg' });
    } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
    }
}

server.listen(3000, () => {
    console.log('Server is up!');
});
