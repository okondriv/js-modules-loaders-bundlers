Browserify:

$ npm install -g browserify
$ browserify main.js -o bundle.js


Webpack:

$ npm install -D webpack webpack-dev-server
$ npm start


Rollup:

$ npm install -g rollup
$ rollup main.js -o bundle.js -f es
$ rollup -c


Grunt:

$ npm install -g grunt-cli 
$ npm install
 $ grunt


JSPM:

$ jspm init
$ jspm bundle app/main.js bundle.js
$ ruby -run -e httpd . -p 8080
