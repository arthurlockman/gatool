/*global require */

var secureHTTP = require("./secureHTTP.json");

var http = require('http'),
    https = require('https'),
    compression = require('compression'),
    fs = require('fs'),
    url = require('url'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    unirest = require('unirest'),
    apicache = require('apicache'),
    Promise = require('promise');

var cache = apicache.middleware;

var token = require("./token.json");
var tbatoken = require("./tbatoken.json");
var currentYear = 2018;


//var list = require("./newusers.json");
//var list = [{username:'1265216415@qq.com',password:'GuoyongLovesFIRST!'},{username:'88craver@gmail.com',password:'JeffLovesFIRST!'}];
var list = [];

var bcrypt = require('bcrypt');
var saltRounds = 10;
var salt = "thisistheendoftheworldasweknowit";
var cookie = require('cookie');
var loggedin = "";

var sslOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};

var level = require("level");

var options = {
    keyEncoding: 'binary',
    valueEncoding: 'json'
};

var db = level("./database/", options);
var users = level("./users/", options);
var teamUpdate = level("./teamUpdate/", options);
var teamAwards = level("./teamAwards/", options);
var offseasonEvents = level("./offseasonEvents/", options);
var teamData = level("./teamdata/", options);

var bodyParser = require('body-parser');
app.use(compression());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

if (secureHTTP.secure) {
    https.createServer(sslOptions, app).listen(443, function () {});
} else {

    var server = app.listen(8080, function () {
        'use strict';
        var host = server.address().address;
        var port = server.address().port;
    });
}

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

if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
        injectUser(list[i].username, list[i].password);
    }
}

function injectUser(username, password) {
    "use strict";
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            users.put(username, hash);
        });
    });
}

app.use('/api', router);

router.route('/:year/events').get(cache('1 day'), function (req, res) {
    'use strict';
    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
        .headers({
            'Authorization': token.token
        })
        .end(function (response) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(response.body), 'utf-8');
        });

    //db.get("eventslist." + req.params.year, function (err, storedRequest) {
    //        if (err) {
    //            //console.log("No stored events data for " + req.params.year);
    //            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
    //                .headers({
    //                    'Authorization': token.token
    //                })
    //                .end(function (response) {
    //                    db.put("eventslist." + req.params.year, JSON.stringify(response));
    //                    res.writeHead(200, {
    //                        'Content-type': 'text/html'
    //                    });
    //                    res.end(JSON.stringify(response.body), 'utf-8');
    //                });
    //        } else {
    //            if (req.params.year < currentYear) {
    //                //console.log("Sending stored events data for " + req.params.year + ":" + req.params.eventCode);
    //                res.writeHead(200, {
    //                    'Content-type': 'text/html'
    //                });
    //                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //            } else {
    //                //console.log("Reading events data for " + req.params.year + " from FIRST");
    //                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
    //                    .headers({
    //                        'Authorization': token.token,
    //                        'If-Modified-Since': JSON.parse(storedRequest).headers["date"]
    //                    })
    //                    .end(function (response) {
    //                        if (response.statusCode === 304) {
    //                            //console.log("Stored events are current. Sending stored events for " + req.params.year);
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //                        } else {
    //                            //console.log("Stored events are stale. Saving result and sending new events for " + req.params.year);
    //                            db.put("eventslist." + req.params.year, JSON.stringify(response));
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(response.body), 'utf-8');
    //                        }
    //                    });
    //            }
    //        }
    //    });
});

