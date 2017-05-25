var app = angular.module('sandeepKumar', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "partials/_home.html"
        })
        .when("/quora", {
            templateUrl : "partials/quora.html"
        })
        .when("/twitter", {
            templateUrl : "partials/twitter.html"
        })
        .when("/iss", {
            templateUrl : "partials/iss.html"
        })
        .when("/projects", {
            templateUrl : "partials/projects.html"
        })
        .when("/cv", {
            templateUrl : "partials/_home.html"
        });
});

var map, infoWindow;
var res;
var latitude,longitude;

$( document ).ready(function() {
    $.getJSON("https://api.wheretheiss.at/v1/satellites/25544", function (data) {
            $.each(data, function (index, element) {
                res = data;
                latitude = res.latitude;
                longitude = res.longitude;
                console.log("latitude: " + Number(latitude));
                console.log("longitude: " + Number(longitude));
                $('#iss').text("Location of International Space Centre is Latitude: " + latitude + " Longitude " + longitude);
            });
        });
});


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: Number(latitude),
                lng: Number(longitude)
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

