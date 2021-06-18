const fs = require('fs')
let pages = []

const routes = () => {
    return new Promise((resolve) => {
        fs.readdir('./Views', (err, files) => {
            if (err) {
                console.log('an error occurred')
                return;
            }

            for(let file in files) {
                let temp = files[file].split('.')
                pages.push(temp[0])
            }

            resolve('resolved')
        })
    })
}

module.exports = {
    pages,
    routes
}