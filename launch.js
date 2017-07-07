#!/usr/bin/env node


var fs = require("fs"),
    path = require("path"),
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
    var request = url.parse(req.url).pathname,
        fileData = path.parse(request);
    
    var reader = fs.createReadStream("." + request);
    reader.pipe(res);
    console.log(request);
    reader.on("error", function () {
        
        function realError(){
            res.writeHead(404);
            res.write("404:\nThe page you are looking for does not exist.");
            res.end();  
        }
        
        //check if the file was js and if an html file with the same name exsits
        if(fileData.ext === ".js"){
            var htmlFileName = path.join('.', fileData.dir, fileData.name + '.html');
            console.log('Checking for:', htmlFileName);
            fs.readFile(htmlFileName, 'utf8', function(err, data){
                if(err){
                    realError();
                    return;
                }
                var encoded = encodeURIComponent(data),
                
                //make string
                fileOut = `var ${fileData.name}Text = '${encoded}';\n\n`;
                
                //make div and set values
                fileOut += `var ${fileData.name}Div = document.createElement('div');\n`;
                fileOut += `${fileData.name}Div.setAttribute('id','${fileData.name}')\n`;
                fileOut += `${fileData.name}Div.innerHTML = decodeURIComponent(${fileData.name}Text)\n`;
                
                //put it in body
                fileOut += `document.body.appendChild(${fileData.name}Div)`;
                
                //send it back
                res.end(fileOut);
                console.log("sent:", htmlFileName);
            });
            
        } else {
            realError();
        }
        
    });
}

var options = {
    key: fs.readFileSync(__dirname + "/keys/server.key"), // __dirname to find directory
    cert: fs.readFileSync(__dirname + "/keys/server.crt")
}

https.createServer(options, processRequest).listen(port) // port dynamic
console.log(chalk.blue("Server is active on port " + port));
console.log(chalk.green(getScript(port))); // also diaplay the script tag with data...
