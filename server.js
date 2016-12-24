var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , express = require('express')
  , app  = express()
  , router = express.Router()

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Server listening at http://%s:%s', host, port)
})

app.use('/api', router)

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end('Hello!', 'utf-8')
})