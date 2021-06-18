const http = require('http')
const fs = require('fs')
const routes = require('./Routes')
require('dotenv').config()

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('origin', '*')

    let url = req.url.substr(1) + process.env.VIEW_SUFFIX;

    await fs.readFile('./Views/' + url, (err, data) => {
        if(err) {
            res.writeHead(404);
            return res.end('404 not found...')
        }

        res.write(data)
        res.end()
    })
});

server.listen(9090, async () => {
    await routes.routes()
    console.log('listening on port 9090')
})