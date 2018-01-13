/*global require */

var secureHTTP = require("./secureHTTP.json");

var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    url = require('url'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    unirest = require('unirest');

var token = require("./token.json");
var tbatoken = require("./tbatoken.json");


//var list = require("./newusers.json");
var list = [{username:'1265216415@qq.com',password:'GuoyongLovesFIRST!'},{username:'88craver@gmail.com',password:'JeffLovesFIRST!'},{username:'acyran96@gmail.com',password:'AdamLovesFIRST!'},{username:'agrady131@gmail.com',password:'AndyLovesFIRST!'},{username:'ahjones@lssu.edu',password:'AndrewLovesFIRST!'},{username:'alexkwilcox@outlook.com',password:'AlexanderLovesFIRST!'},{username:'alibessette15@gmail.com',password:'AlisonLovesFIRST!'},{username:'allengregoryiv@gmail.com',password:'AllenLovesFIRST!'},{username:'amandapiergallini@gmail.com',password:'AmandaLovesFIRST!'},{username:'anthonycaliciuri@gmail.com',password:'AnthonyLovesFIRST!'},{username:'asyd.reign@hotmail.com',password:'SydneyLovesFIRST!'},{username:'b-basile@ti.com',password:'BartLovesFIRST!'},{username:'bearjcc@gmail.com',password:'JosephLovesFIRST!'},{username:'ben@techfire225.org',password:'BenLovesFIRST!'},{username:'beryl@berylsbox.com',password:'BerylLovesFIRST!'},{username:'bgraham111@earthlink.net',password:'BrianLovesFIRST!'},{username:'blair@usfirst.org',password:'BlairLovesFIRST!'},{username:'blarkin106@gmail.com',password:'BrendanLovesFIRST!'},{username:'bonzack@aol.com',password:'BarryLovesFIRST!'},{username:'brett@andymark.com',password:'BrettLovesFIRST!'},{username:'brettwo@outlook.com',password:'BrettLovesFIRST!'},{username:'brockdarnold@yahoo.com',password:'BrockLovesFIRST!'},{username:'bsenson@gmail.com',password:'BenLovesFIRST!'},{username:'calvinwtran@gmail.com',password:'CalvinLovesFIRST!'},{username:'ceneubecker@hawkmail.hfcc.edu',password:'CharlesLovesFIRST!'},{username:'cesarmenchacarivera@gmail.com',password:'CesarLovesFIRST!'},{username:'cgoodgame@gmail.com',password:'ClifLovesFIRST!'},{username:'charles.offor@tdsb.on.ca',password:'CharlesLovesFIRST!'},{username:'chris.tucker@microchip.com',password:'ChrisLovesFIRST!'},{username:'christopher.r.copelan@nasa.gov',password:'ChristopherLovesFIRST!'},{username:'cingram825@fioptics.com',password:'CharlesLovesFIRST!'},{username:'clutch1058@gmail.com',password:'BrandonLovesFIRST!'},{username:'colin.mildenberger@team2052.com',password:'ColinLovesFIRST!'},{username:'collinfultz@gmail.com',password:'CollinLovesFIRST!'},{username:'crissyrhs@hotmail.com',password:'CrystalLovesFIRST!'},{username:'daniel_conder@comcast.com',password:'DanielLovesFIRST!'},{username:'danny@andymark.com',password:'DannyLovesFIRST!'},{username:'danrrichardson@gmail.com',password:'DanielLovesFIRST!'},{username:'davempowers@ymail.com',password:'DavidLovesFIRST!'},{username:'david.boyd@usstem.org',password:'DavidLovesFIRST!'},{username:'david.j.verbrugge@gmail.com',password:'DavidLovesFIRST!'},{username:'david.m.seidel@jpl.nasa.gov',password:'DavidLovesFIRST!'},{username:'davidfv1964@gmail.com',password:'DavidLovesFIRST!'},{username:'deiland@ebrschools.org',password:'DanielLovesFIRST!'},{username:'dgreen@firstinspires.org',password:'DanLovesFIRST!'},{username:'dirtvoice@hotmail.com',password:'ScottLovesFIRST!'},{username:'dmgeerobotics@gmail.com',password:'DarinLovesFIRST!'},{username:'dntbaker@aol.com',password:'DarrelLovesFIRST!'},{username:'don.knight@gm.com',password:'DonaldLovesFIRST!'},{username:'edward.s.ewald@lmco.com',password:'EdwardLovesFIRST!'},{username:'elcochese@gmail.com',password:'TimothyLovesFIRST!'},{username:'emily.ifill@gmail.com',password:'EmilyLovesFIRST!'},{username:'eric_eckhardt@hotmail.com',password:'EricLovesFIRST!'},{username:'ericdelsanto@gmail.com',password:'EricLovesFIRST!'},{username:'erstech@gmail.com',password:'EricLovesFIRST!'},{username:'especki@uark.edu',password:'EricLovesFIRST!'},{username:'fibopilot@yahoo.com',password:'DavidLovesFIRST!'},{username:'flame112997@gmail.com',password:'RachelLovesFIRST!'},{username:'fogwellsm@msoe.edu',password:'SarahLovesFIRST!'},{username:'gaffey.brian@gmail.com',password:'BrianLovesFIRST!'},{username:'gandersn1@gmail.com',password:'GeorgeLovesFIRST!'},{username:'gavmac928@gmail.com',password:'GavinLovesFIRST!'},{username:'gchen605@hotmail.com',password:'GeorgeLovesFIRST!'},{username:'george.wallace@gmail.com',password:'GeorgeLovesFIRST!'},{username:'georgeackley@gmail.com',password:'GeorgeLovesFIRST!'},{username:'gwilkins@ieee.org',password:'GregoryLovesFIRST!'},{username:'harold11215@gmail.com',password:'HaroldLovesFIRST!'},{username:'hayworthzach@gmail.com',password:'ZachLovesFIRST!'},{username:'hello@rthr.me',password:'ArthurLovesFIRST!'},{username:'iahatzil@mtu.edu',password:'IanLovesFIRST!'},{username:'imarcellana@gmail.com',password:'IanLovesFIRST!'},{username:'info@cityofmyrtlebeach.com',password:'MarkLovesFIRST!'},{username:'iotten@eupschools.org',password:'IsiahLovesFIRST!'},{username:'jahurd95@gmail.com',password:'JoelLovesFIRST!'},{username:'jamesbm1983@gmail.com',password:'BenLovesFIRST!'},{username:'jathomas@tcco.com',password:'JamesLovesFIRST!'},{username:'jerryshikarides@gmail.com',password:'JeremyLovesFIRST!'},{username:'jez@chrysler.com',password:'JimLovesFIRST!'},{username:'jlockman@adobe.com',password:'JamesLovesFIRST!'},{username:'jmontois340@gmail.com',password:'JustinLovesFIRST!'},{username:'john.taylor.n@gmail.com',password:'JTLovesFIRST!'},{username:'jojobaguilar@gmail.com',password:'JojoLovesFIRST!'},{username:'jondarr.bradshaw@gmail.com',password:'JonDarrLovesFIRST!'},{username:'jonellgregor@gmail.com',password:'JonellLovesFIRST!'},{username:'jonjack@gmail.com',password:'JonLovesFIRST!'},{username:'jorgearotter@gmail.com',password:'JorgeLovesFIRST!'},{username:'josh@iv597.com',password:'JoshuaLovesFIRST!'},{username:'joshb98@comcast.net',password:'JoshuaLovesFIRST!'},{username:'joshuapgoodman@gmail.com',password:'JoshuaLovesFIRST!'},{username:'jrspencer00@gmail.com',password:'JamesLovesFIRST!'},{username:'jrueb@cableone.net',password:'JeanineLovesFIRST!'},{username:'jung41131@gmail.com',password:'PatrickLovesFIRST!'},{username:'kate.v.suarez@gmail.com',password:'KateLovesFIRST!'},{username:'katie.stevens1923@gmail.com',password:'KatieLovesFIRST!'},{username:'kelsie.atiyeh@gmail.com',password:'KelsieLovesFIRST!'},{username:'kevinro@firstwa.org',password:'KevinLovesFIRST!'},{username:'kkanagas@gmail.com',password:'KarthikLovesFIRST!'},{username:'kmkennedy888@gmail.com',password:'KeeganLovesFIRST!'},{username:'kocajj@gmail.com',password:'JustinLovesFIRST!'},{username:'kori.bowns@gmail.com',password:'KoriLovesFIRST!'},{username:'kwhood@wpde.com',password:'KirbyLovesFIRST!'},{username:'laplante@vt.edu',password:'SamanthaLovesFIRST!'},{username:'laurenbreadner@rogers.com',password:'LaurenLovesFIRST!'},{username:'libby.kamen@gmail.com',password:'LibbyLovesFIRST!'},{username:'logan.c.farrell@gmail.com',password:'LoganLovesFIRST!'},{username:'lyncas@gmail.com',password:'AndrewLovesFIRST!'},{username:'lynnyanyo@gmail.com',password:'LynnLovesFIRST!'},{username:'mackenzieerinpech@gmail.com',password:'MackenzieLovesFIRST!'},{username:'malay_shashank@hotmail.com',password:'MalayLovesFIRST!'},{username:'marlene_pap@hotmail.com',password:'MarleneLovesFIRST!'},{username:'martydavsi@gmail.com',password:'MartinLovesFIRST!'},{username:'mason.m.markee@gmail.com',password:'MasonLovesFIRST!'},{username:'mbirkel91@gmail.com',password:'MatthewLovesFIRST!'},{username:'meghan.gallant@ccsc.com.cn',password:'MeghanLovesFIRST!'},{username:'methodicalmoose24@gmail.com',password:'NicholasLovesFIRST!'},{username:'mford@kcp.com',password:'FrankLovesFIRST!'},{username:'minibcan@gmail.com',password:'BryanLovesFIRST!'},{username:'mkaurich@usra.edu',password:'MichaelLovesFIRST!'},{username:'mooretep@cox.net',password:'PeterLovesFIRST!'},{username:'mpenn@horrycountyschools.net',password:'MindiLovesFIRST!'},{username:'mr.kwells@yahoo.com',password:'KendallLovesFIRST!'},{username:'mstarke340@gmail.com',password:'MikeLovesFIRST!'},{username:'mterilli@hotmail.com',password:'MarkLovesFIRST!'},{username:'music4david@gmail.com',password:'DavidLovesFIRST!'},{username:'mwjjjg@gmail.com',password:'MartyLovesFIRST!'},{username:'nastout1993@gmail.com',password:'NicoleLovesFIRST!'},{username:'natalie.lanie@gmail.com',password:'NatalieLovesFIRST!'},{username:'nataliealiealie@gmail.com',password:'NatalieLovesFIRST!'},{username:'nate.t.vetter@gmail.com',password:'NathanielLovesFIRST!'},{username:'ndpurdy@hotmail.com',password:'NathanLovesFIRST!'},{username:'nick@hammes.me',password:'NicholasLovesFIRST!'},{username:'niskijoseph@comcast.net',password:'JosephLovesFIRST!'},{username:'noitisnt.tony@gmail.com',password:'AnthonyLovesFIRST!'},{username:'olsen2826@gmail.com',password:'NikLovesFIRST!'},{username:'patrick.brew@gmail.com',password:'PatrickLovesFIRST!'},{username:'paulinetasci@gmail.com',password:'PaulineLovesFIRST!'},{username:'philipleete@gmail.com',password:'PhilipLovesFIRST!'},{username:'poffor22@gmail.com',password:'PaulLovesFIRST!'},{username:'preveen_sripalan@hotmail.com',password:'PreveenLovesFIRST!'},{username:'rachelbaker097@gmail.com',password:'RachelLovesFIRST!'},{username:'rdognaux@gmail.com',password:'RyanLovesFIRST!'},{username:'reaganwhitney@gmail.com',password:'ReaganLovesFIRST!'},{username:'recona266@gmail.com',password:'NicholasLovesFIRST!'},{username:'resqjak@comcast.net',password:'JohnLovesFIRST!'},{username:'rgarland@mitre.org',password:'RichardLovesFIRST!'},{username:'rich@achievescience.com',password:'RichardLovesFIRST!'},{username:'rick.kramer08@gmail.com',password:'RichardLovesFIRST!'},{username:'rizzotech@gmail.com',password:'MichaelLovesFIRST!'},{username:'rjmccann58@gmail.com',password:'RichardLovesFIRST!'},{username:'robotbillmd@gmail.com',password:'BillLovesFIRST!'},{username:'ryankamptv@gmail.com',password:'RyanLovesFIRST!'},{username:'sabradford@aaamichigan.com',password:'ScottLovesFIRST!'},{username:'sadat003@umn.edu',password:'SamiraLovesFIRST!'},{username:'samanthalscharles@gmail.com',password:'SamanthaLovesFIRST!'},{username:'samir13k@gmail.com',password:'SamirLovesFIRST!'},{username:'seanclancy16@yahoo.com',password:'SeanLovesFIRST!'},{username:'shimi002@umn.edu',password:'YojiLovesFIRST!'},{username:'sorahl@outlook.com',password:'JohnLovesFIRST!'},{username:'stephaniesteuri@gmail.com',password:'StephanieLovesFIRST!'},{username:'steve@nchawleys.com',password:'StevenLovesFIRST!'},{username:'stevebissen@gmail.com',password:'SteveLovesFIRST!'},{username:'steven-smith@ti.com',password:'StevenLovesFIRST!'},{username:'steven.r.wall@gmail.com',password:'StevenLovesFIRST!'},{username:'sydney.grewe@gmail.com',password:'SydneyLovesFIRST!'},{username:'sydney.mosher@ndsu.edu',password:'SydneyLovesFIRST!'},{username:'tanick@eastman.com',password:'ToneyLovesFIRST!'},{username:'tawexler@gmail.com',password:'ThomasLovesFIRST!'},{username:'tcbarto@gmail.com',password:'ToddLovesFIRST!'},{username:'tdnader@comcast.net',password:'ThomasLovesFIRST!'},{username:'thenolafive@gmail.com',password:'ChristopherLovesFIRST!'},{username:'timothyp@adobe.com',password:'TimLovesFIRST!'},{username:'toribell13@yahoo.com',password:'VictoriaLovesFIRST!'},{username:'torinoelbrock@gmail.com',password:'ToriLovesFIRST!'},{username:'tristanemmett47@gmail.com',password:'TristanLovesFIRST!'},{username:'trivedi.pranit@gmail.com',password:'PranitLovesFIRST!'},{username:'tskoons623@gmail.com',password:'TimothyLovesFIRST!'},{username:'tslourenco@wpi.edu',password:'ThomasLovesFIRST!'},{username:'tyler.joe.owen@gmail.com',password:'TylerLovesFIRST!'},{username:'tylerolds@waverobotics.com',password:'TylerLovesFIRST!'},{username:'voigh053@umn.edu',password:'JaredLovesFIRST!'},{username:'william.bauman@gm.com',password:'WilliamLovesFIRST!'},{username:'xiawei7798@163.com',password:'SongyunLovesFIRST!'},{username:'yali.barak@gmail.com',password:'YaliLovesFIRST!'},{username:'zachorr139@gmail.com',password:'ZacharyLovesFIRST!'}];
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
var teamData = level("./teamdata/",options);

var bodyParser = require('body-parser');
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

router.route('/:year/events').get(function (req, res) {
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
    //            if (req.params.year < 2017) {
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
    unirest.get('https://www.thebluealliance.com/api/v2/events/'+ req.params.year)
        .headers({
            'X-TBA-App-Id': tbatoken.header,
            'X-TBA-Auth-Key' : tbatoken.token
        })
        .end(function (response) {
            var offseasonevents = response.body;
            var result = [];
            var output = {};
            for (var i = 1; i < offseasonevents.length; i++) {
                var address = [];
                if (offseasonevents[i].event_type_string === "Offseason") {
                    if (offseasonevents[i].venue_address === null) {
                        address = ["no venue","no venue address","no city, no state, no country"];
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
    unirest.get('https://www.thebluealliance.com/api/v3/events/'+ req.params.year)
        .headers({
            'X-TBA-App-Id': tbatoken.header,
            'X-TBA-Auth-Key' : tbatoken.token
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
                console.log("Bad data found for " + req.params.teamNumber + ": " + teamData);
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
    //            if (req.params.year < 2017) {
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

router.route('/:year/schedule/:eventCode/:tlevel').get(function (req, res) {
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
    //            if (req.params.year < 2017) {
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


router.route('/:year/teamdata/:team/').get(function (req, res) {
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
            console.log("No stored team data for " + req.params.year + ":" + req.params.team);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {

            console.log("Reading stored team data for " + req.params.year + ":" + req.params.team + " from FIRST");
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token,
                    'If-Modified-Since': JSON.parse(storedRequest).headers["date"]
                })
                .end(function (response) {
                console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    if (response.statusCode === 304) {
                        console.log("Stored team data are current. Sending  stored team data for " + req.params.year + ":" + req.params.team);
                        res.writeHead(200, {
                            'Content-type': 'text/html'
                        });
                        res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                    } else {
                        console.log("Stored team data are stale. Saving result and sending new team data for " + req.params.year + ":" + req.params.team);
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

router.route('/:year/newteamdata/:team/').get(function (req, res) {
    'use strict';
    teamData.get(req.params.team + "." + req.params.year, function (err, storedRequest) {
        if (err) {
            console.log("No stored team data for " + req.params.year + ":" + req.params.team);
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token
                })
                .end(function (response) {
                console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    teamData.put(req.params.team + "." + req.params.year, JSON.stringify(response));
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {

            console.log("Reading stored team data for " + req.params.year + ":" + req.params.team + " from FIRST");
            unirest.get('https://frc-api.firstinspires.org/v2.0/' + req.params.year + '/teams/?teamNumber=' + req.params.team)
                .headers({
                    'Authorization': token.token,
                    'If-Modified-Since': JSON.parse(storedRequest).headers["date"]
                })
                .end(function (response) {
                console.log("Response code:"+response.statusCode+"<br>"+JSON.stringify(response.headers));
                    if (response.statusCode === 304) {
                        console.log("Stored team data are current. Sending  stored team data for " + req.params.year + ":" + req.params.team);
                        res.writeHead(200, {
                            'Content-type': 'text/html'
                        });
                        res.end(JSON.stringify(JSON.parse(storedRequest).body), 'utf-8');
                    } else {
                        console.log("Stored team data are stale. Saving result and sending new team data for " + req.params.year + ":" + req.params.team);
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



router.route('/:year/registrations/:event/').get(function (req, res) {
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



router.route('/:year/teams/:eventCode/:page').get(function (req, res) {
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
    //            if (req.params.year < 2017) {
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
    unirest.get('https://www.thebluealliance.com/api/v2/event/'+req.params.eventCode + '/teams')
        .headers({
            'X-TBA-App-Id': tbatoken.header
        })
        .end(function (response) {
            var offseasonteams = response.body;
            var result = [];
            var output = {};
            offseasonteams.sort(function(a,b) {return parseInt(a.team_number)-parseInt(b.team_number);});
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
    unirest.get('https://www.thebluealliance.com/api/v3/event/'+req.params.eventCode + '/teams')
        .headers({
            'X-TBA-App-Id': tbatoken.header,
            'X-TBA-Auth-Key' : tbatoken.token
        })
        .end(function (response) {
            var offseasonteams = response.body;
            var result = [];
            var output = {};
            offseasonteams.sort(function(a,b) {return parseInt(a.team_number)-parseInt(b.team_number);});
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


router.route('/:year/rankings/:eventCode/').get(function (req, res) {
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
    //            if (req.params.year < 2017) {
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

router.route('/:year/awards/:teamNumber/').get(function (req, res) {
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
                    if (req.params.year < 2017) {
                        teamAwards.put(req.params.teamNumber + ":" + req.params.year, JSON.stringify(response));
                    }
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(JSON.stringify(response.body), 'utf-8');
                });
        } else {
            if (req.params.year < 2017) {
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

app.get('/scripts.js', function (req, res) {
    'use strict';
    sendFile(res, 'scripts.js', 'text/js');
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

app.get('/fonts/:filename', function (req, res) {
    'use strict';
    sendFile(res, './fonts/' + req.params.filename);
});