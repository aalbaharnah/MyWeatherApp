var app = angular.module("MyWeatherApp", []);

app.controller("MyWeatherController", function ($scope, $http) {
    $scope.cityName = '';
    $scope.search = function () {
        $http.get('http://api.apixu.com/v1/current.json?key=852bf53e45aa4d15a8c140018190901&q=' + $scope.cityName).then(function(response){
        console.log(response.data);    
        $scope.cityData = response.data.location.name;
        $scope.cityTemp = response.data.current.temp_c + '°';
        $scope.cityWind = response.data.current.wind_kph +' kph';
        $scope.cityHumidity = response.data.current.humidity + '%';
        $scope.cityIcon = response.data.current.condition.icon;
        $scope.cityCondition = response.data.current.condition.text;
        });
    }

    $scope.findme = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((function(position){
                console.log(position.coords.longitude.toFixed(4) + '    ' + position.coords.latitude.toFixed(4));
                $http.get('http://api.apixu.com/v1/current.json?key=852bf53e45aa4d15a8c140018190901&q='+ position.coords.latitude.toFixed(4) + ',' + position.coords.longitude.toFixed(4)).then(function(some){
                console.log(some.data);
                });
            }));
            console.log("yes")
        } else {
            console.log("geolocation is not supporter by this browser.");
        }
    }
    
    

});
