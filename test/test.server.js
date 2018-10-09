const http = require('http');
const fs = require('fs');

/* Small server */
http.createServer((req, res) => {
    /* Get the request */
    var mime, fname, search = req.url.match(new RegExp('^/([\\w%&?!._/-]*)$'));
    if(search != null) { fname = search[1]; } else { fname = ''; }
    if(!fname.length) { fname = 'index.html'; }
    if(fname.match(/^source\/([\w%&?!._/-]+)$/) != null) { fname = '../'+fname; }
    /* Show the file */
    if(fs.existsSync(fname)) {
        mime = { js: 'text/javascript', html: 'text/html', css: 'text/css' };
        res.writeHead(200, {'Content-Type': mime[fname.split('.').pop(-1)]||'text/event-stream' });
        res.write(fs.readFileSync(fname, 'utf8'));
    }
    res.end();
}).on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
}).listen(3420, () => { console.log('Server started on 127.0.0.1:3420.'); });
