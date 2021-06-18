const fs = require('fs')
const index = './App/index.html';

async function writeApp(res, view) {
    res.write(await readMainIndex(res, view));
    res.end();
}

function readMainIndex(res, view) {
    return new Promise((resolve) => {
        fs.readFile(view, (err, viewData) => {
            if (err) {
                console.log('error occurred')
                return;
            }

            fs.readFile(index, (err, indexData) => {
                let mainDiv = indexData.toString();
                mainDiv = mainDiv.replace('<!-- pageData -->', viewData.toString())

                while(mainDiv.includes('template'))
                    mainDiv = mainDiv.replace('template', 'div')

                resolve(mainDiv)
            })
        })
    })
}

module.exports = {
    writeApp
}