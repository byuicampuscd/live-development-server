Live Development Server is a local node server that can be used to test local javascript files on an https connection before uploading them to the web.
###Installation
Run the following code in the command line.

```
$ npm i -g https://github.com/byuicampuscd/live-development-server.git
```
This will globally install the live development server. A window will pop up asking you to install the certificate. Just hit install/okay a bunch of times until it's been installed.

Then you'll have to install it locally:
```
$ npm i https://github.com/byuicampuscd/live-development-server.git
```


###Usage
Run the live development server bp entering the following command:
```
$ lds [port number]
```
The port number is an optional parameter, with the defualt being set to 8000.
A HTML script tag will appear on the console with the base URL for referencing the server. Just plug in the file path & you're ready to go!
Stop the server by using the Crtl^c command.