var http    = require('http')
  , fs      = require('fs')
  , url     = require('url')
  , express = require('express')
  , app     = express()
  , router  = express.Router()
  , unirest = require('unirest')

var token = require("./token.json")

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Server listening at http://%s:%s', host, port)
})

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })
}

app.use('/api', router)

router.route('/:year/events').get(function(req, res) {
    unirest.get('https://frc-api.firstinspires.org/v2.0/'+req.params.year+'/events')
        .headers({'Authorization': token.token})
        .end(function (response) {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(JSON.stringify(response.body), 'utf-8')         
    })
})

app.get('/', function(req, res) {
    sendFile(res, 'index.html', 'text/html')
})

app.get('/scripts.js', function(req, res) {
    sendFile(res, 'scripts.js', 'text/js')
})

app.get('/css/style.css', function(req, res) {
    sendFile(res, 'style.css', 'text/css')
})