router.route('/:year/offseasoneventsv2').get(function (req, res) {
    'use strict';
    unirest.get('https://www.thebluealliance.com/api/v2/events/' + req.params.year)
        .headers({
            'X-TBA-App-Id': tbatoken.header,
            'X-TBA-Auth-Key': tbatoken.token
        })
        .end(function (response) {
            var offseasonevents = response.body;
            var result = [];
            var output = {};
            for (var i = 1; i < offseasonevents.length; i++) {
                var address = [];
                if (offseasonevents[i].event_type_string === "Offseason") {
                    if (offseasonevents[i].venue_address === null) {
                        address = ["no venue", "no venue address", "no city, no state, no country"];
                    } else {
                        address = offseasonevents[i].venue_address.split("\n");
                    }
                    if (address.length === 2) {
                        address[2] = offseasonevents[i].location;
                        address[1] = "no address";
                    }
                    var tmp = {
                        "code": offseasonevents[i].key,
                        "divisionCode": offseasonevents[i].event_code,
                        "name": offseasonevents[i].short_name,
                        "type": offseasonevents[i].event_type_string,
                        "districtCode": offseasonevents[i].event_district_string,
                        "venue": address[0],
                        "address": address[1],
                        "city": address[2].split(", ")[0],
                        "stateprov": address[2].split(", ")[1],
                        "country": address[2].split(", ")[2],
                        "website": offseasonevents[i].website,
                        "timezone": offseasonevents[i].timezone,
                        "dateStart": offseasonevents[i].start_date,
                        "dateEnd": offseasonevents[i].end_date
                    };
                    result.push(tmp);
                }
            }
            output.Events = result;
            output.eventCount = result.length;
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(output), 'utf-8');
        });

});

router.route('/:year/offseasonevents').get(function (req, res) {
    'use strict';
    unirest.get('https://www.thebluealliance.com/api/v3/events/' + req.params.year)
        .headers({
            'X-TBA-App-Id': tbatoken.header,
            'X-TBA-Auth-Key': tbatoken.token
        })
        .end(function (response) {
            var offseasonevents = response.body;
            var result = [];
            var output = {};
            for (var i = 1; i < offseasonevents.length; i++) {

                if (offseasonevents[i].event_type_string === "Offseason") {
                    if (offseasonevents[i].address === null) {
                        offseasonevents[i].address = "No venue address reported";
                    }
                    if (offseasonevents[i].location_name === null) {
                        offseasonevents[i].location_name = "No venue name reported";
                    }
                    if (offseasonevents[i].city === null) {
                        offseasonevents[i].city = "No venue city reported";
                    }
                    if (offseasonevents[i].state_prov === null) {
                        offseasonevents[i].state_prov = "No venue state reported";
                    }
                    if (offseasonevents[i].country === null) {
                        offseasonevents[i].country = "No venue country reported";
                    }
                    if (offseasonevents[i].district === null) {
                        offseasonevents[i].district = "No event district reported";
                    }

                    var tmp = {
                        "code": offseasonevents[i].key,
                        "divisionCode": offseasonevents[i].event_code,
                        "name": offseasonevents[i].short_name,
                        "type": offseasonevents[i].event_type_string,
                        "districtCode": offseasonevents[i].district.key,
                        "venue": offseasonevents[i].location_name,
                        "address": offseasonevents[i].address,
                        "city": offseasonevents[i].city,
                        "stateprov": offseasonevents[i].state_prov,
                        "country": offseasonevents[i].country,
                        "website": offseasonevents[i].website,
                        "timezone": offseasonevents[i].timezone,
                        "dateStart": offseasonevents[i].start_date,
                        "dateEnd": offseasonevents[i].end_date
                    };
                    result.push(tmp);
                }
            }
            output.Events = result;
            output.eventCount = result.length;
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(output), 'utf-8');
        });

});

router.route('/putTeamUpdate/:teamNumber/:teamData/').get(function (req, res) {
    'use strict';
    //console.log("writing data for " + req.params.teamNumber);
    teamUpdate.put(req.params.teamNumber, req.params.teamData);
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end("OK", 'utf-8');
});

router.route('/getTeamUpdate/:teamNumber/').get(function (req, res) {
    'use strict';
    teamUpdate.get(req.params.teamNumber, function (err, teamData) {
        if (err) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end('eyJuYW1lU2hvcnRMb2NhbCI6IiIsImNpdHlTdGF0ZUxvY2FsIjoiIiwidG9wU3BvbnNvcnNMb2NhbCI6IiIsInNwb25zb3JzTG9jYWwiOiIiLCJvcmdhbml6YXRpb25Mb2NhbCI6IiIsInJvYm90TmFtZUxvY2FsIjoiIiwiYXdhcmRzTG9jYWwiOiIiLCJ0ZWFtTW90dG9Mb2NhbCI6IiIsInRlYW1Ob3Rlc0xvY2FsIjoiIn0=', 'utf-8');

        } else {
            if (teamData.startsWith('{"name')) {
                //console.log("Bad data found for " + req.params.teamNumber + ": " + teamData);
                teamUpdate.del(req.params.teamNumber);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end('eyJuYW1lU2hvcnRMb2NhbCI6IiIsImNpdHlTdGF0ZUxvY2FsIjoiIiwidG9wU3BvbnNvcnNMb2NhbCI6IiIsInNwb25zb3JzTG9jYWwiOiIiLCJvcmdhbml6YXRpb25Mb2NhbCI6IiIsInJvYm90TmFtZUxvY2FsIjoiIiwiYXdhcmRzTG9jYWwiOiIiLCJ0ZWFtTW90dG9Mb2NhbCI6IiIsInRlYW1Ob3Rlc0xvY2FsIjoiIn0=', 'utf-8');

            } else {
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(teamData, 'utf-8');
            }
        }

    });

});

