const { createServer } = require('http');

const fs = require('fs')
const path = require('path')

const hostname = '127.0.0.1';
const port = 3001;

// help from chat gpt + class to figure out how to link other files
const server = createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Determine Content-Type with if statements
    let contentType;
    if (filePath.endsWith('.css')) {
        contentType = 'text/css';
    } 
    else if (filePath.endsWith('.js')) {
        contentType = 'application/javascript';
    }  
    else if (filePath.endsWith('.html')) {
        contentType = 'text/html';
    }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('File not found')
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data)
  });
});

server.listen(port, hostname, () => {
    console.log('Server is listening to port: ', port );
});