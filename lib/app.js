(function () {
    'use strict';

    var app = angular.module('app', []);

    //Controller
    app.controller('aglController', function ($scope, aglService, $log) {

        // Calling Service
        aglService.getDataFactory().
            success(function (data) {
                $scope.items = data;
            })
        .error(function () {
            $log.warn("Service is failed!")
        });

        $scope.genderMale = "Male";
        $scope.genderFemale = "Female";
        $scope.petType = "Cat";

    });


    //Service
    app.factory('aglService', function ($http, $q) {
        return {
            getDataFactory: function () {

                return $http({
                    method: 'JSONP', // to be used when single json to be fetched without CORS
                    url: 'http://agl-developer-test.azurewebsites.net/people.json?callback=JSON_CALLBACK'
                });

            }
        }
    });


    // Create a filter to sort provided object by Gender Type and Pet Type
    app.filter('objectFilter', function () {

        // Create the return function and set the required parameter name to **input**
        return function (input, genderPara, petType) {

            //Temp array holder
            var out = [];


            angular.forEach(input, function (data) {

                // Checking if gender is equal to provided gender
                if (data.gender == genderPara) {
                    angular.forEach(data.pets, function (pet) {
                        // checking if pet is equal to provided pet
                        if (pet.type == petType) {
                            out.push(pet.name);
                        }
                    })
                }

            })

            return out.sort();
        }

    });

})();