router.route('/:year/alliances/:eventCode/').get(function (req, res) {
    'use strict';
    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/alliances/' + req.params.eventCode)
        .headers({
            'Authorization': token.token
        })
        .end(function (response) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(response.body), 'utf-8');
        });
    //    db.get("alliances." + req.params.eventCode + "." + req.params.year, function (err, storedRequest) {
    //        if (err) {
    //            //console.log("No stored alliances data for " + req.params.year + ":" + req.params.eventCode);
    //            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/alliances/' + req.params.eventCode)
    //                .headers({
    //                    'Authorization': token.token
    //                })
    //                .end(function (response) {
    //                    db.put("alliances." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
    //                    res.writeHead(200, {
    //                        'Content-type': 'text/html'
    //                    });
    //                    res.end(JSON.stringify(response.body), 'utf-8');
    //                });
    //        } else {
    //            if (req.params.year < currentYear) {
    //                //console.log("Sending stored alliances data for " + req.params.year + ":" + req.params.eventCode);
    //                res.writeHead(200, {
    //                    'Content-type': 'text/html'
    //                });
    //                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //            } else {
    //                //console.log("Reading alliances data for " + req.params.year + ":" + req.params.eventCode + " from FIRST");
    //                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/alliances/' + req.params.eventCode)
    //                    .headers({
    //                        'Authorization': token.token,
    //                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
    //                    })
    //                    .end(function (response) {
    //                        if (response.statusCode === 304) {
    //                            //console.log("Stored alliances are current. Sending stored alliances for " + req.params.year + ":" + req.params.eventCode);
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //                        } else {
    //                            //console.log("Stored alliances are stale. Saving result and sending new alliances for " + req.params.year + ":" + req.params.eventCode);
    //                            db.put("alliances." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(response.body), 'utf-8');
    //                        }
    //                    });
    //            }
    //        }
    //    });
});

router.route('/:year/schedule/:eventCode/:tlevel').get(cache('15 seconds'), function (req, res) {
    'use strict';
    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/schedule/' + req.params.eventCode + '/' + req.params.tlevel + '/hybrid')
        .headers({
            'Authorization': token.token
        })
        .end(function (response) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(response.body), 'utf-8');
        });

    //db.get("schedule." + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, function (err, storedRequest) {
    //        if (err) {
    //            //console.log("No stored schedule data for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
    //            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/schedule/' + req.params.eventCode + '/' + req.params.tlevel + '/hybrid')
    //                .headers({
    //                    'Authorization': token.token
    //                })
    //                .end(function (response) {
    //                    db.put("schedule." + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, JSON.stringify(response));
    //                    res.writeHead(200, {
    //                        'Content-type': 'text/html'
    //                    });
    //                    res.end(JSON.stringify(response.body), 'utf-8');
    //                });
    //        } else {
    //            if (req.params.year < currentYear) {
    //                //console.log("Sending stored schedule data for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
    //                res.writeHead(200, {
    //                    'Content-type': 'text/html'
    //                });
    //                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //            } else {
    //                //console.log("Reading schedule data for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel + " from FIRST");
    //                //console.log("stored date: "+JSON.stringify(JSON.parse(storedRequest).headers.date));
    //                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/schedule/' + req.params.eventCode + '/' + req.params.tlevel + '/hybrid')
    //                    .headers({
    //                        'Authorization': token.token,
    //                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
    //                    })
    //                    .end(function (response) {
    //                        if (response.statusCode === 304) {
    //                            //console.log("Stored schedule are current. Sending stored schedule for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //                        } else {
    //                            //console.log("Stored schedule are stale. Saving result and sending new schedule for " + req.params.year + ":" + req.params.eventCode + ":" + req.params.tlevel);
    //                            db.put("schedule." + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, JSON.stringify(response));
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(response.body), 'utf-8');
    //                        }
    //                    });
    //            }
    //        }
    //    });
});


