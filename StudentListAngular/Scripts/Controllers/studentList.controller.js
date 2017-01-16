var StudentListController = function ($scope) {
    $scope.students = [];
    $scope.groups = [];
    $scope.selectedStudent = {
        group: {}
    };
    $scope.filterCity = undefined;
    $scope.filterGroup = undefined;

    $scope.onClearClick = function () {

    };

    $scope.onFilterClick = function () {

    };

    $scope.onNewClick = function () {

    }

    $scope.onEditClick = function () {

    }

    $scope.onDeleteClick = function () {

    }
};

StudentListController.$inject = ['$scope'];