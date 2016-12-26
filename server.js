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
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end('Welcome to FRC events!', 'utf-8')
})