router.route('/:year/teamdata/:team/').get(cache('12 hours'), function (req, res) {
    'use strict';
    //    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
    //        .headers({
    //            'Authorization': token.token
    //        })
    //        .end(function (response) {
    //            res.writeHead(200, {
    //                'Content-type': 'text/html'
    //            });
    //            res.end(JSON.stringify(response.body), 'utf-8');
    //        });
    teamData.get(req.params.team + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            //console.log("No stored team data for " + req.params.year + ":" + req.params.team);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    //console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {

            //console.log("Reading stored team data for " + req.params.year + ":" + req.params.team + " from FIRST");
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token,
                    'If-Modified-Since': JSON.parse(storedRequest).headers["date"]
                })
                .end(function (response) {
                    //console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    if (response.statusCode === 304) {
                        //console.log("Stored team data are current. Sending  stored team data for " + req.params.year + ":" + req.params.team);
                        res.writeHead(200, {
                            'Content-type': 'text/html'
                        });
                        res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                    } else {
                        //console.log("Stored team data are stale. Saving result and sending new team data for " + req.params.year + ":" + req.params.team);
                        teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
                        res.writeHead(200, {
                            'Content-type': 'text/html'
                        });
                        res.end(JSON.stringify(response.body), 'utf-8');
                    }
                });

        }
    });

});

router.route('/:year/newteamdata/:team/').get(cache('12 hours'), function (req, res) {
    'use strict';
    teamData.get(req.params.team + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            //console.log("No stored team data for " + req.params.year + ":" + req.params.team);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    //console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {

            //console.log("Reading stored team data for " + req.params.year + ":" + req.params.team + " from FIRST");
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token,
                    'If-Modified-Since': JSON.parse(storedRequest).headers["date"]
                })
                .end(function (response) {
                    //console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    if (response.statusCode === 304) {
                        //console.log("Stored team data are current. Sending  stored team data for " + req.params.year + ":" + req.params.team);
                        res.writeHead(200, {
                            'Content-type': 'text/html'
                        });
                        res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                    } else {
                        //console.log("Stored team data are stale. Saving result and sending new team data for " + req.params.year + ":" + req.params.team);
                        teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
                        res.writeHead(200, {
                            'Content-type': 'text/html'
                        });
                        res.end(JSON.stringify(response.body), 'utf-8');
                    }
                });

        }
    });

});



router.route('/:year/registrations/:event/').get(cache('10 minutes'), function (req, res) {
    'use strict';
    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/registrations/?eventCode=' + req.params.event)
        .headers({
            'Authorization': token.token
        })
        .end(function (response) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(response.body), 'utf-8');
        });
});



router.route('/:year/teams/:eventCode/:page').get(cache('120 minutes'), function (req, res) {
    'use strict';
    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?eventcode=' + req.params.eventCode + "&page=" + req.params.page)
        .headers({
            'Authorization': token.token
        })
        .end(function (response) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(response.body), 'utf-8');
        });

    // db.get("teams." + req.params.eventCode + "." + req.params.year, function (err, storedRequest) {
    //        if (err) {
    //            //console.log("No stored teams data for " + req.params.year + ":" + req.params.eventCode);
    //            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?eventcode=' + req.params.eventCode)
    //                .headers({
    //                    'Authorization': token.token
    //                })
    //                .end(function (response) {
    //                    db.put("teams." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
    //                    res.writeHead(200, {
    //                        'Content-type': 'text/html'
    //                    });
    //                    res.end(JSON.stringify(response.body), 'utf-8');
    //                });
    //        } else {
    //            if (req.params.year < currentYear) {
    //                //console.log("Sending stored teams data for " + req.params.year + ":" + req.params.eventCode);
    //                res.writeHead(200, {
    //                    'Content-type': 'text/html'
    //                });
    //                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //            } else {
    //                //console.log("Reading teams data for " + req.params.year + ":" + req.params.eventCode + " from FIRST");
    //                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?eventcode=' + req.params.eventCode)
    //                    .headers({
    //                        'Authorization': token.token,
    //                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
    //                    })
    //                    .end(function (response) {
    //                        if (response.statusCode === 304) {
    //                            //console.log("Stored teams are current. Sending stored teams for " + req.params.year + ":" + req.params.eventCode);
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //                        } else {
    //                            //console.log("Stored teams are stale. Saving result and sending new teams for " + req.params.year + ":" + req.params.eventCode);
    //                            db.put("teams." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(response.body), 'utf-8');
    //                        }
    //                    });
    //            }
    //        }
    //    });
});



