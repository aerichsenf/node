var express = require('express');
var app = express();

var postage = require('./postageHandler.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/postage', postage.handlePostage);


app.listen(app.get('port'), function() {
	console.log("Server is running on port: " + app.get('port'));
});

