/*global require */

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    unirest = require('unirest');

var token = require("./token.json");

var level = require("level");
var options = {
    keyEncoding: 'binary',
    valueEncoding: 'json'
};
var db = level("./database/", options);

var server = app.listen(8080, function () {
    'use strict';
    var host = server.address().address;
    var port = server.address().port;
});

function sendFile(res, filename, contentType) {
    'use strict';
    contentType = contentType || 'text/html';

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {
            'Content-type': contentType
        });
        res.end(content, 'utf-8');
    });
}

app.use('/api', router);

router.route('/:year/events').get(function (req, res) {
    'use strict';
    db.get("eventslist." + req.params.year, function (err, storedRequest) {
        if (err) {
            console.log("No stored events data for " + req.params.year);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    db.put("eventslist." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
                console.log("Sending stored events data for " + req.params.year + ":" + req.params.eventCode);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                console.log("Reading events data for " + req.params.year + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            console.log("Stored events are current. Sending stored events for " + req.params.year);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            console.log("Stored events are stale. Saving result and sending new events for " + req.params.year);
                            db.put("eventslist." + req.params.year, JSON.stringify(response));
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(response.body), 'utf-8');
                        }
                    });
            }
        }
    });
});

router.route('/:year/alliances/:eventCode/').get(function (req, res) {
    'use strict';
    db.get("alliances." + req.params.eventCode + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            console.log("No stored alliances data for " + req.params.year + ":" + req.params.eventCode);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/alliances/' + req.params.eventCode)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    db.put("alliances." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
                console.log("Sending stored alliances data for " + req.params.year + ":" + req.params.eventCode);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                console.log("Reading alliances data for " + req.params.year + ":" + req.params.eventCode + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/alliances/' + req.params.eventCode)
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            console.log("Stored alliances are current. Sending stored alliances for " + req.params.year + ":" + req.params.eventCode);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            console.log("Stored alliances are stale. Saving result and sending new alliances for " + req.params.year + ":" + req.params.eventCode);
                            db.put("alliances." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(response.body), 'utf-8');
                        }
                    });
            }
        }
    });
});

router.route('/:year/schedule/:eventCode/:tlevel').get(function (req, res) {
    'use strict';
    db.get("schedule." + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, function (err, storedRequest) {
        if (err) {
            console.log("No stored schedule data for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/schedule/' + req.params.eventCode + '/' + req.params.tlevel + '/hybrid')
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    db.put("schedule." + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
                console.log("Sending stored schedule data for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                console.log("Reading schedule data for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel + " from FIRST");
                //console.log("stored date: "+JSON.stringify(JSON.parse(storedRequest).headers.date));
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/schedule/' + req.params.eventCode + '/' + req.params.tlevel + '/hybrid')
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            console.log("Stored schedule are current. Sending stored schedule for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            console.log("Stored schedule are stale. Saving result and sending new schedule for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
                            db.put("schedule." + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, JSON.stringify(response));
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(response.body), 'utf-8');
                        }
                    });
            }
        }
    });
});

router.route('/:year/teams/:eventCode/').get(function (req, res) {
    'use strict';
    db.get("teams." + req.params.eventCode + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            console.log("No stored teams data for " + req.params.year + ":" + req.params.eventCode);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?eventcode=' + req.params.eventCode)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    db.put("teams." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
                    console.log(JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
                console.log("Sending stored teams data for " + req.params.year + ":" + req.params.eventCode);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                console.log("Reading teams data for " + req.params.year + ":" + req.params.eventCode + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?eventcode=' + req.params.eventCode)
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            console.log("Stored teams are current. Sending stored teams for " + req.params.year + ":" + req.params.eventCode);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            console.log("Stored teams are stale. Saving result and sending new teams for " + req.params.year + ":" + req.params.eventCode);
                            db.put("teams." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(response.body), 'utf-8');
                        }
                    });
            }
        }
    });
});

router.route('/:year/rankings/:eventCode/').get(function (req, res) {
    'use strict';
    db.get("rankings." + req.params.eventCode + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            console.log("No stored rankings data for " + req.params.year + ":" + req.params.eventCode);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/rankings/' + req.params.eventCode)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    db.put("rankings." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
                console.log("Sending stored rankings data for " + req.params.year + ":" + req.params.eventCode);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                console.log("Reading rankings data for " + req.params.year + ":" + req.params.eventCode + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/rankings/' + req.params.eventCode)
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            console.log("Stored rankings are current. Sending stored rankings for " + req.params.year + ":" + req.params.eventCode);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            console.log("Stored rankings are stale. Saving result and sending new rankings for " + req.params.year + ":" + req.params.eventCode);
                            db.put("rankings." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(response.body), 'utf-8');
                        }
                    });
            }
        }
    });
});

router.route('/:year/awards/:teamNumber/').get(function (req, res) {
    'use strict';
    db.get("awards." + req.params.teamNumber + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            console.log("No stored awards data for " + req.params.year + ":" + req.params.teamNumber);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    db.put("awards." + req.params.teamNumber + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
                console.log("Sending stored awards data for " + req.params.year + ":" + req.params.teamNumber);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                console.log("Reading awards data for " + req.params.year + ":" + req.params.teamNumber + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            console.log("Stored awards are current. Sending stored awards for " + req.params.year + ":" + req.params.teamNumber);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            console.log("Stored awards are stale. Saving result and sending new awards for " + req.params.year + ":" + req.params.teamNumber);
                            db.put("awards." + req.params.teamNumber + "." + req.params.year, JSON.stringify(response));
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(response.body), 'utf-8');
                        }
                    });
            }
        }
    });
});

app.get('/', function (req, res) {
    'use strict';
    sendFile(res, 'index.html', 'text/html');
});

app.get('/scripts.js', function (req, res) {
    'use strict';
    sendFile(res, 'scripts.js', 'text/js');
});

app.get('/jquery.touchwipe.min.js', function (req, res) {
    'use strict';
    sendFile(res, 'jquery.touchwipe.min.js', 'text/js');
});


app.get('/css/:filename', function (req, res) {
    'use strict';
    sendFile(res, './css/' + req.params.filename, 'text/css');
});

app.get('/images/:filename', function (req, res) {
    'use strict';
    sendFile(res, './images/' + req.params.filename);
});

app.get('/js/:filename', function (req, res) {
    'use strict';
    sendFile(res, './js/' + req.params.filename);
});
