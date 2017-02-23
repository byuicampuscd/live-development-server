#!/usr/bin/env node


var fs = require("fs"),
    https = require("https"),
    url = require("url"),
    chalk = require('chalk'),
    port = getPort();


function getPort() {
    if (process.argv[2] == undefined)
        return 8000;
    else
        return process.argv[2];
}

function getScript(port) {
    var url = 'https://localhost:' + port + '/path-2-file';
    return '<script src="' + url + '"></script>';
}

function processRequest(req, res) {
    var request = url.parse(req.url).pathname;
    var reader = fs.createReadStream("." + request);
    reader.pipe(res);
    console.log(request);
    reader.on("error", function () {
        res.writeHead(404);
        res.write("404:\nThe page you are looking for does not exist...\nSO GET LOST!\neven though you already are...");
        res.end();
    });
}

var options = {
    key: fs.readFileSync(__dirname + "/keys/server.key"), // __dirname to find directory
    cert: fs.readFileSync(__dirname + "/keys/server.crt")
}

https.createServer(options, processRequest).listen(port) // port dynamic
console.log(chalk.blue("Server is active on port " + port));
console.log(chalk.green(getScript(port))); // also diaplay the script tag with data...