router.route('/:year/offseasonteamsv2/:eventCode/:page').get(function (req, res) {
    'use strict';
    unirest.get('https://www.thebluealliance.com/api/v2/event/' + req.params.eventCode + '/teams')
        .headers({
            'X-TBA-App-Id': tbatoken.header
        })
        .end(function (response) {
            var offseasonteams = response.body;
            var result = [];
            var output = {};
            offseasonteams.sort(function (a, b) {
                return parseInt(a.team_number) - parseInt(b.team_number);
            });
            for (var i = 1; i < offseasonteams.length; i++) {
                var tmp = {
                    "teamNumber": offseasonteams[i].team_number,
                    "nameFull": offseasonteams[i].name,
                    "nameShort": offseasonteams[i].nickname,
                    "schoolName": null,
                    "city": offseasonteams[i].locality,
                    "stateProv": offseasonteams[i].region,
                    "country": offseasonteams[i].country_name,
                    "website": offseasonteams[i].website,
                    "rookieYear": offseasonteams[i].rookie_year,
                    "robotName": null,
                    "districtCode": null,
                    "homeCMP": null
                };
                result.push(tmp);

            }
            output.teams = result;
            output.teamCountTotal = result.length;
            output.teamCountPage = result.length;
            output.pageCurrent = 1;
            output.pageTotal = 1;
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(output), 'utf-8');
        });

});

router.route('/:year/offseasonteams/:eventCode/:page').get(function (req, res) {
    'use strict';
    unirest.get('https://www.thebluealliance.com/api/v3/event/' + req.params.eventCode + '/teams')
        .headers({
            'X-TBA-App-Id': tbatoken.header,
            'X-TBA-Auth-Key': tbatoken.token
        })
        .end(function (response) {
            var offseasonteams = response.body;
            var result = [];
            var output = {};
            offseasonteams.sort(function (a, b) {
                return parseInt(a.team_number) - parseInt(b.team_number);
            });
            for (var i = 1; i < offseasonteams.length; i++) {
                var tmp = {
                    "teamNumber": offseasonteams[i].team_number,
                    "nameFull": offseasonteams[i].name,
                    "nameShort": offseasonteams[i].nickname,
                    "schoolName": null,
                    "city": offseasonteams[i].city,
                    "stateProv": offseasonteams[i].state_prov,
                    "country": offseasonteams[i].country,
                    "website": offseasonteams[i].website,
                    "rookieYear": offseasonteams[i].rookie_year,
                    "robotName": null,
                    "districtCode": null,
                    "homeCMP": null
                };
                result.push(tmp);

            }
            output.teams = result;
            output.teamCountTotal = result.length;
            output.teamCountPage = result.length;
            output.pageCurrent = 1;
            output.pageTotal = 1;
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(output), 'utf-8');
        });

});


