const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader('Content-Type', 'text/html');

    //routing
    let path = './views/';

    switch(req.url) {
        case '/':
          path += 'index.html';
          res.statusCode = 200;
          break;
        case '/about':
          path += 'about.html';
          res.statusCode = 200;
          break;
        case '/about-us':
          res.statusCode = 301;
          res.setHeader('Location', '/about');
          res.end();
          break;
        default:
          path += '404.html';
          res.statusCode = 404;
      }
    
      // send html
      fs.readFile(path, (err, data) => {
        if (err) {
          console.log(err);
          res.end();
        }
        //res.write(data);
        res.end(data);
      });
});

server.listen(8080, 'localhost', () => {
    console.log('Listening');
});