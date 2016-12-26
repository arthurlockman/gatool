window.onload = function() {
    loadEventsList()
    document.getElementById('yearPicker').onchange = function() {
        var e = document.getElementById('yearPicker')
        console.log(e.options[e.selectedIndex].value)
        loadEventsList()
    }
}


function loadEventsList() {
    var e = document.getElementById('yearPicker')
    var req = new XMLHttpRequest()
    req.open('GET', '/api/' + e.options[e.selectedIndex].value + '/events')
    req.addEventListener('load', function() {
        document.getElementById('textArea').innerHTML = req.responseText
    })
    req.send()
}