router.route('/:year/rankings/:eventCode/').get(cache('15 seconds'), function (req, res) {
    'use strict';
    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/rankings/' + req.params.eventCode)
        .headers({
            'Authorization': token.token
        })
        .end(function (response) {
            res.writeHead(200, {
                'Content-type': 'text/html'
            });
            res.end(JSON.stringify(response.body), 'utf-8');
        });

    //  db.get("rankings." + req.params.eventCode + "." + req.params.year, function (err, storedRequest) {
    //        if (err) {
    //            //console.log("No stored rankings data for " + req.params.year + ":" + req.params.eventCode);
    //            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/rankings/' + req.params.eventCode)
    //                .headers({
    //                    'Authorization': token.token
    //                })
    //                .end(function (response) {
    //                    db.put("rankings." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
    //                    res.writeHead(200, {
    //                        'Content-type': 'text/html'
    //                    });
    //                    res.end(JSON.stringify(response.body), 'utf-8');
    //                });
    //        } else {
    //            if (req.params.year < currentYear) {
    //                //console.log("Sending stored rankings data for " + req.params.year + ":" + req.params.eventCode);
    //                res.writeHead(200, {
    //                    'Content-type': 'text/html'
    //                });
    //                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //            } else {
    //                //console.log("Reading rankings data for " + req.params.year + ":" + req.params.eventCode + " from FIRST");
    //                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/rankings/' + req.params.eventCode)
    //                    .headers({
    //                        'Authorization': token.token,
    //                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
    //                    })
    //                    .end(function (response) {
    //                        if (response.statusCode === 304) {
    //                            //console.log("Stored rankings are current. Sending stored rankings for " + req.params.year + ":" + req.params.eventCode);
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
    //                        } else {
    //                            //console.log("Stored rankings are stale. Saving result and sending new rankings for " + req.params.year + ":" + req.params.eventCode);
    //                            db.put("rankings." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
    //                            res.writeHead(200, {
    //                                'Content-type': 'text/html'
    //                            });
    //                            res.end(JSON.stringify(response.body), 'utf-8');
    //                        }
    //                    });
    //            }
    //        }
    //    });
});

