/*global moment */

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js', function () {});

localStorage.currentMatch = 1;
localStorage.inPlayoffs = false;
localStorage.Alliances = "";
localStorage.events = "";
localStorage.playoffList = "";
localStorage.qualsList = "";
localStorage.teamList = "";

window.onload = function () {
    "use strict";
    document.getElementById('scheduleProgressBar').style.display = 'none';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
    loadEventsList();
    document.getElementById('yearPicker').onchange = function () {
        loadEventsList();
    };
    document.getElementById('eventSelector').onchange = function () {
        handleEventSelection();
    };
    scaleRows();
    document.getElementById('setupTabPicker').click();

};

window.addEventListener("resize", scaleRows);



function handleEventSelection() {
    "use strict";
    document.getElementById('scheduleProgressBar').style.display = 'block';
    document.getElementById('scheduleContainer').innerHTML = 'Select an Event';
    var e = document.getElementById('eventSelector');
    var data = JSON.parse(e.value);
    var codeText = document.getElementById('eventCodeContainer');
    var locationText = document.getElementById('eventLocationContainer');
    var dateText = document.getElementById('eventDateContainer');
    codeText.innerHTML = data.code;
    locationText.innerHTML = data.venue + " in " + data.city + ", " + data.stateprov + " " + data.country;
    var startDate = moment(data.dateStart, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do');
    var endDate = moment(data.dateEnd, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do, YYYY');
    dateText.innerHTML = startDate + " to " + endDate;
    document.getElementById('announceBanner').style.display = 'block';
    document.getElementById('announceDisplay').style.display = 'none';
    document.getElementById('playByPlayBanner').style.display = 'block';
    document.getElementById('playByPlayDisplay').style.display = 'none';
    $("#eventName").html('<span class="loadingEvent"><b>Loading event...</b></span>');
    getTeamList();
    getHybridSchedule();
}

function loadEventsList() {
    "use strict";
    $("#eventUpdateContainer").html("Loading event data...");
    var e = document.getElementById('yearPicker');
    var req = new XMLHttpRequest();
    req.open('GET', '/api/' + e.options[e.selectedIndex].value + '/events');
    req.addEventListener('load', function () {
        var tmp = JSON.parse(req.responseText).Events;
        var options = [];
        var events = [];
        for (var i = 0; i < tmp.length; i++) {
            var _option = {
                text: tmp[i].name,
                value: tmp[i]
            };
            var _event = {
                [tmp[i].code]: tmp[i].name
            };
            options.push(_option);
            events.push(_event);
        }
        options.sort(function (a, b) {
            if (a.text < b.text) {
                return -1;
            }
            if (a.text > b.text) {
                return 1;
            }
            return 0;
        });
        var sel = $('#eventSelector');
        sel.empty();
        $.each(options, function (index, option) {
            sel.append($('<option></option>')
                .attr('value', JSON.stringify(option.value)).text(option.text));
        });
        sel.selectpicker('refresh');
        localStorage.events = JSON.stringify(events);
        handleEventSelection();
        $("#eventUpdateContainer").html(Date());
    });
    req.send();
}

function openTab(evt, tabID) {
    "use strict";

    // Get all elements with class="tabcontent" and hide them
    $(".tabcontent").css('display', 'none');

    // Get all elements with class="tablinks" and remove the class "active"
    $(".tablinks").removeClass('active');

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabID).style.display = "block";
    $("#" + evt.currentTarget).addClass("active");
    //evt.currentTarget.className += " active";

    //resize the window
    scaleRows();
}

function getHybridSchedule() {
    "use strict";
    // inform the user that something is going to happen
    $("#scheduleUpdateContainer").html("Loading schedule data...");
    var matchSchedule = "";
    var year = document.getElementById('yearPicker');
    var eventPicker = document.getElementById('eventSelector');
    // Set up the API requestfor getting the Qualification and Playoff Schedules. When the Quals are loaded, an attempt is made to get the Playoffs.
    var req = new XMLHttpRequest();
    req.open('GET', '/api/' + year.options[year.selectedIndex].value + '/schedule/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code + '/qual');
    req.addEventListener('load', function () {
        var data = JSON.parse(req.responseText);
        //Ensure that there is a schedule
        if (data.Schedule.length === 0) {
            document.getElementById('scheduleContainer').innerHTML = '<b>No qualification matches have been scheduled for this event.</b>';
            localStorage.qualsList = "";
            localStorage.playoffList = "";
        } else {
            //we have a schedule. Create the table and displau the schedule.
            $("#scheduleContainer").html('<table id="scheduleTable" class="table table-bordered table-responsive table-striped"></table>');
            //document.getElementById('scheduleContainer').innerHTML = '<table id="scheduleTable" class="table table-bordered table-responsive table-striped"></table>';
            matchSchedule += '<thead class="thead-default"><tr><td class="col2"><b>Time</b></td><td  class="col3"><b>Description</b></td><td class="col1"><b>Match Number</b></td><td class="col1"><b>Red 1</b></td><td class="col1"><b>Red 2</b></td><td class="col1"><b>Red 3</b></td><td class="col1"><b>Blue 1</b></td><td class="col1"><b>Blue 2</b></td><td class="col1"><b>Blue 3</b></td></tr></thead><tbody>';
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
            }
            localStorage.qualsList = JSON.stringify(data);
            $("#announceBanner, #playByPlayBanner").css("display", "none");
            $("#announceDisplay, #playByPlayDisplay").css("display", "block");

            //refresh the Game Announce and Play by Play displays and prepare to get the Playoff Schedule.
            announceDisplay();
            $("#scheduleUpdateContainer").html(Date() + "... and looking for Playoff schedule...");

        }
        //fetch the playoff schedule
        req1.send();
    });
    var req1 = new XMLHttpRequest();
    req1.open('GET', '/api/' + year.options[year.selectedIndex].value + '/schedule/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code + '/playoff');
    req1.addEventListener('load', function () {
        $("#playoffScheduleAlert").css("display", "block");
        var data = JSON.parse(req1.responseText);
        if (data.Schedule.length === 0) {
            document.getElementById('scheduleContainer').innerHTML += '<p><b>No playoff matches have been scheduled for this event.</b></p>';
            localStorage.playoffList = "";
        } else {
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
            }
            $("#playoffScheduleAlert").css("display", "none");
            localStorage.inPlayoffs = true;
            getAllianceList();
        }
        if (matchSchedule) {
            document.getElementById('scheduleTable').innerHTML += matchSchedule;
        }
        document.getElementById('scheduleProgressBar').style.display = 'none';
        localStorage.playoffList = JSON.stringify(data);
        $("#scheduleUpdateContainer").html(Date());

    });
    //fetch the Qualification schedule
    req.send();
}

function getTeamList() {
    "use strict";
    $("#teamUpdateContainer").html("Loading team data...");
    var year = document.getElementById('yearPicker');
    var eventPicker = document.getElementById('eventSelector');
    var req2 = new XMLHttpRequest();
    req2.open('GET', '/api/' + year.options[year.selectedIndex].value + '/teams/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code);
    req2.addEventListener('load', function () {
        var data = JSON.parse(req2.responseText);
        if (data.teams.length === 0) {
            document.getElementById('teamsContainer').innerHTML = '<b>No teams have registered for this event.</b>';
            localStorage.teamList = null;
        } else {
            var teamList = "";
            document.getElementById('teamsContainer').innerHTML = '<p>This table is editable. Tap on a team number to change data for a specific team. Edits you make are local to this browser, and they will persist here if you do not clear your browser cache. A future release will sync your changes with the central server. Be patient. </p><table id="teamsTable" class="table table-responsive table-bordered table-striped"></table>';
            teamList += '<thead class="thead-default"><tr><td class="col1"><b>Team #</b></td><td class="col2"><b>Short Name</b></td><td class="col2"><b>City</b></td><td class="col3"><b>Sponsors</b></td><td  class="col2"><b>Organization</b></td><td class="col1"><b>Rookie Year</b></td><td class="col1"><b>Robot name</b></td></tr></thead><tbody>';
            for (var i = 0; i < data.teams.length; i++) {
                var element = data.teams[i];
                teamList += generateTeamTableRow(element);
            }
            document.getElementById('teamsTable').innerHTML = teamList + "</tbody>";
        }
        document.getElementById('teamProgressBar').style.display = 'none';
        localStorage.teamList = JSON.stringify(data);
        $("#teamUpdateContainer").html(Date());
    });
    req2.send();

}


function getAllianceList() {
    "use strict";
    $("#allianceUpdateContainer").html("Loading Alliance data...");
    var year = document.getElementById('yearPicker');
    var eventPicker = document.getElementById('eventSelector');
    var req2 = new XMLHttpRequest();
    req2.open('GET', '/api/' + year.options[year.selectedIndex].value + '/alliances/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code);
    req2.addEventListener('load', function () {
        var data = JSON.parse(req2.responseText);
        if (data.Alliances.length === 0) {
            document.getElementById('allianceUpdateContainer').innerHTML = '<b>No Playoff Alliance data available for this event.</b>';
            localStorage.Alliances = null;
        } else {
            localStorage.Alliances = JSON.stringify(data);
            for (var i = 0; i < data.Alliances.length; i++) {
                var element = data.Alliances[i];
                var team = {};
                if (element.captain !== null) {
                    team = JSON.parse(localStorage["teamData" + element.captain]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Captain";
                    localStorage["teamData" + element.captain] = JSON.stringify(team);
                }
                if (element.round1 !== null) {
                    team = JSON.parse(localStorage["teamData" + element.round1]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Round 1 Selection";
                    localStorage["teamData" + element.round1] = JSON.stringify(team);
                }
                if (element.round2 !== null) {
                    team = JSON.parse(localStorage["teamData" + element.round2]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Round 2 Selection";
                    localStorage["teamData" + element.round2] = JSON.stringify(team);
                }
                if (element.round3 !== null) {
                    team = JSON.parse(localStorage["teamData" + element.round3]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Round 3 Selection";
                    localStorage["teamData" + element.round3] = JSON.stringify(team);
                }
                if (element.backup !== null) {
                    team = JSON.parse(localStorage["teamData" + element.backup]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Backup Robot replacing " + element.backupReplaced;
                    localStorage["teamData" + element.backup] = JSON.stringify(team);
                }
            }
        }
        $("#allianceUpdateContainer").html(Date());
    });
    if (localStorage.inPlayoffs) {
        req2.send();
    }
}

function getNextMatch() {
    "use strict";
    var qualsList = JSON.parse(localStorage.qualsList);
    var playoffList = JSON.parse(localStorage.playoffList);
    if (!qualsList) {
        document.getElementById("matchNumber").innerHTML = "No matches scheduled.";
    } else {
        localStorage.currentMatch++;
        if (localStorage.currentMatch > qualsList.Schedule.length + playoffList.Schedule.length) {
            localStorage.currentMatch = qualsList.Schedule.length + playoffList.Schedule.length;
        }
        getAllianceList();
        announceDisplay();

    }
}

function getPreviousMatch() {
    "use strict";
    localStorage.currentMatch--;
    if (localStorage.currentMatch < 1) {
        localStorage.currentMatch = 1;
    }
    getAllianceList();
    announceDisplay();
}

function scaleRows() {
    "use strict";
    var height = window.innerHeight;
    var width = window.innerWidth - 30;
    var col1width = width / 12;
    var col2width = width / 6;
    var col3width = width / 4;
    var col4width = width / 3;
    var col5width = width / 12 * 5;
    var col6width = width / 2;
    var col9width = width / 4 * 3;
    var col10width = width / 6 * 5;
    var announceHeight = Math.round((height - $("#navbar").outerHeight() - $("#appTab").outerHeight() - $("#gameButtonsAnnounce").outerHeight() - $("#footer").outerHeight() - $("#announceTableHeader").outerHeight()) / 6 - 10);
    var playByPlayHeight = Math.round((height - $("#navbar").outerHeight() - $("#appTab").outerHeight() - $("#gameButtonsPlayByPlay").outerHeight() - $("#footer").outerHeight() - $("#announceTableHeader").outerHeight()) / 3 - 12);
    $(".redAlliancePlayByPlay,.blueAlliancePlayByPlay").css("height", playByPlayHeight + "px");
    $(".redAlliance,.blueAlliance").css("height", announceHeight + "px");
    $(".col1").css("width", col1width + "px");
    $(".col2").css("width", col2width + "px");
    $(".col3").css("width", col3width + "px");
    $(".col4").css("width", col4width + "px");
    $(".col5").css("width", col5width + "px");
    $(".col6").css("width", col6width + "px");
    $(".col9").css("width", col9width + "px");
    $(".col10").css("width", col10width + "px");
}


function announceDisplay() {
    "use strict";
    var qualsList = JSON.parse(localStorage.qualsList);
    var currentMatch = localStorage.currentMatch - 1;
    if (localStorage.currentMatch > qualsList.Schedule.length) {
        currentMatch = localStorage.currentMatch - qualsList.Schedule.length - 1;
        qualsList = JSON.parse(localStorage.playoffList);
    }
    var currentMatchData = qualsList.Schedule[currentMatch];

    var stationList = ["red1", "red2", "red3", "blue1", "blue2", "blue3"];
    getTeamRanks();
    $("#eventName").html("<b>" + JSON.parse(document.getElementById("eventSelector").value).name + "</b>");
    $("#matchNumber").html("<b>" + currentMatchData.matchNumber + "</b>");
    $("#matchNameAnnounce").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
    $("#topMatchNameAnnounce").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
    $("#matchName").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
    $("#matchNamePlayByPlay").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
    $("#topMatchNamePlayByPlay").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");

    for (var ii = 0; ii < 6; ii++) {
        var teamData = JSON.parse(localStorage['teamData' + currentMatchData.Teams[ii].teamNumber]);
        $('#' + stationList[ii] + 'TeamNumber').html("<b>" + currentMatchData.Teams[ii].teamNumber + "</b>");
        $('#' + stationList[ii] + 'RookieYear').html(rookieYearDisplay(teamData.rookieYear));
        if (localStorage.currentMatch > JSON.parse(localStorage.qualsList).Schedule.length) {
            $('#' + stationList[ii] + 'Alliance').html("<br><b>" + teamData.allianceName + "<br>" + teamData.allianceChoice + "<b>");
            $('#' + stationList[ii] + 'PlayByPlayAlliance').html("<p><b>" + teamData.allianceName + "<br>" + teamData.allianceChoice + "<b></p>");
        }
        if (teamData.nameShortLocal === "") {
            $("#" + stationList[ii] + "TeamName").html(teamData.nameShort);
        } else {
            $("#" + stationList[ii] + "TeamName").html(teamData.nameShortLocal);
        }
        if (teamData.cityStateLocal === "") {
            $("#" + stationList[ii] + "CityState").html(teamData.cityState);
        } else {
            $("#" + stationList[ii] + "CityState").html(teamData.cityStateLocal);
        }
        if (teamData.robotNameLocal === "") {
            $("#" + stationList[ii] + "RobotName").html(teamData.robotName);
        } else {
            $("#" + stationList[ii] + "RobotName").html(teamData.robotNameLocal);
        }
        if (teamData.organizationLocal === "") {
            $("#" + stationList[ii] + "Organization").html(teamData.organization);
        } else {
            $("#" + stationList[ii] + "Organization").html(teamData.organizationLocal);
        }
        if (teamData.sponsorsLocal === "") {
            $("#" + stationList[ii] + "Sponsors").html(teamData.sponsors);
        } else {
            $("#" + stationList[ii] + "Sponsors").html(teamData.sponsorsLocal);
        }
        if (teamData.awardsLocal === "") {
            $("#" + stationList[ii] + "Awards").html(teamData.awards);
        } else {
            $("#" + stationList[ii] + "Awards").html(teamData.awardsLocal);
        }
        $("#" + stationList[ii] + "Rank").html(teamData.rank);
        $("#" + stationList[ii] + "WinLossTie").html("<table class='wltTable'><tr><td id='" + stationList[ii] + "PlayByPlayRank' class='wltCol'>Rank<br>" + teamData.rank + "</td><td class='wltCol'>Qual Avg<br>" + teamData.qualAverage + "</td><td class='wltCol'>W-L-T<br>" + teamData.wins + "-" + teamData.losses + "-" + teamData.ties + "</td></tr></table>");
        rankHighlight(stationList[ii] + "PlayByPlayRank", teamData.rank);
        rankHighlight(stationList[ii] + "Rank", teamData.rank);
        $('#' + stationList[ii] + 'PlaybyPlayteamNumber').html(currentMatchData.Teams[ii].teamNumber);
        if (teamData.nameShortLocal === "") {
            $('#' + stationList[ii] + 'PlaybyPlayTeamName').html(teamData.nameShort);
        } else {
            $('#' + stationList[ii] + 'PlaybyPlayTeamName').html(teamData.nameShortLocal);
        }
        if (teamData.robotNameLocal === "") {
            $('#' + stationList[ii] + 'PlaybyPlayRobotName').html(teamData.robotName);
        } else {
            $('#' + stationList[ii] + 'PlaybyPlayRobotName').html(teamData.robotNameLocal);
        }
        if (teamData.cityStateLocal === "") {
            $("#" + stationList[ii] + "PlayByPlayCity").html(teamData.cityState);
        } else {
            $("#" + stationList[ii] + "PlayByPlayCity").html(teamData.cityStateLocal);
        }
        if (teamData.organizationLocal === "") {
            $("#" + stationList[ii] + "PlayByPlayOrganization").html(teamData.organization);
        } else {
            $("#" + stationList[ii] + "PlayByPlayOrganization").html(teamData.organizationLocal);
        }
    }
}


function getTeamRanks() {
    "use strict";
    $("#rankUpdateContainer").html("Loading ranking data...");
    var year = document.getElementById('yearPicker');
    var eventPicker = document.getElementById('eventSelector');
    var req3 = new XMLHttpRequest();
    req3.open('GET', '/api/' + year.options[year.selectedIndex].value + '/Rankings/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code);
    req3.addEventListener('load', function () {
        var data = JSON.parse(req3.responseText);
        if (data.Rankings.length === 0) {
            $("#rankingDisplay").html('<b>No Rankings available.</b>');
        } else {
            if (localStorage.currentMatch > JSON.parse(localStorage.qualsList).Schedule.length) {
                $("#rankingDisplay").html("<b>Seed<b>");
            } else {
                $("#rankingDisplay").html('<b>Ranking</b>');
            }

            //document.getElementById('rankingDisplay').innerHTML = '<b>Ranking</b>';
            for (var i = 0; i < data.Rankings.length; i++) {
                var team = JSON.parse(localStorage['teamData' + data.Rankings[i].teamNumber]);
                team.rank = data.Rankings[i].rank;
                team.sortOrder1 = data.Rankings[i].sortOrder1;
                team.sortOrder2 = data.Rankings[i].sortOrder2;
                team.sortOrder3 = data.Rankings[i].sortOrder3;
                team.sortOrder4 = data.Rankings[i].sortOrder4;
                team.sortOrder5 = data.Rankings[i].sortOrder5;
                team.sortOrder6 = data.Rankings[i].sortOrder6;
                team.wins = data.Rankings[i].wins;
                team.losses = data.Rankings[i].losses;
                team.ties = data.Rankings[i].ties;
                team.qualAverage = data.Rankings[i].qualAverage;
                team.dq = data.Rankings[i].dq;
                team.matchesPlayed = data.Rankings[i].matchesPlayed;
                localStorage['teamData' + data.Rankings[i].teamNumber] = JSON.stringify(team);
            }
            $("#rankUpdateContainer").html(Date());
        }

    });
    req3.send();
}

function getTeamAwards(teamNumber, year) {
    "use strict";
    var eventCodes = JSON.parse(localStorage.events);
    var awards = "";
    var year1 = year - 1;
    var year2 = year - 2;

    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);

    var req = new XMLHttpRequest();
    req.open('GET', '/api/' + year + '/awards/' + teamNumber + "/");
    req.addEventListener('load', function () {
        if (req.responseText.substr(0, 5) !== '"Team') {
            var data = JSON.parse(req.responseText);
            if (data.Awards.length > 0) {

                for (var i = 0; i < data.Awards.length; i++) {
                    awards += year + " " + data.Awards[i].eventCode + ": " + data.Awards[i].name + " | ";
                }
            }
        }
        req1.send();
    });

    var req1 = new XMLHttpRequest();
    req1.open('GET', '/api/' + year1 + '/awards/' + teamNumber + "/");
    req1.addEventListener('load', function () {
        if (req1.responseText.substr(0, 5) !== '"Team') {
            var data = JSON.parse(req1.responseText);
            if (data.Awards.length > 0) {
                for (var i = 0; i < data.Awards.length; i++) {
                    awards += year1 + " " + data.Awards[i].eventCode + ": " + data.Awards[i].name + " | ";
                }
            }
        }
        req2.send();
    });

    var req2 = new XMLHttpRequest();
    req2.open('GET', '/api/' + year2 + '/awards/' + teamNumber + "/");
    req2.addEventListener('load', function () {
        if (req2.responseText.substr(0, 5) !== '"Team') {
            var data = JSON.parse(req2.responseText);
            if (data.Awards.length > 0) {

                for (var i = 0; i < data.Awards.length; i++) {
                    awards += year2 + " " + data.Awards[i].eventCode + ": " + data.Awards[i].name + " | ";
                }
            }
        }
        if (awards.length > 3) {
            awards = awards.substr(0, awards.length - 3);
        }
        teamData.awards = awards;
        localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
    });

    req.send();
}

// UTILITY FUNCTIONS
function syntaxHighlight(json) {
    "use strict";
    if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function generateMatchTableRow(matchData) {
    "use strict";
    var returnData = '<tr><td>';
    returnData += moment(matchData.startTime, 'YYYY-MM-DDTHH:mm:ss').format('ddd hh:mm:ss A') + '</td><td>';
    returnData += matchData.description + '</td><td>';
    returnData += matchData.matchNumber + '</td><td>';
    returnData += getTeamForStation(matchData.Teams, 'Red1').teamNumber + '</td><td>';
    returnData += getTeamForStation(matchData.Teams, 'Red2').teamNumber + '</td><td>';
    returnData += getTeamForStation(matchData.Teams, 'Red3').teamNumber + '</td><td>';
    // returnData += getTeamForStation(matchData.Teams, 'Red4').teamNumber + '</td><td>';
    returnData += getTeamForStation(matchData.Teams, 'Blue1').teamNumber + '</td><td>';
    returnData += getTeamForStation(matchData.Teams, 'Blue2').teamNumber + '</td><td>';
    returnData += getTeamForStation(matchData.Teams, 'Blue3').teamNumber + '</td>';
    //returnData += getTeamForStation(matchData.Teams, 'Blue3').teamNumber + '</td><td>';
    //returnData += getTeamForStation(matchData.Teams, 'Blue4').teamNumber + '</td>';
    return returnData + '</tr>';
}

function getTeamForStation(teamList, station) {
    "use strict";
    for (var j = 0; j < teamList.length; j++) {
        if (teamList[j].station === station) {
            return teamList[j];
        }
    }
    var r = {};
    r.teamNumber = "";
    return r;
}

function generateTeamTableRow(teamData) {
    "use strict";
    var teamInfo = {};
    if (typeof (localStorage['teamData' + teamData.teamNumber]) !== 'undefined') {
        teamInfo = JSON.parse(localStorage['teamData' + teamData.teamNumber]);
    } else {
        teamInfo = {
            "nameShort": teamData.nameShort,
            "cityState": teamData.city + ', ' + teamData.stateProv,
            "nameFull": teamData.nameFull,
            "rookieYear": teamData.rookieYear,
            "robotName": teamData.robotName,
            "organization": "",
            "sponsors": "",
            "topSponsors": "",
            "awards": "",
            "alliance": "",
            "allianceName": "",
            "allianceChoice": "",
            "rank": "",
            "sortOrder1": "",
            "sortOrder2": "",
            "sortOrder3": "",
            "sortOrder4": "",
            "sortOrder5": "",
            "sortOrder6": "",
            "wins": "",
            "losses": "",
            "ties": "",
            "qualAverage": "",
            "dq": "",
            "matchesPlayed": "",
            "nameShortLocal": "",
            "cityStateLocal": "",
            "topSponsorsLocal": "",
            "sponsorsLocal": "",
            "organizationLocal": "",
            "robotNameLocal": "",
            "awardsLocal": ""
        };
    }
    var year = document.getElementById('yearPicker').options[document.getElementById('yearPicker').selectedIndex].value;
    var returnData = "";
    var robotName = "";
    var organization = "";
    var sponsors = "";
    var topSponsors = "";
    var topSponsorsArray = [];
    var sponsorArray = trimArray(teamData.nameFull.split("/"));
    var organizationArray = trimArray(teamData.nameFull.split("/").pop().split("&"));
    if (!sponsorArray && !organizationArray) {
        organization = "No organization in TIMS";
        sponsors = "No sponsors in TIMS";
        topSponsorsArray[0] = sponsors;
    }
    if (sponsorArray.length === 1) {
        sponsors = sponsorArray[0];
        topSponsorsArray[0] = sponsors;
    } else {
        if (organizationArray.length > 1) {
            sponsorArray.pop();
        }
        for (var i = 0; i < sponsorArray.length - 2; i++) {
            sponsors += sponsorArray[i] + ", ";
            topSponsorsArray[i] = sponsorArray[i];
        }
        sponsors += sponsorArray[sponsorArray.length - 1];
        topSponsorsArray[topSponsorsArray.length] = sponsorArray[sponsorArray.length - 1];
    }
    if (organizationArray.length === 1) {
        organization = organizationArray[0];
    } else {
        topSponsorsArray[topSponsorsArray.length] = organizationArray.shift();
        sponsors += ", " + topSponsorsArray[topSponsorsArray.length - 1];
        for (var j = 0; j < organizationArray.length - 2; j++) {
            organization += organizationArray[j] + " & ";
        }
        organization += organizationArray[organizationArray.length - 1];
    }
    topSponsorsArray = topSponsorsArray.slice(0, 5); //take the top 5 sponsors
    if (topSponsorsArray.length === 1) {
        topSponsors = topSponsorsArray[0];
    } else {
        topSponsors = splitArray(topSponsorsArray);
    }

    returnData += '<tr><td class = "btn-default" id="teamTableNumber' + teamData.teamNumber + '" onclick="updateTeamInfo(' + teamData.teamNumber + ')">' + teamData.teamNumber + '</td>';
    if (teamInfo.nameShortLocal === "") {
        returnData += '<td id="teamTableName' + teamData.teamNumber + '">' + teamInfo.nameShort + '</td>';
    } else {
        returnData += '<td id="teamTableName' + teamData.teamNumber + '">' + teamInfo.nameShortLocal + '</td>';
    }
    if (teamInfo.cityStateLocal === "") {
        returnData += '<td id="teamTableCityState' + teamData.teamNumber + '">' + teamData.city + ", " + teamData.stateProv + '</td>';
    } else {
        returnData += '<td id="teamTableCityState' + teamData.teamNumber + '">' + teamInfo.cityStateLocal + '</td>';
    }
    returnData += '<td id="teamTableNameFull' + teamData.teamNumber + '">' + teamData.nameFull + '</td>';
    if (teamInfo.organizationLocal === "") {
        returnData += '<td id="teamTableOrganization' + teamData.teamNumber + '">' + organization + '</td>';
    } else {
        returnData += '<td id="teamTableNameOrganization' + teamData.teamNumber + '">' + teamInfo.organizationLocal + '</td>';
    } //replace with organization function.
    returnData += '<td id="teamTableRookieYear' + teamData.teamNumber + '">' + rookieYearDisplay(teamData.rookieYear) + '</td>';
    if ((teamData.robotName === null) && (teamInfo.robotNameLocal === "")) {
        returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + "No robot name reported" + '</td>';
    } else {
        if (teamInfo.robotNameLocal === "") {
            returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + teamData.robotName + '</td>';
        } else {
            returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + teamInfo.robotNameLocal + '</td>';
        }
        robotName = teamData.robotName;
    }
    teamInfo.sponsors = sponsors;
    teamInfo.topSponsors = topSponsors;
    teamInfo.organization = organization;
    localStorage['teamData' + teamData.teamNumber] = JSON.stringify(teamInfo);
    getTeamAwards(teamData.teamNumber, year);

    return returnData + '</tr>';
}

function trimArray(arr) {
    "use strict";
    for (var i = 0; i <= arr.length - 1; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
}

function rankHighlight(station, rank) {
    "use strict";
    if ((rank < 8) && (rank > 1)) {
        document.getElementById(station).style.color = "white";
        document.getElementById(station).style.backgroundColor = "green";
    } else if ((rank < 11) && (rank > 8)) {
        document.getElementById(station).style.color = "black";
        document.getElementById(station).style.backgroundColor = "yellow";
    } else if (rank === 1) {
        document.getElementById(station).style.color = "white";
        document.getElementById(station).style.backgroundColor = "orange";

    } else {
        document.getElementById(station).style.color = "";
        document.getElementById(station).style.backgroundColor = "";
    }

}

function updateTeamInfo(teamNumber) {
    "use strict";
    localStorage.currentTeam = teamNumber;
    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);
    $("#teamNumberUpdate").html(teamNumber);
    if (teamData.nameShortLocal === "") {
        $("#teamNameUpdate").val(teamData.nameShort);
    } else {
        {
            $("#teamNameUpdate").val(teamData.nameShortLocal);
        }
    }
    if (teamData.cityStateLocal === "") {
        $("#cityStateUpdate").val(teamData.cityState);
    } else {
        $("#cityStateUpdate").val(teamData.cityStateLocal);
    }
    if (teamData.topSponsorsLocal === "") {
        $("#topSponsorsUpdate").val(teamData.topSponsors);
    } else {
        $("#topSponsorsUpdate").val(teamData.topSponsorsLocal);
    }
    if (teamData.sponsorsLocal === "") {
        $("#sponsorsUpdate").val(teamData.sponsors);
    } else {
        $("#sponsorsUpdate").val(teamData.sponsorsLocal);
    }
    if (teamData.organizationLocal === "") {
        $("#organizationUpdate").val(teamData.organization);
    } else {
        $("#organizationUpdate").val(teamData.organizationLocal);
    }
    if (teamData.robotNameLocal === "") {
        $("#robotNameUpdate").val(teamData.robotName);
    } else {
        $("#robotNameUpdate").val(teamData.robotNameLocal);
    }
    if (teamData.awardsLocal === "") {
        $("#awardsUpdate").val(teamData.awards);
    } else {
        $("#awardsUpdate").val(teamData.awardsLocal);
    }
    // Get all elements with class="tabcontent" and hide them
    $(".tabcontent").css('display', 'none');

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById("teamDataEntry").style.display = "block";
}

function updateTeamInfoDone() {
    "use strict";
    var teamNumber = localStorage.currentTeam;
    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);

    if ((teamData.nameShort !== $("#teamNameUpdate").val()) && ($("#teamNameUpdate").val() !== "")) {
        teamData.nameShortLocal = $("#teamNameUpdate").val();
        $("#teamTableName" + teamNumber).html($("#teamNameUpdate").val());
    } else {
        teamData.nameShortLocal = "";
        $("#teamTableName" + teamNumber).html(teamData.nameShort);
    }
    if ((teamData.cityState !== $("#cityStateUpdate").val()) && ($("#cityStateUpdate").val() !== "")) {
        teamData.cityStateLocal = $("#cityStateUpdate").val();
        $("#teamTableCityState" + teamNumber).html($("#cityStateUpdate").val());
    } else {
        teamData.cityStateLocal = "";
        $("#teamTableCityState" + teamNumber).html(teamData.cityState);
    }
    if ((teamData.topSponsors !== $("#topSponsorsUpdate").val()) && ($("#topSponsorsUpdate").val() !== "")) {
        teamData.topSponsorsLocal = $("#topSponsorsUpdate").val();
        $("#teamTableTopSponsors" + teamNumber).html($("#topSponsorsUpdate").val());
    } else {
        teamData.topSponsorsLocal = "";
        $("#teamTableTopSponsors" + teamNumber).html(teamData.topSponsors);
    }
    if ((teamData.sponsors !== $("#sponsorsUpdate").val()) && ($("#sponsorsUpdate").val() !== "")) {
        teamData.sponsorsLocal = $("#sponsorsUpdate").val();
        $("#teamTableSponsors" + teamNumber).html($("#sponsorsUpdate").val());
    } else {
        teamData.sponsorsLocal = "";
        $("#teamTableSponsors" + teamNumber).html(teamData.sponsors);
    }
    if ((teamData.organization !== $("#organizationUpdate").val()) && ($("#organizationUpdate").val() !== "")) {
        teamData.organizationLocal = $("#organizationUpdate").val();
        $("#teamTableOrganization" + teamNumber).html($("#organizationUpdate").val());
    } else {
        teamData.organizationLocal = "";
        $("#teamTableOrganization" + teamNumber).html(teamData.organization);
    }
    if ((teamData.robotName !== $("#robotNameUpdate").val()) && ($("#robotNameUpdate").val() !== "")) {
        teamData.robotNameLocal = $("#robotNameUpdate").val();
        $("#teamTableRobotName" + teamNumber).html($("#robotNameUpdate").val());
    } else {
        teamData.robotNameLocal = "";
        $("#teamTableRobotName" + teamNumber).html(teamData.robotName);
    }
    if ((teamData.awards !== $("#awardsUpdate").val()) && ($("#awardsUpdate").val() !== "")) {
        teamData.awardsLocal = $("#awardsUpdate").val();
        $("#teamTableAwards" + teamNumber).html($("#awardsUpdate").val());
    } else {
        teamData.awardsLocal = "";
        $("#teamTableAwards" + teamNumber).html(teamData.awards);
    }

    localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
    // Get all elements with class="tabcontent" and hide them

    $(".tabcontent").css('display', 'none');

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById("teamdata").style.display = "block";
}

function rookieYearDisplay(year) {
    "use strict";
    var currrentYear = document.getElementById('yearPicker').options[document.getElementById('yearPicker').selectedIndex].value;
    switch (currrentYear - year) {
        case 0:
            return year + " (Rookie Year)";
        case 1:
            return year + " (2nd season)";
        case 2:
            return year + " (3rd season)";
        default:
            return year + " (" + (currrentYear - year) + "th season)";
    }
}

function splitArray(array) {
    "use strict";
    var result = "";
    switch (array.length) {
        case 1:
            result = array[0];
            break;
        case 2:
            result = array[0] + ", " + array[1];
            break;
        case 3:
            result = array[0] + ", " + array[1] + ", " + array[2];
            break;
        case 4:
            result = array[0] + ", " + array[1] + ", " + array[2] + ", " + array[3];
            break;
        case 4:
            result = array[0] + ", " + array[1] + ", " + array[2] + ", " + array[3] + ", " + array[4];
    }
    return result;
}

function resetLocalStorage() {
    "use strict";
    var r = confirm("Are you sure you want to reset the localStorage? There is no undo.");
if (r === true) {
    localStorage.clear();
    alert("LocalStorage cleared. Page will now reload to recover data from the server. Select your event after the page reloads.");
    location.reload();
}
    
}
