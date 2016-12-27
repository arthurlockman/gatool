var eventsData = {}

window.onload = function() {
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
}

function handleEventSelection() {
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