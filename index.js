const http = require('http')
const fs = require('fs')
const routes = require('./Routes')
const { writeApp } = require('./App/app')
require('./postcss.config')
require('dotenv').config()

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('origin', '*')

    // let url = req.url.substr(1) + process.env.VIEW_SUFFIX;
    let url = req.url.substr(1);
    if(url === '')
        url = 'home'

    let view = './Views/' + url + process.env.VIEW_SUFFIX;

    if(routes.pages.includes(url) || url === '') {

        await writeApp(res, view)

    } else if(url === 'App/main.css') {
        fs.readFile('./App/main.css', (err, data) => {
            if(err) {
                console.log('css file non existent')
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            })
            res.write(data)
            res.end()
        })
    } else if(url === 'App/bundle.js') {
        fs.readFile('./App/bundle.js', (err, data) => {
            if(err) {
                console.log('css file non existent')
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            })
            res.write(data)
            res.end()
        })
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        await writeApp(res, view.replace(url, '404'))
    }
});

server.listen(9090, async () => {
    await routes.routes()
    console.log('listening on port 9090')
})