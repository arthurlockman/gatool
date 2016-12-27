var eventsData = {}

window.onload = function() {
    document.getElementById('scheduleProgressBar').style.display = 'none'
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile')
    }
    loadEventsList()
    document.getElementById('yearPicker').onchange = function() {
        loadEventsList()
    }
    document.getElementById('eventSelector').onchange = function() {
        handleEventSelection()
    }
    document.getElementById('scheduleTabPicker').click()
}

function handleEventSelection() {
    document.getElementById('scheduleProgressBar').style.display = 'block'
    var e = document.getElementById('eventSelector')
    var data = JSON.parse(e.value)
    var codeText = document.getElementById('eventCodeContainer')
    var locationText = document.getElementById('eventLocationContainer')
    var dateText = document.getElementById('eventDateContainer')
    codeText.innerHTML = data.code
    locationText.innerHTML = data.venue + " in " + data.city + ", " + data.stateprov + " " + data.country
    var startDate = moment(data.dateStart, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do')
    var endDate = moment(data.dateEnd, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do, YYYY')
    dateText.innerHTML = startDate + " to " + endDate
    getHybridSchedule()
}

function loadEventsList() {
    var e = document.getElementById('yearPicker')
    var req = new XMLHttpRequest()
    req.open('GET', '/api/' + e.options[e.selectedIndex].value + '/events')
    req.addEventListener('load', function() {
        var tmp = JSON.parse(req.responseText).Events
        var options = []
        for (i = 0; i < tmp.length; i++)
        {
            var _option = {text: tmp[i].name, value: tmp[i]}
            options.push(_option)
        }
        options.sort(function(a, b) {
            if (a.text < b.text) { return -1 }
            if (a.text > b.text) { return 1 }
            return 0
        })
        var sel = $('#eventSelector')
        sel.empty()
        $.each(options, function(index, option) {
            sel.append($('<option></option>')
            .attr('value', JSON.stringify(option.value)).text(option.text))
        })
        sel.selectpicker('refresh')
        handleEventSelection()
    })
    req.send()
}

function openTab(evt, cityName) {
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
    var year = document.getElementById('yearPicker')
    var eventPicker = document.getElementById('eventSelector')
    var req = new XMLHttpRequest()
    req.open('GET', '/api/' + year.options[year.selectedIndex].value + '/schedule/' + JSON.parse(eventPicker.options[eventPicker.selectedIndex].value).code + '/qual')
    req.addEventListener('load', function() {
        document.getElementById('schedulejson').innerHTML = syntaxHighlight(JSON.parse(req.responseText))
        document.getElementById('scheduleProgressBar').style.display = 'none'
    })
    req.send()
}


// UTILITY FUNCTIONS
function syntaxHighlight(json) {
    if (typeof json != 'string') {
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