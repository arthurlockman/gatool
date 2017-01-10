/*global moment */

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js', function () {});

localStorage.currentMatch = 1;

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

    document.getElementById('setupTabPicker').click();

};


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
    getHybridSchedule();
    getTeamList();
}

function loadEventsList() {
    "use strict";
    var e = document.getElementById('yearPicker');
    var req = new XMLHttpRequest();
    req.open('GET', '/api/' + e.options[e.selectedIndex].value + '/events');
    req.addEventListener('load', function () {
        var tmp = JSON.parse(req.responseText).Events;
        var options = [];
        for (var i = 0; i < tmp.length; i++) {
            var _option = {
                text: tmp[i].name,
                value: tmp[i]
            };
            options.push(_option);
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
        handleEventSelection();
    });
    req.send();
}

function openTab(evt, cityName) {
    "use strict";
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function getHybridSchedule() {
    "use strict";
    var matchSchedule = "";
    var year = document.getElementById('yearPicker');
    var eventPicker = document.getElementById('eventSelector');
    var req = new XMLHttpRequest();
    req.open('GET', '/api/' + year.options[year.selectedIndex].value + '/schedule/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code + '/qual');
    req.addEventListener('load', function () {
        var data = JSON.parse(req.responseText);
        if (data.Schedule.length === 0) {
            document.getElementById('scheduleContainer').innerHTML = '<b>No qualification matches have been scheduled for this event.</b>';
            localStorage.qualsList = null;
            localStorage.playoffList = null;
        } else {
            document.getElementById('scheduleContainer').innerHTML = '<div class=""><table id="scheduleTable" class="table table-bordered table-responsive table-striped"></table></div>';
            matchSchedule += '<thead class="thead-default"><tr><td><b>Time</b></td><td><b>Description</b></td><td><b>Match Number</b></td><td><b>Red 1</b></td><td><b>Red 2</b></td><td><b>Red 3</b></td><td><b>Blue 1</b></td><td><b>Blue 2</b></td><td><b>Blue 3</b></td></tr></thead><tbody>';
            //document.getElementById('scheduleTable').innerHTML += '<thead><tr><td><b>Time</b></td><td><b>Description</b></td><td><b>Match Number</b></td><td><b>Red 1</b></td><td><b>Red 2</b></td><td><b>Red 3</b></td><td><b>Red 4</b></td><td><b>Blue 1</b></td><td><b>Blue 2</b></td><td><b>Blue 3</b></td><td><b>Blue 4</b></td></tr></thead>';
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
            }
            localStorage.qualsList = JSON.stringify(data);
            document.getElementById('announceBanner').style.display = 'none';
            document.getElementById('announceDisplay').style.display = 'block';
            announceDisplay();


        }
        req1.send();
    });
    var req1 = new XMLHttpRequest();
    req1.open('GET', '/api/' + year.options[year.selectedIndex].value + '/schedule/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code + '/playoff');
    req1.addEventListener('load', function () {
        var data = JSON.parse(req1.responseText);
        if (data.Schedule.length === 0) {
            document.getElementById('scheduleContainer').innerHTML += '<p><b>No playoff matches have been scheduled for this event.</b></p>';
            localStorage.playoffList = null;
        } else {
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
            }
        }
        if (matchSchedule) {
            document.getElementById('scheduleTable').innerHTML += matchSchedule;
        }
        document.getElementById('scheduleProgressBar').style.display = 'none';
        localStorage.playoffList = JSON.stringify(data);
    });
    req.send();
}

function getTeamList() {
    "use strict";
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
            document.getElementById('teamsContainer').innerHTML = '<div class="" style="display:table;"><table id="teamsTable" class="table table-responsive table-bordered table-striped"></table></div>';
            teamList += '<thead class="thead-default"><tr><td><b>Number</b></td><td><b>Short Name</b></td><td><b>City</b></td><td><b>Sponsors</b></td><td><b>Organization</b></td><td><b>Rookie Year</b></td><td><b>Robot name</b></td></tr></thead><tbody>';
            for (var i = 0; i < data.teams.length; i++) {
                var element = data.teams[i];
                //document.getElementById('teamsTable').innerHTML += generateTeamTableRow(element);
                // ^^Old way, causing repeated <tbody> tags
                // (below) New way, using a string and then appending
                teamList += generateTeamTableRow(element);
            }
            document.getElementById('teamsTable').innerHTML = teamList + "</tbody>";
            // Notice that even though we're only doing this once, this will create TWO <tbody> tags. That's because when
            // you call .innerHTML, it's auto-completing the tags for you.
        }
        document.getElementById('teamProgressBar').style.display = 'none';
        localStorage.teamList = JSON.stringify(data);
        getTeamRanks();
    });
    req2.send();

}

