"use strict";

function OMundoAgora() {
    var map;
    function initMap() {
        var mapOptions = {
            zoom: 2,
            center: new google.maps.LatLng(28.304381, 10.195313)
        };
        map = new google.maps.Map(document.getElementById('main'), mapOptions);
    }
    this.start = function () {
        google.maps.event.addDomListener(window, 'load', initMap());
        new Disaster(map);
        new Danger(map);
        new Earthquakes(map);
    };
}

function attachEvent(marker, link) {
    google.maps.event.addListener(marker, 'click', function () {
        window.open(encodeURI("http://translate.google.com/translate?sl=en&tl=pt&js=n&prev=_t&hl=en&ie=UTF-8&u=") + link);
    });
}

function initFeed(url, itemEntry, map, ttl, icn, atom) {
    var feed = new google.feeds.Feed(url);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function (result) {
        if (!result.error) {
            var names = [];
            var links = [];
            var titles = [];
            var count = 0;
            var entries = result.xmlDocument.getElementsByTagName(itemEntry);
            if (atom) {
                for (var i = 0; i < entries.length; i++) {
                    names[count] = entries[i].getElementsByTagName('id')[0].firstChild.nodeValue.substr(41).split('#')[0];
                    links[count] = entries[i].getElementsByTagName('id')[0].firstChild.nodeValue;
                    titles[count] = entries[i].getElementsByTagName('title')[0].firstChild.nodeValue;
                    count++;
                }
            } else {
                for (var i = 0; i < entries.length; i++) {
                    names[count] = entries[i].getElementsByTagName('iso3')[0].firstChild.nodeValue;
                    links[count] = entries[i].getElementsByTagName('link')[0].firstChild.nodeValue;
                    titles[count] = entries[i].getElementsByTagName('title')[0].firstChild.nodeValue;
                    count++;
                }
            }
            for (var x = 0; x < names.length; x++) {
                for (var ii = 0; ii < countries.length; ii++) {
                    if (countries[ii].name === names[x] || countries[ii].iso3 === names[x]) {
                        var country = countries[ii];
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(country.lat, country.lng),
                            link: links[x],
                            title: ttl + titles[x],
                            map: map,
                            icon: icn
                        });
                        attachEvent(marker, links[x]);
                    }
                }
            }
        }
    });
}

function Disaster(map) {
    var url = "http://reliefweb.int/disasters/rss.xml";
    google.setOnLoadCallback(initFeed(url, "item", map, "Desastre em: ", "img/disaster.png", false));
}

function Danger(map) {
    var url = "https://www.gov.uk/foreign-travel-advice.atom";
    google.setOnLoadCallback(initFeed(url, "entry", map, "Perigo em: ", "img/danger.png", true));
}

function Earthquakes(map) {
    var script = document.createElement('script');
    script.src = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fearthquake.usgs.gov%2Fearthquakes%2Ffeed%2Fv1.0%2Fsummary%2Fall_hour.atom';
    document.getElementsByTagName('head')[0].appendChild(script);
    window.eqfeed_callback = function (results) {
        for (var i = 0; i < results.features.length; i++) {
            var coords = results.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var markerE = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: getCircle(results.features[i].properties.mag),
                animation: google.maps.Animation.BOUNCE,
                title: 'Terremoto: ' + results.features[i].properties.title
            });
            attachEvent(markerE, results.features[i].properties.url);
        }
    };
    function getCircle(magnitude) {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: 'red',
            fillOpacity: 0.2,
            scale: magnitude * 7,
            strokeColor: 'white',
            strokeWeight: 0.5
        };
        return circle;
    }

}

var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        this.onDeviceReady(); //uncomment for testing in Chrome browser
    },
    onDeviceReady: function () {
        $(function () {
            window.app = new OMundoAgora();
            window.app.start();
        });
    }
};
app.initialize();

