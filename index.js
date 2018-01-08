var express = require('express');
var app = express();
var os = require('os');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile("index.html")
});

app.get('/hostInfo', function(request, response) {
	var obj = os.networkInterfaces(); 
	response.send(obj);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});


