var eventsData = {}

window.onload = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile')
    }
    loadEventsList()
    document.getElementById('yearPicker').onchange = function() {
        var e = document.getElementById('yearPicker')
        loadEventsList()
    }
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
            var _option = {text: tmp[i].name, value: tmp[i].code}
            options.push(_option)
        }
        var sel = $('#eventSelector')
        sel.empty()
        $.each(options, function(index, option) {
            sel.append($('<option></option>')
            .attr('value', option.value).text(option.text))
        })
        sel.selectpicker('refresh')
    })
    req.send()
}