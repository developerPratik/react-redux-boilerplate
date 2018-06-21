var express = require('express'), fs = require('fs');
var app = express();


app.use('/assets', express.static(__dirname + '/dist/assets'));

if (!fs.existsSync(__dirname + '/dist/index.html')) {

    console.log('Please run "npm run build" first for the production build');
    process.exit();
}

app.get('*', function (request, response) {
    
    response.sendFile(__dirname + '/dist/index.html');
});

app.listen(8000, function () {

    console.log('Production build running at http://localhost:8000/')
});

