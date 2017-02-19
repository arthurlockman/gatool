var express = require('express');
var app = express();

app.get('*', function (req, res) {
    res.redirect('https://gatool.jameslockman.com'+req.url)
});

app.listen(80, function () {
    console.log('Redirection server listening on 80')
});