router.route('/:year/awards/:teamNumber/').get(cache('1 hours'), function (req, res) {
    'use strict';
    //             unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
    //                .headers({
    //                    'Authorization': token.token
    //                })
    //                .end(function (response) {
    //                    res.writeHead(200, {
    //                        'Content-type': 'text/html'
    //                    });
    //                    res.end(JSON.stringify(response.body), 'utf-8');
    //                });

    teamAwards.get(req.params.teamNumber + ":" + req.params.year, function (err, storedRequest) {
        if (err) {
            //console.log("No stored awards data for " + req.params.year + ":" + req.params.teamNumber);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    if (req.params.year < currentYear) {
                        teamAwards.put(req.params.teamNumber + ":" + req.params.year, JSON.stringify(response));
                    }
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < currentYear) {
                //console.log("Sending stored awards data for " + req.params.year + ":" + req.params.teamNumber);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
            } else {
                //console.log("Reading awards data for " + req.params.year + ":" + req.params.teamNumber + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            //console.log("Stored awards are current. Sending stored awards for " + req.params.year + ":" + req.params.teamNumber);
                            res.writeHead(200, {
                                'Content-type': 'text/html'
                            });
                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                        } else {
                            //console.log("Stored awards are stale. Saving result and sending new awards for " + req.params.year + ":" + req.params.teamNumber);
                            teamAwards.put(req.params.teamNumber + ":" + req.params.year, JSON.stringify(response));
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


router.route('/:year/awardsv2/:teamNumber/').get(function (req, res) {
    'use strict';
    //console.log("awardsv2 start");
    var promises = [];
    var teamNumber = req.params.teamNumber;
    var year = req.params.year,
        year1 = String(Number(year) - 1),
        year2 = String(Number(year) - 2);

    promises.push(new Promise(function (resolve, reject) {
        teamAwards.get(teamNumber + ":" + year, function (err, storedRequest) {
            if (err) {
                //console.log("No stored awards data for " + year + ":" + teamNumber);
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
                    .headers({
                        'Authorization': token.token
                    })
                    .end(function (response) {
                        if (year < currentYear) {
                            teamAwards.put(teamNumber + ":" + year, JSON.stringify(response));
                        }
                        //console.log(year + ": Returning new data from FIRST: " + JSON.stringify(response.body));
                        resolve(response.body);
                    });
            } else {
                if (year < currentYear) {
                    //console.log("Sending stored awards data for " + year + ":" + teamNumber);
                    //console.log(year + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                    resolve(JSON.parse(storedRequest).body);

                } else {
                    //console.log("Reading awards data for " + year + ":" + teamNumber + " from FIRST");
                    unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
                        .headers({
                            'Authorization': token.token,
                            'If-Modified-Since': JSON.parse(storedRequest).headers.date
                        })
                        .end(function (response) {
                            if (response.statusCode === 304) {
                                //console.log("Stored awards are current. Sending stored awards for " + year + ":" + teamNumber);
                                //console.log(year + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                                resolve(JSON.parse(storedRequest).body);
                            } else {
                                //console.log("Stored awards are stale. Saving result and sending new awards for " + year + ":" + teamNumber);
                                //console.log(year + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
                                teamAwards.put(teamNumber + ":" + year, JSON.stringify(response));
                                resolve(response.body);
                            }
                        });
                }
            }
        });

    }));

    promises.push(new Promise(function (resolve, reject) {
        teamAwards.get(teamNumber + ":" + year1, function (err, storedRequest) {
            if (err) {
                //console.log("No stored awards data for " + year + ":" + teamNumber);
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + year1 + '/awards/' + teamNumber)
                    .headers({
                        'Authorization': token.token
                    })
                    .end(function (response) {
                        if (year1 < currentYear) {
                            teamAwards.put(teamNumber + ":" + year1, JSON.stringify(response));
                            //console.log(year1 + ": Returning new data from FIRST: " + JSON.stringify(response.body));
                            resolve(response.body);
                        }
                    });
            } else {
                if (year1 < currentYear) {
                    //console.log("Sending stored awards data for " + year + ":" + teamNumber);
                    //console.log(year1 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                    resolve(JSON.parse(storedRequest).body);

                } else {
                    //console.log("Reading awards data for " + year + ":" + teamNumber + " from FIRST");
                    unirest.get('https://frc-api.firstinspires.org/v2.0/' + year1 + '/awards/' + teamNumber)
                        .headers({
                            'Authorization': token.token,
                            'If-Modified-Since': JSON.parse(storedRequest).headers.date
                        })
                        .end(function (response) {
                            if (response.statusCode === 304) {
                                //console.log("Stored awards are current. Sending stored awards for " + year + ":" + teamNumber);
                                //console.log(year1 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                                resolve(JSON.parse(storedRequest).body);
                            } else {
                                //console.log("Stored awards are stale. Saving result and sending new awards for " + year + ":" + teamNumber);
                                //console.log(year1 + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
                                teamAwards.put(teamNumber + ":" + year1, JSON.stringify(response));
                                resolve(response.body);
                            }
                        });
                }
            }
        });

    }));

    promises.push(new Promise(function (resolve, reject) {
        teamAwards.get(teamNumber + ":" + year2, function (err, storedRequest) {
            if (err) {
                //console.log("No stored awards data for " + year2 + ":" + teamNumber);
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + year2 + '/awards/' + teamNumber)
                    .headers({
                        'Authorization': token.token
                    })
                    .end(function (response) {
                        if (year2 < currentYear) {
                            teamAwards.put(teamNumber + ":" + year2, JSON.stringify(response));
                            //console.log(year2 + ": Returning new data from FIRST: " + JSON.stringify(response.body));
                            resolve(response.body);
                        }
                    });
            } else {
                if (year2 < currentYear) {
                    //console.log("Sending stored awards data for " + year2 + ":" + teamNumber);
                    //console.log(year2 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                    resolve(JSON.parse(storedRequest).body);

                } else {
                    //console.log("Reading awards data for " + year2 + ":" + teamNumber + " from FIRST");
                    unirest.get('https://frc-api.firstinspires.org/v2.0/' + year2 + '/awards/' + teamNumber)
                        .headers({
                            'Authorization': token.token,
                            'If-Modified-Since': JSON.parse(storedRequest).headers.date
                        })
                        .end(function (response) {
                            if (response.statusCode === 304) {
                                //console.log("Stored awards are current. Sending stored awards for " + year2 + ":" + teamNumber);
                                //console.log(year2 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                                resolve(JSON.parse(storedRequest).body);
                            } else {
                                //console.log("Stored awards are stale. Saving result and sending new awards for " + year2 + ":" + teamNumber);
                                //console.log(year2 + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
                                teamAwards.put(teamNumber + ":" + year2, JSON.stringify(response));
                                resolve(response.body);
                            }
                        });
                }
            }
        });

    }));

    //console.log("sending Promises");
    Promise.all(promises).then(function (values) {
        //console.log("promise values: " + JSON.stringify(values));
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(JSON.stringify(values), 'utf-8');
        //console.log("done");
    });


});

function getAwards(teamNumber, year) {
    "use strict";
    teamAwards.get(teamNumber + ":" + year, function (err, storedRequest) {
        if (err) {
            //console.log("No stored awards data for " + year + ":" + teamNumber);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                    if (year < currentYear) {
                        teamAwards.put(teamNumber + ":" + year, JSON.stringify(response));
                        //console.log(year + ": Returning new data from FIRST: " + JSON.stringify(response.body));
                        return response.body;
                    }
                });
        } else {
            if (year < currentYear) {
                //console.log("Sending stored awards data for " + year + ":" + teamNumber);
                //console.log(year + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                return JSON.parse(storedRequest).body;

            } else {
                //console.log("Reading awards data for " + year + ":" + teamNumber + " from FIRST");
                unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
                    .headers({
                        'Authorization': token.token,
                        'If-Modified-Since': JSON.parse(storedRequest).headers.date
                    })
                    .end(function (response) {
                        if (response.statusCode === 304) {
                            //console.log("Stored awards are current. Sending stored awards for " + year + ":" + teamNumber);
                            //console.log(year + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
                            return JSON.parse(storedRequest).body;
                        } else {
                            //console.log("Stored awards are stale. Saving result and sending new awards for " + year + ":" + teamNumber);
                            //console.log(year + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
                            teamAwards.put(teamNumber + ":" + year, JSON.stringify(response));
                            return response.body;
                        }
                    });
            }
        }
    });

}

