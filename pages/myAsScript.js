/**
 * Created by sdt14096 on 2017/5/24.
 */
// script.js

// create the module and name it bingoApp

// also include ngRoute for all our routing needs

var bingoApp = angular.module('bingoApp', ['ngRoute']);

// configure our routes

bingoApp.config(function ($routeProvider) {

    $routeProvider
        .when('/logSwitch', {
            templateUrl: 'myTestPage/logSwitch.html',
        })

        // route for the about page
        .when('/logTrace', {
            templateUrl: 'myTestPage/logTrace.html',
        })

        .when('/nodeList', {
            templateUrl: 'myTestPage/nodeList.html',
        })

});

// create the controller and inject Angular's $scope
bingoApp.controller('mainController', function ($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

bingoApp.controller('siteCtrl', function ($scope, $http, $interval) {
    http();

    $("#myButton").on("click", function () {
        http()
    })

    function http() {
        $http({
            method: 'GET',
            url: 'http://123.206.209.23:8080/smallYello/yinmeizi/hostStation.do'
        }).then(function successCallback(response) {
            $scope.datas = response.data.result;
            $scope.resMsgval = response.data.resMsg;
            $scope.resCode1 = response.data.resCode;
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        console.log("render finish")
        $('#nodeListTable').DataTable({
            bRetrieve: true,
            responsive: true
        });
    })
});



bingoApp.controller("logSwitchCtrl", function ($scope, $http) {
    $("#logSwitchButton").on("click", function () {
        console.log("hahaha")
        logSwitch()
    })

    function logSwitch() {
        $http({
            method: 'PUT',
            url: 'http://123.206.209.23:8080/smallYello/yinmeizi/hostStation.do',
            params: $('#logSwitchForm').serialize()
        }).then(function successCallback(response) {
            $scope.datas = response.data.result;
        }, function errorCallback(response) {
            // 请求失败执行代码
            console.log("haha")
        })
    }
});

bingoApp.controller("logTraceCtrl", function ($scope, $http) {
    http();

    $("#logTraceRefreshButton").on("click", function () {
        http()
    })

    $("#newLogTraceButton").on("click",function () {
        console.log("haha")
    })

    function http() {
        $http({
            method: 'GET',
            url: 'http://123.206.209.23:8080/smallYello/yinmeizi/hostStation.do'
        }).then(function successCallback(response) {
            $scope.datas = response.data.result;
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        console.log("render finish")
        $('#logTraceTable').DataTable({
            bRetrieve: true,
            responsive: true
        });
    })
});

//on-finish-render="ngRepeatFinished"  load js after render datas
bingoApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});