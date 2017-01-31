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
    getHybridSchedule();
    getTeamList();
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

    //resize the window
    scaleRows();
}

function getHybridSchedule() {
    "use strict";
    $("#scheduleUpdateContainer").html("Loading schedule data...");
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
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
            }
            localStorage.qualsList = JSON.stringify(data);
            document.getElementById('announceBanner').style.display = 'none';
            document.getElementById('announceDisplay').style.display = 'block';
            document.getElementById('playByPlayBanner').style.display = 'none';
            document.getElementById('playByPlayDisplay').style.display = 'block';

            announceDisplay();
            $("#scheduleUpdateContainer").html(Date() + "and looking for Playoff schedule...");

        }
        req1.send();
    });
    var req1 = new XMLHttpRequest();
    req1.open('GET', '/api/' + year.options[year.selectedIndex].value + '/schedule/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code + '/playoff');
    req1.addEventListener('load', function () {
        $("#playoffScheduleAlert").css("display","block");
        var data = JSON.parse(req1.responseText);
        if (data.Schedule.length === 0) {
            document.getElementById('scheduleContainer').innerHTML += '<p><b>No playoff matches have been scheduled for this event.</b></p>';
            localStorage.playoffList = null;
        } else {
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
            }
            $("#playoffScheduleAlert").css("display","none");
        }
        if (matchSchedule) {
            document.getElementById('scheduleTable').innerHTML += matchSchedule;
        }
        document.getElementById('scheduleProgressBar').style.display = 'none';
        localStorage.playoffList = JSON.stringify(data);
        $("#scheduleUpdateContainer").html(Date());
    });
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
            document.getElementById('teamsContainer').innerHTML = '<div class="" style="display:table;"><table id="teamsTable" class="table table-responsive table-bordered table-striped"></table></div>';
            teamList += '<thead class="thead-default"><tr><td><b>Number</b></td><td><b>Short Name</b></td><td><b>City</b></td><td><b>Sponsors</b></td><td><b>Organization</b></td><td><b>Rookie Year</b></td><td><b>Robot name</b></td></tr></thead><tbody>';
            for (var i = 0; i < data.teams.length; i++) {
                var element = data.teams[i];
                teamList += generateTeamTableRow(element);
            }
            document.getElementById('teamsTable').innerHTML = teamList + "</tbody>";
            // Notice that even though we're only doing this once, this will create TWO <tbody> tags. That's because when
            // you call .innerHTML, it's auto-completing the tags for you.
        }
        document.getElementById('teamProgressBar').style.display = 'none';
        localStorage.teamList = JSON.stringify(data);
        $("#teamUpdateContainer").html(Date());
    });
    req2.send();

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

function scaleRows() {
    "use strict";
    var height = window.innerHeight;
    var width = window.innerWidth - 30;
    var col2width = width / 6;
    var col3width = width / 4;
    var col4width = width / 3;
    var col5width = width / 12 * 5;
    var col6width = width / 2;
    var announceHeight = Math.round((height - $("#navbar").outerHeight() - $("#appTab").outerHeight() - $("#gameButtonsAnnounce").outerHeight() - $("#footer").outerHeight() - $("#announceTableHeader").outerHeight()) / 6 - 2);
    var playByPlayHeight = Math.round((height - $("#navbar").outerHeight() - $("#appTab").outerHeight() - $("#gameButtonsPlayByPlay").outerHeight() - $("#footer").outerHeight() - $("#announceTableHeader").outerHeight()) / 3 - 4);
    $(".redAlliancePlayByPlay,.blueAlliancePlayByPlay").css("height", playByPlayHeight + "px");
    $(".redAlliance,.blueAlliance").css("height", announceHeight + "px");
    $(".col2").css("width", col2width + "px");
    $(".col3").css("width", col3width + "px");
    $(".col4").css("width", col4width + "px");
    $(".col5").css("width", col5width + "px");
    $(".col6").css("width", col6width + "px");
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
    $("#matchNameAnnounce").html("<b>" + currentMatchData.description + "</b>");
    $("#matchName").html("<b>" + currentMatchData.description + "</b>");
    $("#matchNamePlayByPlay").html("<b>" + currentMatchData.description + "</b>");

    for (var ii = 0; ii < 6; ii++) {
        var teamData = JSON.parse(localStorage['teamData' + currentMatchData.Teams[ii].teamNumber]);
        $('#' + stationList[ii] + 'TeamNumber').html("<b>" + currentMatchData.Teams[ii].teamNumber + "</b>");
        $('#' + stationList[ii] + 'RookieYear').html(rookieYearDisplay(teamData.rookieYear));
        $("#" + stationList[ii] + "TeamName").html(teamData.nameShort);
        $("#" + stationList[ii] + "CityState").html(teamData.cityState);
        $("#" + stationList[ii] + "RobotName").html(teamData.robotName);
        $("#" + stationList[ii] + "Organization").html(teamData.organization);
        $("#" + stationList[ii] + "Sponsors").html(teamData.sponsors);
        $("#" + stationList[ii] + "Rank").html(teamData.rank);
        $("#" + stationList[ii] + "Awards").html(teamData.awards);
        rankHighlight(stationList[ii] + "Rank", teamData.rank);

        $('#' + stationList[ii] + 'PlaybyPlayteamNumber').html(currentMatchData.Teams[ii].teamNumber);
        $('#' + stationList[ii] + 'PlaybyPlayTeamName').html(teamData.nameShort);
        $('#' + stationList[ii] + 'PlaybyPlayRobotName').html(teamData.robotName);

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
    var year = document.getElementById('yearPicker').options[document.getElementById('yearPicker').selectedIndex].value;
    var robotName = "";
    var returnData = '<tr><td>';
    var teamInfo = "";
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

    returnData += teamData.teamNumber + '</td><td>';
    returnData += teamData.nameShort + '</td><td>';
    returnData += teamData.city + ", " + teamData.stateProv + '</td><td>';
    returnData += teamData.nameFull + '</td><td>';
    returnData += teamData.nameShort + '</td><td>'; //replace with organization function.
    returnData += rookieYearDisplay(teamData.rookieYear) + '</td><td>';
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
        "sponsors": sponsors,
        "topSponsors": topSponsors,
        "organization": organization,
        "rookieYear": teamData.rookieYear,
        "robotName": teamData.robotName
    };
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
        document.getElementById(station).style.color = "";
        document.getElementById(station).style.backgroundColor = "yellow";
    } else if (rank === 1) {
        document.getElementById(station).style.color = "white";
        document.getElementById(station).style.backgroundColor = "orange";

    } else {
        document.getElementById(station).style.color = "";
        document.getElementById(station).style.backgroundColor = "";
    }

}

function setMatch(elem) {
    "use strict";
    localStorage.currentMatch = elem.innerHTML;
    announceDisplay();
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