app.get('/', function (req, res) {
    'use strict';
    // Parse the cookies on the request
    var cookieRaw = (req.headers.cookie || "");
    var cookies = cookie.parse(cookieRaw);
    // Get the visitor name set in the cookie 
    loggedin = (cookies.loggedin || "");
    if (loggedin !== "") {
        sendFile(res, 'index.html', 'text/html');
        return;
    } else {
        sendFile(res, 'login.html', 'text/html');
        return;
    }
});


app.post('/login', function (req, res) {
    "use strict";
    var password = req.body.password;
    var username = req.body.username;
    var haveUser = false;
    var havePW = false;

    users.get(username, function (err, storedPW) {
        if (err) {
            haveUser = false;
            havePW = false;
            sendFile(res, 'login.html', 'text/html');
            return;
        } else {
            haveUser = true;

            bcrypt.compare(password, storedPW, function (err, result) {
                if (err) {
                    throw err;
                }

                if (result) {
                    havePW = true;
                    res.setHeader('Set-Cookie', cookie.serialize('loggedin', String(username), {
                        maxAge: 60 * 60 * 24 * 7 // 1 week 
                    }));
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                    return;
                } else {
                    havePW = false;
                    sendFile(res, 'login.html', 'text/html');
                    return;
                }

            });

        }

    });
});

app.get('/login', function (req, res) {
    'use strict';
    sendFile(res, 'login.html', 'text/html');
});

app.get('/help', function (req, res) {
    'use strict';
    sendFile(res, 'help.html', 'text/html');
});

app.get('/logout', function (req, res) {
    'use strict';
    res.clearCookie('loggedin');
    sendFile(res, 'login.html', 'text/html');
});

app.get('/favicon.ico', function (req, res) {
    'use strict';
    sendFile(res, 'favicon.ico');
});

app.get('/scripts.js', cache('24 hours'), function (req, res) {
    'use strict';
    sendFile(res, 'scripts.js', 'text/js');
});

app.get('/css/:filename', cache('24 hours'), function (req, res) {
    'use strict';
    sendFile(res, './css/' + req.params.filename, 'text/css');
});

app.get('/images/:filename', cache('24 hours'), function (req, res) {
    'use strict';
    sendFile(res, './images/' + req.params.filename);
});

app.get('/js/:filename', cache('24 hours'), function (req, res) {
    'use strict';
    sendFile(res, './js/' + req.params.filename);
});

app.get('/fonts/:filename', cache('24 hours'), function (req, res) {
    'use strict';
    sendFile(res, './fonts/' + req.params.filename);
});
