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
	Promise = require('promise'),
	cors = require('cors'),
	winston = require('winston'),
	base64ToImage = require('base64-to-image');
require('winston-daily-rotate-file');

var logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log` 
		// - Write all logs error (and below) to `error.log`.
		//
		new winston.transports.DailyRotateFile({
			filename: 'error-%DATE%.log',
			level: 'error',
			datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d'
		}),
		new winston.transports.DailyRotateFile({
			filename: 'info-%DATE%.log',
			level: 'info',
			datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d'
		}),
		new winston.transports.DailyRotateFile({
			filename: 'combined-%DATE%.log',
			datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d'
		})
	]
});

var cache = apicache.middleware;

var token = require("./token.json");
var tbatoken = require("./tbatoken.json");
var currentYear = 2018;
var schedule = {};
var highscore = {};
var highscoreOffsetting = {};
var highscorePenaltyFree = {};


var list = require("./newusers.json");
//var list = [{username:'dirtvoice@hotmail.com', password:'ScottLovesFIRST!'}];
//var list = [];

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
var seasonHighScore = level("./seasonHighScore/", {
	valueEncoding: 'json'
});
var seasonPenaltyFree = level("./seasonPenaltyFree/", {
	valueEncoding: 'json'
});
var seasonOffsetting = level("./seasonOffsetting/", {
	valueEncoding: 'json'
});
var events = level("./events/", {
	valueEncoding: 'json'
});

var environment = level("./environment/", {
	valueEncoding: 'json'
});

function initializeHighScores(year) {
	"use strict";
	seasonHighScore.get(String(year), function (err, storedRequest) {
		if (err) {
			highscore[String(year)] = {};
		} else {
			highscore[String(year)] = JSON.parse(storedRequest);
		}
	});

	seasonPenaltyFree.get(String(year), function (err, storedRequest) {
		if (err) {
			highscorePenaltyFree[String(year)] = {};
		} else {
			highscorePenaltyFree[String(year)] = JSON.parse(storedRequest);
		}
	});
	seasonOffsetting.get(String(year), function (err, storedRequest) {
		if (err) {
			highscoreOffsetting[String(year)] = {};
		} else {
			highscoreOffsetting[String(year)] = JSON.parse(storedRequest);
		}
	});

}

var bodyParser = require('body-parser');
initializeHighScores(2018);
app.use(cors()); //enable cors for mobile and desktop apps
app.use(compression());
app.use(bodyParser.json({
	limit: '15mb'
})); // support json encoded bodies
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

function safeParseJson(responseBody) {
	"use strict";
	var _res = responseBody;
	logger.info({
		"message": "safeParseJSON",
		"payload": _res,
		"payload type": typeof responseBody
	});
	try {
		if (typeof responseBody !== "object") {
			_res = JSON.parse(_res);
		}
	} catch (err) {
		logger.error({
			"message": "safeParseJason error",
			"error": err,
			"payload": _res
		});
		if (typeof _res !== "undefined") {
			_res = JSON.parse(_res.substr(1));
		}
	}
	return _res;
}

app.use('/api', router);

router.route('/:year/events').get(function (req, res) {
	'use strict';
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
		.headers({
			'Authorization': token.token
		})
		.end(function (response) {
			res.json(safeParseJson(response.body));
			events.put("eventslist." + req.params.year, JSON.stringify(response));
		});

	//events.get("eventslist." + req.params.year, function (err, storedRequest) {
	//        if (err) {
	//            logger.info("No stored events data for " + req.params.year);
	//            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
	//                .headers({
	//                    'Authorization': token.token
	//                })
	//                .end(function (response) {
	//                    events.put("eventslist." + req.params.year, JSON.stringify(response));
	//                    res.json(safeParseJson(response.body));
	//                });
	//        } else {
	//            if (req.params.year < currentYear) {
	//                logger.info("Sending stored events data for " + req.params.year + ":" + req.params.eventCode);
	//                res.json(safeParseJson(JSON.parse(storedRequest).body));
	//            } else {
	//                logger.info("Reading events data for " + req.params.year + " from FIRST");
	//                unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/events')
	//                    .headers({
	//                        'Authorization': token.token,
	//                        'If-Modified-Since': JSON.parse(storedRequest).headers['date']
	//                    })
	//                    .end(function (response) {
	//                        logger.info(response);
	//                        if (response.statusCode === 304) {
	//                            logger.info("Stored events are current. Sending stored events for " + req.params.year);
	//                            res.json(safeParseJson(JSON.parse(storedRequest).body));
	//                        } else {
	//                            logger.info("Stored events are stale. Saving result and sending new events for " + req.params.year);
	//                            events.put("eventslist." + req.params.year, JSON.stringify(response));
	//                            res.json(safeParseJson(response.body));
	//                        }
	//                    });
	//            }
	//        }
	//    });
});

router.route('/:year/highscore').get(function (req, res) {
	'use strict';
	var scoreList = {};
	var score = {};
	scoreList.scores = [];

	scoreList.highQuals = {
		'score': 0
	};
	scoreList.highPlayoff = {
		'score': 0
	};
	scoreList.highQualsPenaltyFree = {
		'score': 0
	};

	scoreList.highPlayoffPenaltyFree = {
		'score': 0
	};

	scoreList.highQualsPenaltyFreeOffsetting = {
		'score': 0
	};
	scoreList.highPlayoffPenaltyFreeOffsetting = {
		'score': 0
	};

	if (req.params.year >= 2018) {
		//check for overall high score
		var highScoreKeys = Object.keys(highscore[String(req.params.year)]);
		for (i = 0; i < highScoreKeys.length; i++) {
			score = highscore[String(req.params.year)][highScoreKeys[i]];

			if (score.details.tournamentLevel === "Playoff") {
				if (score.score > scoreList.highPlayoff.score) {
					scoreList.highPlayoff = score;
				}
				score.highScoreType = "highPlayoff";
			}
			if (score.details.tournamentLevel === "Qualification") {
				if (score.score > scoreList.highQuals.score) {
					scoreList.highQuals = score;
				}
				score.highScoreType = "highQuals";
			}

			scoreList.scores.push(score);
		}
		//check for penalty free matches
		var penaltyKeys = Object.keys(highscorePenaltyFree[String(req.params.year)]);
		for (i = 0; i < penaltyKeys.length; i++) {
			score = highscorePenaltyFree[String(req.params.year)][penaltyKeys[i]];

			if (score.details.tournamentLevel === "Playoff") {
				if (score.score > scoreList.highPlayoffPenaltyFree.score) {
					scoreList.highPlayoffPenaltyFree = score;
				}
				score.highScoreType = "highPlayoffPenaltyFree";
			}
			if (score.details.tournamentLevel === "Qualification") {
				if (score.score > scoreList.highQualsPenaltyFree.score) {
					scoreList.highQualsPenaltyFree = score;
				}
				score.highScoreType = "highQualsPenaltyFree";
			}
			scoreList.scores.push(score);
		}

		//check for offsetting penalties
		var offsettingKeys = Object.keys(highscoreOffsetting[String(req.params.year)]);
		for (i = 0; i < offsettingKeys.length; i++) {
			score = highscoreOffsetting[String(req.params.year)][offsettingKeys[i]];
			if (score.details.tournamentLevel === "Playoff") {
				if (score.score > scoreList.highPlayoffPenaltyFreeOffsetting.score) {
					scoreList.highPlayoffPenaltyFreeOffsetting = score;
				}
				score.highScoreType = "highPlayoffPenaltyFreeOffsetting";
			}
			if (score.details.tournamentLevel === "Qualification") {
				if (score.score > scoreList.highQualsPenaltyFreeOffsetting.score) {
					scoreList.highQualsPenaltyFreeOffsetting = score;
				}
				score.highScoreType = "highQualsPenaltyFreeOffsetting";
			}
			scoreList.scores.push(score);
		}
	}
	res.json(scoreList);

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
				'Content-type': 'application/json'
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
				'Content-type': 'application/json'
			});
			res.end(JSON.stringify(output), 'utf-8');
		});

});

router.route('/:year/scores/:eventCode/:tlevel/:start/:end').get(function (req, res) {
	'use strict';
	var matchRange = "";
	if (req.params.start === req.params.end) {
		matchRange = "?matchNumber=" + req.params.start;
	} else {
		matchRange = "?start=" + req.params.start + "&end=" + req.params.end;
	}
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/scores/' + req.params.eventCode + '/' + req.params.tlevel + matchRange)
		.headers({
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			logger.info({
				"scoresResponse": response
			});
			res.json(safeParseJson(response.body));
		});
});

router.route('/:year/avatars/:eventCode/').get(cache('1 day'), function (req, res) {
	'use strict';
	var promises = [],
		avatars = {},
		year = req.params.year,
		eventCode = req.params.eventCode;
	//get the first page of results
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/avatars?eventCode=' + req.params.eventCode)
		.headers({
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			if (response.body !== "Invalid Season Requested : No applicable data for specified season") {
				var avatarsResponse = safeParseJson(response.body);
				try {
					if (avatarsResponse.pageCurrent === avatarsResponse.pageTotal) {
						for (var j = 0; j < avatarsResponse.teams.length; j++) {
							if (avatarsResponse.teams[j].encodedAvatar !== null) {
								var path = './avatars/';
								var optionalObj = {
									'fileName': 'avatar.' + avatarsResponse.teams[j].teamNumber + ".png",
									'type': 'png'
								};

								base64ToImage("data:image/png;base64," + avatarsResponse.teams[j].encodedAvatar, path, optionalObj);
								avatarsResponse.teams[j].encodedAvatar = 'avatars/avatar.' + avatarsResponse.teams[j].teamNumber + ".png";

							}
						}
						res.json(avatarsResponse);
					} else {
						avatars = avatarsResponse;
						for (var i = 2; i <= avatarsResponse.pageTotal; i++) {
							promises.push(new Promise(function (resolve, reject) {
								unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/avatars?eventCode=' + eventCode + "&page=" + i)
									.headers({
										'Authorization': token.token,
										'Accept': 'application/json'
									})
									.end(function (response) {
										resolve(safeParseJson(response.body));

									});


							}));

						}
						//send all of the requests for the remaining pages
						Promise.all(promises).then(function (values) {
							var avatarsList = avatars.teams;
							for (var i = 0; i < values.length; i++) {
								avatarsList = avatarsList.concat(values[i].teams);
							}
							avatars.teams = avatarsList;
							for (i = 0; i < avatars.teams.length; i++) {
								if (avatars.teams[i].encodedAvatar !== null) {
									var path = './avatars/';
									var optionalObj = {
										'fileName': 'avatar.' + avatars.teams[i].teamNumber + ".png",
										'type': 'png'
									};

									base64ToImage("data:image/png;base64," + avatars.teams[i].encodedAvatar, path, optionalObj);
									avatars.teams[i].encodedAvatar = 'avatars/avatar.' + avatars.teams[i].teamNumber + ".png";

								}
							}

							res.json(avatars);

						});
					}
				} catch (err) {
					logger.error(err);
					res.json({
						"teams": []
					});

				}

			} else {
				res.writeHead(200, {
					'Content-type': 'application/json'
				});
				res.end('{"teams":[],"teamCountTotal":0,"teamCountPage":0,"pageCurrent":0,"pageTotal":0}', 'utf-8');
			}


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

router.route('/saveenvironment/').post(function (req, res) {
	'use strict';
	var cookieRaw = (req.headers.cookie || "");
	var cookies = cookie.parse(cookieRaw);
	// Get the visitor name set in the cookie 
	loggedin = (cookies.loggedin || "");
	if (loggedin !== "") {
		environment.put(loggedin, JSON.stringify(req.body));
		res.writeHead(200, {
			'Content-type': 'text/html'
		});
		res.end("OK", 'utf-8');
		return;
	} else {
		sendFile(res, 'login.html', 'text/html');
		return;
	}
	//console.log("writing data for " + req.params.teamNumber);

});

router.route('/loadenvironment/').get(function (req, res) {
	'use strict';
	var cookieRaw = (req.headers.cookie || "");
	var cookies = cookie.parse(cookieRaw);
	// Get the visitor name set in the cookie 
	loggedin = (cookies.loggedin || "");
	if (loggedin !== "") {
		environment.get(loggedin, function (err, data) {
			if (err) {
				res.writeHead(200, {
					'Content-type': 'text/html'
				});
				res.end("Error loading", 'utf-8');
			} else {
				res.json(JSON.parse(data));
			}
		});
	} else {
		sendFile(res, 'login.html', 'text/html');
		return;
	}

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
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			res.json(safeParseJson(response.body));
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
	//                        'Content-type': 'application/json'
	//                    });
	//                    res.end(JSON.stringify(response.body), 'utf-8');
	//                });
	//        } else {
	//            if (req.params.year < currentYear) {
	//                //console.log("Sending stored alliances data for " + req.params.year + ":" + req.params.eventCode);
	//                res.writeHead(200, {
	//                    'Content-type': 'application/json'
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
	//                                'Content-type': 'application/json'
	//                            });
	//                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
	//                        } else {
	//                            //console.log("Stored alliances are stale. Saving result and sending new alliances for " + req.params.year + ":" + req.params.eventCode);
	//                            db.put("alliances." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
	//                            res.writeHead(200, {
	//                                'Content-type': 'application/json'
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
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			if (req.query.returnschedule === "true") {
				if (!response.headers['last-modified']) {
					res.writeHead(200, {
						'Content-type': 'application/json',
						'Last-Modified': "1 Jan 2018 01:24:20 GMT"
					});
				} else {
					res.writeHead(200, {
						'Content-type': 'application/json',
						'Last-Modified': response.headers['last-modified']
					});
				}
				//res.json(safeParseJson(response.body));

				res.end(JSON.stringify(safeParseJson(response.body)), 'utf-8');
			}
			if (Number(req.params.year) >= 2016) {
				logger.info({
					"message": "starting schedule parsing",
					"response": response
				});
				try {
					schedule = safeParseJson(response.body).Schedule;
					if (schedule.length > 0) {
						var storedScore = {};
						var storedScorePenaltyFree = {};
						var storedScoreOffsetting = {};
						//Get the high score
						if (!highscore[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel]) {
							storedScore.score = 0;
						} else {
							storedScore = highscore[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel];
						}
						if (!highscorePenaltyFree[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel]) {
							storedScorePenaltyFree.score = 0;
						} else {
							storedScorePenaltyFree = highscorePenaltyFree[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel];
						}
						if (!highscoreOffsetting[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel]) {
							storedScoreOffsetting.score = 0;
						} else {
							storedScoreOffsetting = highscoreOffsetting[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel];
						}


						for (var i = 0; i < schedule.length; i++) {
							var match = schedule[i];
							if (match.actualStartTime !== null) {
								logger.info({
									"message": "Overall High Score Parsing Match " + match.matchNumber + " from " + req.params.eventCode
								});
								if (match.scoreRedFinal > storedScore.score) {
									logger.info({
										"message": "Red has a high score.",
										"details": match
									});
									storedScore.score = match.scoreRedFinal;
									storedScore.alliance = "Red";
									storedScore.event = req.params.eventCode;
									storedScore.year = req.params.year;
									storedScore.tlevel = req.params.tlevel;
									storedScore.penalties = Number(match.scoreRedFoul) + Number(match.scoreBlueFoul);
									if (storedScore.penalties) {
										storedScore.penaltyFree = false;
									} else {
										storedScore.penaltyFree = true;
									}
									if ((storedScore.scoreRedFoul === storedScore.scoreBlueFoul) && (storedScore.penalties)) {
										storedScore.offsetting = true;
									} else {
										storedScore.offsetting = false;
									}
									storedScore.details = match;
									logger.info({
										"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
										"payload": storedScore
									});
									highscore[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel] = storedScore;
									seasonHighScore.put(String(req.params.year), JSON.stringify(highscore[String(req.params.year)]));
								}

								if (match.scoreBlueFinal > storedScore.score) {
									logger.info({
										"message": "Blue has a high score.",
										"details": match
									});
									storedScore.score = match.scoreBlueFinal;
									storedScore.alliance = "Blue";
									storedScore.event = req.params.eventCode;
									storedScore.year = req.params.year;
									storedScore.tlevel = req.params.tlevel;
									storedScore.penalties = Number(match.scoreRedFoul) + Number(match.scoreBlueFoul);
									if (storedScore.penalties) {
										storedScore.penaltyFree = false;
									} else {
										storedScore.penaltyFree = true;
									}
									storedScore.details = match;
									logger.info({
										"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
										"payload": storedScore
									});
									highscore[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel] = storedScore;
									seasonHighScore.put(String(req.params.year), JSON.stringify(highscore[String(req.params.year)]));
								}

								//Test for penalty free match
								if (Number(match.scoreRedFoul) + Number(match.scoreBlueFoul) === 0) {
									if (match.scoreRedFinal > storedScorePenaltyFree.score) {
										logger.info({
											"message": "Red has a high score.",
											"details": match
										});
										storedScorePenaltyFree.score = match.scoreRedFinal;
										storedScorePenaltyFree.alliance = "Red";
										storedScorePenaltyFree.event = req.params.eventCode;
										storedScorePenaltyFree.year = req.params.year;
										storedScorePenaltyFree.tlevel = req.params.tlevel;
										storedScorePenaltyFree.penalties = 0;
										storedScorePenaltyFree.penaltyFree = true;
										storedScorePenaltyFree.offsetting = false;
										storedScorePenaltyFree.details = match;
										logger.info({
											"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
											"payload": storedScorePenaltyFree
										});
										highscorePenaltyFree[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel] = storedScorePenaltyFree;
										seasonPenaltyFree.put(String(req.params.year), JSON.stringify(highscorePenaltyFree[String(req.params.year)]));
									}
									if (match.scoreBlueFinal > storedScorePenaltyFree.score) {
										logger.info({
											"message": "Blue has a high score.",
											"details": match
										});
										storedScorePenaltyFree.score = match.scoreBlueFinal;
										storedScorePenaltyFree.alliance = "Blue";
										storedScorePenaltyFree.event = req.params.eventCode;
										storedScorePenaltyFree.year = req.params.year;
										storedScorePenaltyFree.tlevel = req.params.tlevel;
										storedScorePenaltyFree.penalties = 0;
										storedScorePenaltyFree.penaltyFree = true;
										storedScorePenaltyFree.offsetting = false;
										storedScorePenaltyFree.details = match;
										logger.info({
											"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
											"payload": storedScorePenaltyFree
										});
										highscorePenaltyFree[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel] = storedScorePenaltyFree;
										seasonPenaltyFree.put(String(req.params.year), JSON.stringify(highscorePenaltyFree[String(req.params.year)]));
									}
								}
								//Test for offsetting penalty match
								if ((match.scoreRedFoul === match.scoreBlueFoul) && (Number(match.scoreRedFoul) > 0)) {
									if (match.scoreRedFinal > storedScoreOffsetting.score) {
										logger.info({
											"message": "Red has a high score.",
											"details": match
										});
										storedScoreOffsetting.score = match.scoreRedFinal;
										storedScoreOffsetting.alliance = "Red";
										storedScoreOffsetting.event = req.params.eventCode;
										storedScoreOffsetting.year = req.params.year;
										storedScoreOffsetting.tlevel = req.params.tlevel;
										storedScoreOffsetting.penalties = match.scoreRedFoul + match.scoreBlueFoul;
										storedScoreOffsetting.penaltyFree = false;
										storedScoreOffsetting.offsetting = true;
										storedScoreOffsetting.details = match;
										logger.info({
											"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".offsetting",
											"payload": storedScoreOffsetting
										});
										highscoreOffsetting[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel] = storedScoreOffsetting;
										seasonOffsetting.put(String(req.params.year), JSON.stringify(highscoreOffsetting[String(req.params.year)]));
									}
									if (match.scoreBlueFinal > storedScoreOffsetting.score) {
										logger.info({
											"message": "Blue has a high score.",
											"details": match
										});
										storedScoreOffsetting.score = match.scoreBlueFinal;
										storedScoreOffsetting.alliance = "Blue";
										storedScoreOffsetting.event = req.params.eventCode;
										storedScoreOffsetting.year = req.params.year;
										storedScoreOffsetting.tlevel = req.params.tlevel;
										storedScoreOffsetting.penalties = match.scoreRedFoul + match.scoreBlueFoul;
										storedScoreOffsetting.penaltyFree = false;
										storedScoreOffsetting.offsetting = true;
										storedScoreOffsetting.details = match;
										logger.info({
											"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
											"payload": storedScoreOffsetting
										});
										highscoreOffsetting[String(req.params.year)][req.params.eventCode + "." + req.params.tlevel] = storedScoreOffsetting;
										seasonOffsetting.put(String(req.params.year), JSON.stringify(highscoreOffsetting[String(req.params.year)]));
									}

								}
							}

						}
						if (req.query.returnschedule === "false") {
							res.json({
								"message": "Complete."
							});
						}

					} else {
						if (req.query.returnschedule === "false") {
							res.json({
								"message": "No Schedule."
							});
						}
					}
				} catch (err) {
					logger.error({
						"message": 'Schedule error payload',
						'payload': response.body,
						"error code": err.message
					});
					if (req.query.returnschedule === "false") {
						res.json({
							"message": err.message
						});
					}
				}
			}
		});
});

router.route('/:year/scheduleparked/:eventCode/:tlevel').get(cache('15 seconds'), function (req, res) {
	'use strict';
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/schedule/' + req.params.eventCode + '/' + req.params.tlevel + '/hybrid')
		.headers({
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			if (req.query.returnschedule === "true") {
				res.json(safeParseJson(response.body));
			}
			if (req.params.year === "2018") {
				logger.info({
					"message": "starting schedule parsing",
					"response": response
				});
				try {
					schedule = safeParseJson(response.body).Schedule;
					if (schedule.length > 0) {
						seasonHighScore.get(req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, function (err, storedRequest) {
							var storedScore = {};
							if (err) {
								storedScore.score = 0;
							} else {
								storedScore = JSON.parse(storedRequest);
							}

							for (var i = 0; i < schedule.length; i++) {
								var match = schedule[i];
								if (match.actualStartTime !== null) {
									logger.info({
										"message": "Overall High Score Parsing Match " + match.matchNumber + " from " + req.params.eventCode
									});
									if (match.scoreRedFinal > storedScore.score) {
										logger.info({
											"message": "Red has a high score.",
											"details": match
										});
										storedScore.score = match.scoreRedFinal;
										storedScore.alliance = "Red";
										storedScore.event = req.params.eventCode;
										storedScore.year = req.params.year;
										storedScore.tlevel = req.params.tlevel;
										storedScore.penalties = Number(match.scoreRedFoul) + Number(match.scoreBlueFoul);
										if (storedScore.penalties) {
											storedScore.penaltyFree = false;
										} else {
											storedScore.penaltyFree = true;
										}
										if ((storedScore.scoreRedFoul === storedScore.scoreBlueFoul) && (storedScore.penalties > 0)) {
											storedScore.offsetting = true;
										} else {
											storedScore.offsetting = false;
										}
										storedScore.details = match;
										logger.info({
											"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
											"payload": storedScore
										});
										seasonHighScore.put(req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, JSON.stringify(storedScore));
									} else if (match.scoreBlueFinal > storedScore.score) {
										logger.info({
											"message": "Blue has a high score.",
											"details": match
										});
										storedScore.score = match.scoreBlueFinal;
										storedScore.alliance = "Blue";
										storedScore.event = req.params.eventCode;
										storedScore.year = req.params.year;
										storedScore.tlevel = req.params.tlevel;
										storedScore.penalties = Number(match.scoreRedFoul) + Number(match.scoreBlueFoul);
										if (storedScore.penalties) {
											storedScore.penaltyFree = false;
										} else {
											storedScore.penaltyFree = true;
										}
										storedScore.details = match;
										logger.info({
											"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
											"payload": storedScore
										});
										seasonHighScore.put(req.params.eventCode + "." + req.params.year + "." + req.params.tlevel, JSON.stringify(storedScore));
									}
								}
							}
							seasonHighScore.get(req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree", function (err, storedRequestPenaltyFree) {
								var storedScorePenaltyFree = {};
								if (err) {
									storedScorePenaltyFree.score = 0;
								} else {
									storedScorePenaltyFree = JSON.parse(storedRequestPenaltyFree);
								}

								for (var i = 0; i < schedule.length; i++) {
									var match = schedule[i];
									if (match.actualStartTime !== null) {
										//Track penalty free matches
										if (Number(match.scoreRedFoul) + Number(match.scoreBlueFoul) === 0) {
											if (match.scoreRedFinal > storedScorePenaltyFree.score) {
												logger.info({
													"message": "Red has a high score.",
													"details": match
												});
												storedScorePenaltyFree.score = match.scoreRedFinal;
												storedScorePenaltyFree.alliance = "Red";
												storedScorePenaltyFree.event = req.params.eventCode;
												storedScorePenaltyFree.year = req.params.year;
												storedScorePenaltyFree.tlevel = req.params.tlevel;
												storedScorePenaltyFree.penalties = Number(match.scoreRedFoul) + Number(match.scoreBlueFoul);
												if (storedScorePenaltyFree.penalties) {
													storedScorePenaltyFree.penaltyFree = false;
												} else {
													storedScorePenaltyFree.penaltyFree = true;
												}
												storedScorePenaltyFree.details = match;
												logger.info({
													"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
													"payload": storedScorePenaltyFree
												});
												seasonHighScore.put(req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree", JSON.stringify(storedScorePenaltyFree));
											} else if (match.scoreBlueFinal > storedScorePenaltyFree.score) {
												logger.info({
													"message": "Blue has a high score.",
													"details": match
												});
												storedScorePenaltyFree.score = match.scoreBlueFinal;
												storedScorePenaltyFree.alliance = "Blue";
												storedScorePenaltyFree.event = req.params.eventCode;
												storedScorePenaltyFree.year = req.params.year;
												storedScorePenaltyFree.tlevel = req.params.tlevel;
												storedScorePenaltyFree.penalties = Number(match.scoreRedFoul) + Number(match.scoreBlueFoul);
												if (storedScorePenaltyFree.penalties) {
													storedScorePenaltyFree.penaltyFree = false;
												} else {
													storedScorePenaltyFree.penaltyFree = true;
												}
												storedScorePenaltyFree.details = match;
												logger.info({
													"message": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree",
													"payload": storedScorePenaltyFree
												});
												seasonHighScore.put(req.params.eventCode + "." + req.params.year + "." + req.params.tlevel + ".penaltyFree", JSON.stringify(storedScorePenaltyFree));
											}
										}
									}
								}
								if (req.query.returnschedule === "false") {
									logger.info({
										"message": "schedule parsing complete for " + req.params.eventCode + "." + req.params.year + "." + req.params.tlevel
									});
									res.json({
										"response": req.params.eventCode + "." + req.params.year + "." + req.params.tlevel
									});
								}
							});

						});



					}
				} catch (err) {
					logger.error({
						"message": 'Schedule error payload',
						'payload': response.body,
						"error code": err.message
					});
				}
			}

		});

});


function getEventsList(year) {
	"use strict";
	return new Promise(function (resolve, reject) {
		unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/events')
			.headers({
				'Authorization': token.token
			})
			.end(function (response) {
					if (response.statusCode === 200) {
						logger.info({
							"message": "getEventsList(" + year + ") has events list:"
						});
						resolve(response.body.Events);
					} else {
						logger.error({
							"message": "getEventsList" + year + "Error",
							"StatusCode": response.statusCode
						});
						reject(Error(response));
					}

				}

			);
	});
}


router.route('/:year/teamdata/:team/').get(cache('12 hours'), function (req, res) {
	'use strict';
	//    unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
	//        .headers({
	//            'Authorization': token.token
	//        })
	//        .end(function (response) {
	//            res.writeHead(200, {
	//                'Content-type': 'application/json'
	//            });
	//            res.end(JSON.stringify(response.body), 'utf-8');
	//        });
	teamData.get(req.params.team + "." + req.params.year, function (err, storedRequest) {
		if (err) {
			//console.log("No stored team data for " + req.params.year + ":" + req.params.team);
			unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
				.headers({
					'Authorization': token.token,
					'Accept': 'application/json'
				})
				.end(function (response) {
					//console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
					teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
					res.json(safeParseJson(response.body));
				});
		} else {

			//console.log("Reading stored team data for " + req.params.year + ":" + req.params.team + " from FIRST");
			unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
				.headers({
					'Authorization': token.token,
					'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
					'Accept': 'application/json'
				})
				.end(function (response) {
					//console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
					if (response.statusCode === 304) {
						//console.log("Stored team data are current. Sending  stored team data for " + req.params.year + ":" + req.params.team);
						res.writeHead(200, {
							'Content-type': 'application/json'
						});
						res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
					} else {
						//console.log("Stored team data are stale. Saving result and sending new team data for " + req.params.year + ":" + req.params.team);
						teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
						res.json(safeParseJson(response.body));
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
					'Authorization': token.token,
					'Accept': 'application/json'
				})
				.end(function (response) {
					//console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
					teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
					res.json(safeParseJson(response.body));
				});
		} else {

			//console.log("Reading stored team data for " + req.params.year + ":" + req.params.team + " from FIRST");
			unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
				.headers({
					'Authorization': token.token,
					'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
					'Accept': 'application/json'
				})
				.end(function (response) {
					//console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
					if (response.statusCode === 304) {
						//console.log("Stored team data are current. Sending  stored team data for " + req.params.year + ":" + req.params.team);
						res.writeHead(200, {
							'Content-type': 'application/json'
						});
						res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
					} else {
						//console.log("Stored team data are stale. Saving result and sending new team data for " + req.params.year + ":" + req.params.team);
						teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
						res.json(safeParseJson(response.body));
					}
				});

		}
	});

});



router.route('/:year/registrations/:event/').get(cache('10 minutes'), function (req, res) {
	'use strict';
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/registrations/?eventCode=' + req.params.event)
		.headers({
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			res.json(safeParseJson(response.body));
		});
});



router.route('/:year/teams/:eventCode/:page').get(cache('120 minutes'), function (req, res) {
	'use strict';
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?eventcode=' + req.params.eventCode + "&page=" + req.params.page)
		.headers({
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			res.json(safeParseJson(response.body));
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
	//                        'Content-type': 'application/json'
	//                    });
	//                    res.end(JSON.stringify(response.body), 'utf-8');
	//                });
	//        } else {
	//            if (req.params.year < currentYear) {
	//                //console.log("Sending stored teams data for " + req.params.year + ":" + req.params.eventCode);
	//                res.writeHead(200, {
	//                    'Content-type': 'application/json'
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
	//                                'Content-type': 'application/json'
	//                            });
	//                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
	//                        } else {
	//                            //console.log("Stored teams are stale. Saving result and sending new teams for " + req.params.year + ":" + req.params.eventCode);
	//                            db.put("teams." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
	//                            res.writeHead(200, {
	//                                'Content-type': 'application/json'
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
				'Content-type': 'application/json'
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
				'Content-type': 'application/json'
			});
			res.end(JSON.stringify(output), 'utf-8');
		});

});


router.route('/:year/rankings/:eventCode/').get(cache('15 seconds'), function (req, res) {
	'use strict';
	unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/rankings/' + req.params.eventCode)
		.headers({
			'Authorization': token.token,
			'Accept': 'application/json'
		})
		.end(function (response) {
			//res.json(safeParseJson(response.body));
			if (!response.headers['last-modified']) {
				res.writeHead(200, {
					'Content-type': 'application/json',
					'Last-Modified': "1 Jan 2018 01:24:20 GMT"
				});
			} else {
				res.writeHead(200, {
					'Content-type': 'application/json',
					'Last-Modified': response.headers['last-modified']
				});
			}
			res.end(JSON.stringify(safeParseJson(response.body)), 'utf-8');
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
	//                        'Content-type': 'application/json'
	//                    });
	//                    res.end(JSON.stringify(response.body), 'utf-8');
	//                });
	//        } else {
	//            if (req.params.year < currentYear) {
	//                //console.log("Sending stored rankings data for " + req.params.year + ":" + req.params.eventCode);
	//                res.writeHead(200, {
	//                    'Content-type': 'application/json'
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
	//                                'Content-type': 'application/json'
	//                            });
	//                            res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
	//                        } else {
	//                            //console.log("Stored rankings are stale. Saving result and sending new rankings for " + req.params.year + ":" + req.params.eventCode);
	//                            db.put("rankings." + req.params.eventCode + "." + req.params.year, JSON.stringify(response));
	//                            res.writeHead(200, {
	//                                'Content-type': 'application/json'
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
	//                        'Content-type': 'application/json'
	//                    });
	//                    res.end(JSON.stringify(response.body), 'utf-8');
	//                });

	teamAwards.get(req.params.teamNumber + ":" + req.params.year, function (err, storedRequest) {
		if (err) {
			//console.log("No stored awards data for " + req.params.year + ":" + req.params.teamNumber);
			unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
				.headers({
					'Authorization': token.token,
					'Accept': 'application/json'
				})
				.end(function (response) {
					if (req.params.year < currentYear) {
						teamAwards.put(req.params.teamNumber + ":" + req.params.year, JSON.stringify(response));
					}
					res.json(safeParseJson(response.body));
				});
		} else {
			if (req.params.year < currentYear) {
				//console.log("Sending stored awards data for " + req.params.year + ":" + req.params.teamNumber);
				res.writeHead(200, {
					'Content-type': 'application/json'
				});
				res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
			} else {
				//console.log("Reading awards data for " + req.params.year + ":" + req.params.teamNumber + " from FIRST");
				unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/awards/' + req.params.teamNumber)
					.headers({
						'Authorization': token.token,
						'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
						'Accept': 'application/json'
					})
					.end(function (response) {
						if (response.statusCode === 304) {
							//console.log("Stored awards are current. Sending stored awards for " + req.params.year + ":" + req.params.teamNumber);
							res.writeHead(200, {
								'Content-type': 'application/json'
							});
							res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
						} else {
							//console.log("Stored awards are stale. Saving result and sending new awards for " + req.params.year + ":" + req.params.teamNumber);
							teamAwards.put(req.params.teamNumber + ":" + req.params.year, JSON.stringify(response));
							res.json(safeParseJson(response.body));
						}
					});
			}
		}
	});
});

router.route('/:year/awardsv2stopgap/:teamNumber/').get(cache('1 hours'), function (req, res) {
	'use strict';
	//logger.info({
	//		'awardsv2 start': "/" + year + "/awardsv2/" + teamNumber
	//	});
	var promises = [];
	var teamNumber = req.params.teamNumber;
	var year = req.params.year,
		year1 = String(Number(year) - 1),
		year2 = String(Number(year) - 2);

	promises.push(new Promise(function (resolve, reject) {
		unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
			.headers({
				'Authorization': token.token,
				'Accept': 'application/json'
			})
			.end(function (response) {
				//logger.info({
				//					'awardsv2 response year': response
				//				});
				resolve(cleanupAwards(response.body));
			});
	}));

	promises.push(new Promise(function (resolve, reject) {
		unirest.get('https://frc-api.firstinspires.org/v2.0/' + year1 + '/awards/' + teamNumber)
			.headers({
				'Authorization': token.token,
				'Accept': 'application/json'
			})
			.end(function (response) {
				//				logger.info({
				//					'awardsv2 response year1': response
				//				});
				resolve(cleanupAwards(response.body));
			});
	}));

	promises.push(new Promise(function (resolve, reject) {
		unirest.get('https://frc-api.firstinspires.org/v2.0/' + year2 + '/awards/' + teamNumber)
			.headers({
				'Authorization': token.token,
				'Accept': 'application/json'
			})
			.end(function (response) {
				//				logger.info({
				//					'awardsv2 response year2': response
				//				});
				resolve(cleanupAwards(response.body));
			});
	}));



	//console.log("sending Promises");
	Promise.all(promises).then(function (values) {
		//console.log("promise values: " + JSON.stringify(values));
		res.json(values);
		//console.log("done");
	});

});


router.route('/:year/awardsv2/:teamNumber/').get(cache('1 hours'), function (req, res) {
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
						'Authorization': token.token,
						'Accept': 'application/json'
					})
					.end(function (response) {
						if (year < currentYear) {
							teamAwards.put(teamNumber + ":" + year, JSON.stringify(response));
						}
						//console.log(year + ": Returning new data from FIRST: " + JSON.stringify(response.body));

						resolve(cleanupAwards(response.body));

					});
			} else {
				if (year < currentYear) {
					//console.log("Sending stored awards data for " + year + ":" + teamNumber);
					//console.log(year + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
					resolve(cleanupAwards(JSON.parse(storedRequest).body));

				} else {
					//console.log("Reading awards data for " + year + ":" + teamNumber + " from FIRST");
					unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
						.headers({
							'Authorization': token.token,
							'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
							'Accept': 'application/json'
						})
						.end(function (response) {
							if (response.statusCode === 304) {
								//console.log("Stored awards are current. Sending stored awards for " + year + ":" + teamNumber);
								//console.log(year + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
								resolve(cleanupAwards(JSON.parse(storedRequest).body));
							} else {
								//console.log("Stored awards are stale. Saving result and sending new awards for " + year + ":" + teamNumber);
								//console.log(year + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
								teamAwards.put(teamNumber + ":" + year, JSON.stringify(response));
								resolve(cleanupAwards(response.body));
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
						'Authorization': token.token,
						'Accept': 'application/json'
					})
					.end(function (response) {
						if (year1 < currentYear) {
							teamAwards.put(teamNumber + ":" + year1, JSON.stringify(response));
							//console.log(year1 + ": Returning new data from FIRST: " + JSON.stringify(response.body));
							resolve(cleanupAwards(response.body));
						}
					});
			} else {
				if (year1 < currentYear) {
					//console.log("Sending stored awards data for " + year + ":" + teamNumber);
					//console.log(year1 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
					resolve(cleanupAwards(JSON.parse(storedRequest).body));

				} else {
					//console.log("Reading awards data for " + year + ":" + teamNumber + " from FIRST");
					unirest.get('https://frc-api.firstinspires.org/v2.0/' + year1 + '/awards/' + teamNumber)
						.headers({
							'Authorization': token.token,
							'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
							'Accept': 'application/json'
						})
						.end(function (response) {
							if (response.statusCode === 304) {
								//console.log("Stored awards are current. Sending stored awards for " + year + ":" + teamNumber);
								//console.log(year1 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
								resolve(cleanupAwards(JSON.parse(storedRequest).body));
							} else {
								//console.log("Stored awards are stale. Saving result and sending new awards for " + year + ":" + teamNumber);
								//console.log(year1 + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
								teamAwards.put(teamNumber + ":" + year1, JSON.stringify(response));
								resolve(cleanupAwards(response.body));
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
						'Authorization': token.token,
						'Accept': 'application/json'
					})
					.end(function (response) {
						if (year2 < currentYear) {
							teamAwards.put(teamNumber + ":" + year2, JSON.stringify(response));
							//console.log(year2 + ": Returning new data from FIRST: " + JSON.stringify(response.body));
							resolve(cleanupAwards(response.body));
						}
					});
			} else {
				if (year2 < currentYear) {
					//console.log("Sending stored awards data for " + year2 + ":" + teamNumber);
					//console.log(year2 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
					resolve(cleanupAwards(JSON.parse(storedRequest).body));

				} else {
					//console.log("Reading awards data for " + year2 + ":" + teamNumber + " from FIRST");
					unirest.get('https://frc-api.firstinspires.org/v2.0/' + year2 + '/awards/' + teamNumber)
						.headers({
							'Authorization': token.token,
							'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
							'Accept': 'application/json'
						})
						.end(function (response) {
							if (response.statusCode === 304) {
								//console.log("Stored awards are current. Sending stored awards for " + year2 + ":" + teamNumber);
								//console.log(year2 + ": Returning stored data from gatool: " + JSON.stringify(JSON.parse(storedRequest).body));
								resolve(cleanupAwards(JSON.parse(storedRequest).body));
							} else {
								//console.log("Stored awards are stale. Saving result and sending new awards for " + year2 + ":" + teamNumber);
								//console.log(year2 + ": Storing response and returning new data from FIRST: " + JSON.stringify(response.body));
								teamAwards.put(teamNumber + ":" + year2, JSON.stringify(response));
								resolve(cleanupAwards(response.body));
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
			'Content-type': 'application/json'
		});
		res.end(JSON.stringify(values), 'utf-8');
		//console.log("done");
	});


});


function cleanupAwards(award) {
	"use strict";
	//console.log(typeof award);
	if ((typeof award) === "object") {
		return (award);
	} else {

		return (JSON.parse('{"Awards":[]}'));

	}
}

function getAwards(teamNumber, year) {
	"use strict";
	teamAwards.get(teamNumber + ":" + year, function (err, storedRequest) {
		if (err) {
			//console.log("No stored awards data for " + year + ":" + teamNumber);
			unirest.get('https://frc-api.firstinspires.org/v2.0/' + year + '/awards/' + teamNumber)
				.headers({
					'Authorization': token.token,
					'Accept': 'application/json'
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
						'If-Modified-Since': JSON.parse(storedRequest).headers['date'],
						'Accept': 'application/json'
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
	sendFile(res, 'scripts.js', 'text/javascript');
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
	sendFile(res, './js/' + req.params.filename, 'text/javascript');
});

app.get('/fonts/:filename', cache('24 hours'), function (req, res) {
	'use strict';
	sendFile(res, './fonts/' + req.params.filename);
});

app.get('/avatars/:filename', cache('96 hours'), function (req, res) {
	'use strict';
	sendFile(res, './avatars/' + req.params.filename);
});
