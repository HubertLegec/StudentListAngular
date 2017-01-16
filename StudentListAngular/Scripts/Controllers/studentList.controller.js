var StudentListController = function ($scope, StudentService, GroupService) {
    $scope.students = [];
    $scope.groups = [];
    $scope.selectedStudent = {};
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

    $scope.onStudentClick = function (student) {
        if ($scope.selectedStudent.IDStudent  === student.IDStudent) {
            $scope.selectedStudent = {};
        } else {
            $scope.selectedStudent = Object.assign({}, student, { group: $scope.getGroupForStudent(student) });
            console.log('ss', $scope.selectedStudent);
        }
    }

    $scope.getGroupForStudent = function (st) {
        if (st == undefined) {
            return undefined;
        }
        var group = $scope.groups.find(function (g) {
            return g.IDGroup == st.IDGroup;
        });
        return group;
    }

    StudentService.getStudents().then(function (data) {
        $scope.students = data.data;
    });
    GroupService.getGroups().then(function (data) {
        $scope.groups = data.data;
    });
};

StudentListController.$inject = ['$scope', 'StudentService', 'GroupService'];