(function () {
    'use strict';

    var app = angular.module('app', []);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);

    //Controller
    app.controller('aglController', function ($scope, aglService) {

        aglService.getDataFactory().
            then(function (data) {
                $scope.items = data;
            });
        
        $scope.genderPara = "Male";
        $scope.genderParaF = "Female";
        $scope.petType = "Cat";
        
    });


    //Service
    app.factory('aglService', function ($http,$q) {
        var retriveData = {};
        return{ 
            getDataFactory : function () {
             
                // Service showing 

                $http.get("http://agl-developer-test.azurewebsites.net/people.json")
                .then(function (result) {
                    return result.data;
                },
                function () {
                    console.log("Error occured whille fetching data service");
                    
                });


                // Due to XMLHttpRequest cannot load http://agl-developer-test.azurewebsites.net/people.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:6758' is therefore not allowed access.

                return $q.when([{ "name": "Bob", "gender": "Male", "age": 23, "pets": [{ "name": "Garfield", "type": "Cat" }, { "name": "Fido", "type": "Dog" }] }, { "name": "Jennifer", "gender": "Female", "age": 18, "pets": [{ "name": "Garfield", "type": "Cat" }] }, { "name": "Steve", "gender": "Male", "age": 45, "pets": null }, { "name": "Fred", "gender": "Male", "age": 40, "pets": [{ "name": "Tom", "type": "Cat" }, { "name": "Max", "type": "Cat" }, { "name": "Sam", "type": "Dog" }, { "name": "Jim", "type": "Cat" }] }, { "name": "Samantha", "gender": "Female", "age": 40, "pets": [{ "name": "Tabby", "type": "Cat" }] }, { "name": "Alice", "gender": "Female", "age": 64, "pets": [{ "name": "Simba", "type": "Cat" }, { "name": "Nemo", "type": "Fish" }] }]);
               
        }}
    });


    // Create a filter to sort provided object by Gender Type and Pet Type
    app.filter('objectFilter', function () {

        // Create the return function and set the required parameter name to **input**
        return function (input,genderPara,petType) {

            //Temp array holder
            var out = [];

           
            angular.forEach(input, function (data) {

                if (data.gender == genderPara) {
                    angular.forEach(data.pets, function (pet) {
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