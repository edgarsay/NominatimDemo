/*jslint browser */
'use strict';
var data = {};

function _httpGet(theUrl) {
    'use strict';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function show(data) {
    'use strict';
    var listGroup = document.getElementById("results");
    listGroup.innerHTML = '';
    if (data) {
        data.features.forEach(function ({
            properties,
            geometry
        }) {
            var address = properties.display_name.split(','),
                link = '"https://www.openstreetmap.org/#map=14/' +
                    geometry.coordinates.reverse().join('/') + '"';
            listGroup.innerHTML += '' +
                '<a _blank="true" href=' + link +
                ' class="list-group-item list-group-item-action flex-column align-items-start">' +
                '<div class="d-flex w-100 justify-content-center">' +
                '<h5 class="mb-1">' + address.pop() + '</h5>' +
                '</div>' +
                '<small>' + address.toString() + '</small>' +
                '</a>';
        });
    }
    listGroup.style.display = '';
}

function search() {
    'use strict';
    var input = document.querySelector('#q').value,
        http = new XMLHttpRequest(),
        url = 'https://nominatim.openstreetmap.org/search?q=' + input + '&format=geojson';
        url = encodeURI(url);
    http.addEventListener('load', function () {
        data = http.response;
        show(data);
    });
    http.open('GET', url);
    http.responseType = 'json';
    http.send(null);

}
