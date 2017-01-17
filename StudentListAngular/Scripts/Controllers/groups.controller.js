var GroupsController = function ($scope, GroupService) {
    $scope.selectedGroup = {};
    $scope.groups = [];
    $scope.error = undefined;
    var controller = this;

    $scope.onGroupClick = function (group) {
        if ($scope.selectedGroup.IDGroup === group.IDGroup) {
            $scope.selectedGroup = {};
        } else {
            $scope.selectedGroup = Object.assign({}, group);
        }
    };

    $scope.onAddClick = function () {
        GroupService.addGroup($scope.selectedGroup, 
            function (response) {
                controller.reloadData();
            }, 
            function (response) {
                $scope.error = response.data.value;
            }
        );
    };

    $scope.onEditClick = function () {
        GroupService.editGroup($scope.selectedGroup,
            function (response) {
                controller.reloadData();
            },
            function (response) {
                $scope.error = response.data.value;
            }
        );
    };

    $scope.onDeleteClick = function () {
        GroupService.deleteGroup($scope.selectedGroup,
            function (response) {
                controller.reloadData();
            },
            function (response) {
                $scope.error = response.data.value;
            }
        );
    };

    this.reloadData = function () {
        GroupService.getGroups().then(function (data) {
            $scope.groups = data.data;
        });
        $scope.error = undefined;
        $scope.selectedGroup = {};
    };

    this.reloadData();
};

GroupsController.$inject = ['$scope', 'GroupService'];