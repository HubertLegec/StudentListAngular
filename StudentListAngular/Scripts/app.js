

// create the module and name it scotchApp
var studentListApp = angular.module('studentListApp', ['ngRoute']);

// create the controller and inject Angular's $scope
studentListApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/angularViews/Students.html',
        controller: StudentListController
    }).when('/groups', {
        templateUrl: '/angularViews/Groups.html',
        controller: GroupsController
    });
});

studentListApp.controller('StudentListController', StudentListController);

studentListApp.controller('GroupController', GroupsController)