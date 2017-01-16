var GroupsController = function ($scope, GroupService) {
    $scope.selectedGroup = undefined;
    $scope.groups = [];
};

GroupsController.$inject = ['$scope', 'GroupService'];