function getNextMatch() {
    "use strict";
    var qualsList = JSON.parse(localStorage.qualsList);
    if (!qualsList) {
        document.getElementById("matchNumber").innerHTML = "No match scheduled.";
    } else {
        localStorage.currentMatch++;
        if (localStorage.currentMatch > qualsList.Schedule.length) {
            localStorage.currentMatch = qualsList.Schedule.length;
        }
        announceDisplay();

    }
}

function getPreviousMatch() {
    "use strict";
    localStorage.currentMatch--;
    if (localStorage.currentMatch < 1) {
        localStorage.currentMatch = 1;

    }
    announceDisplay();
}


function announceDisplay() {
    "use strict";
    var qualsList = JSON.parse(localStorage.qualsList);
    var currentMatch = localStorage.currentMatch - 1;
    var currentMatchData = qualsList.Schedule[currentMatch];
    getTeamRanks();
    document.getElementById("matchNumber").innerHTML = currentMatchData.matchNumber;
    document.getElementById("matchName").innerHTML = currentMatchData.description;
    document.getElementById("red1TeamNumber").innerHTML = currentMatchData.Teams[0].teamNumber;
    document.getElementById("red1TeamName").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[0].teamNumber]).nameShort;
    document.getElementById("red1Rank").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[0].teamNumber]).rank;
    document.getElementById("red1Organization").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[0].teamNumber]).nameFull;
    document.getElementById("red2TeamNumber").innerHTML = currentMatchData.Teams[1].teamNumber;
    document.getElementById("red2TeamName").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[1].teamNumber]).nameShort;
    document.getElementById("red2Organization").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[1].teamNumber]).nameFull;
    document.getElementById("red2Rank").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[1].teamNumber]).rank;
    document.getElementById("red3TeamNumber").innerHTML = currentMatchData.Teams[2].teamNumber;
    document.getElementById("red3TeamName").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[2].teamNumber]).nameShort;
    document.getElementById("red3Organization").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[2].teamNumber]).nameFull;
    document.getElementById("red3Rank").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[2].teamNumber]).rank;
    document.getElementById("blue1TeamNumber").innerHTML = currentMatchData.Teams[3].teamNumber;
    document.getElementById("blue1TeamName").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[3].teamNumber]).nameShort;
    document.getElementById("blue1Organization").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[3].teamNumber]).nameFull;
    document.getElementById("blue1Rank").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[3].teamNumber]).rank;
    document.getElementById("blue2TeamNumber").innerHTML = currentMatchData.Teams[4].teamNumber;
    document.getElementById("blue2TeamName").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[4].teamNumber]).nameShort;
    document.getElementById("blue2Organization").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[4].teamNumber]).nameFull;
    document.getElementById("blue2Rank").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[4].teamNumber]).rank;
    document.getElementById("blue3TeamNumber").innerHTML = currentMatchData.Teams[5].teamNumber;
    document.getElementById("blue3TeamName").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[5].teamNumber]).nameShort;
    document.getElementById("blue3Organization").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[5].teamNumber]).nameFull;
    document.getElementById("blue3Rank").innerHTML = JSON.parse(localStorage['teamData' + currentMatchData.Teams[5].teamNumber]).rank;
}


function getTeamRanks() {
    "use strict";
    var year = document.getElementById('yearPicker');
    var eventPicker = document.getElementById('eventSelector');
    var req3 = new XMLHttpRequest();
    req3.open('GET', '/api/' + year.options[year.selectedIndex].value + '/Rankings/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code);
    req3.addEventListener('load', function () {
        var data = JSON.parse(req3.responseText);
        if (data.Rankings.length === 0) {
            document.getElementById('rankingDisplay').innerHTML = '<b>No Rankings available.</b>';
        } else {
            document.getElementById('rankingDisplay').innerHTML = '<b>Ranking</b>';
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
        }

    });
    req3.send();


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
    var robotName = "";
    var returnData = '<tr><td>';
    var teamInfo = "";
    returnData += teamData.teamNumber + '</td><td>';
    returnData += teamData.nameShort + '</td><td>';
    returnData += teamData.city + ", " + teamData.stateProv + '</td><td>';
    returnData += teamData.nameFull + '</td><td>';
    returnData += teamData.nameShort + '</td><td>'; //replace with organization function.
    returnData += teamData.rookieYear + '</td><td>';
    if (teamData.robotName === null) {
        returnData += "No robot name reported" + '</td>';
    } else {
        returnData += teamData.robotName + '</td>';
        robotName = teamData.robotName;
    }
    teamInfo = {
        "nameShort": teamData.nameShort,
        "cityState": teamData.city + ', ' + teamData.stateProv,
        "nameFull": teamData.nameFull,
        "organization": teamData.nameShort,
        "rookieyear": teamData.rookieYear,
        "robotName": teamData.robotName
    };
    localStorage['teamData' + teamData.teamNumber] = JSON.stringify(teamInfo);
    return returnData + '</tr>';
}
