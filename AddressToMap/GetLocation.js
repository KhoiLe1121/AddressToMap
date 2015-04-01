var getLocationApp = angular.module('getLocationApp', ['ngRoute']);

getLocationApp.controller(
    'locationManager',

['$scope', '$http', function ($scope, $http) {
    $scope.address;
    var geocoder;
    var map;

    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 2,
            center: latlng
        }
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }

    $scope.getLocation = function() {
        geocoder.geocode({ 'address': $scope.address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(8);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }

    initialize();
}]);

