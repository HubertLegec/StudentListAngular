

// create the module and name it scotchApp
var app = angular.module('studentListApp', ['ngRoute', 'ui.bootstrap']);

// create the controller and inject Angular's $scope
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/angularViews/Students.html',
        controller: StudentListController
    }).when('/groups', {
        templateUrl: '/angularViews/Groups.html',
        controller: GroupsController
    });
});

app.controller('StudentListController', StudentListController);
app.controller('GroupController', GroupsController);

app.service('StudentService', StudentService);
app.service('GroupService', GroupService);