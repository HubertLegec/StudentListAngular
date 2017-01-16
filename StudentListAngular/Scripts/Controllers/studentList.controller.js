var StudentListController = function ($scope, StudentService, GroupService) {
    this.students = [];
    $scope.filteredStudents = this.students;
    $scope.groups = [];
    $scope.selectedStudent = {};
    $scope.filterCity = undefined;
    $scope.filterGroup = undefined;
    var controller = this;

    $scope.onClearClick = function () {
        $scope.filterCity = undefined;
        $scope.filterGroup = undefined;
        controller.reloadData();
    };

    $scope.onFilterClick = function () {
        controller.reloadData();
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

    this.reloadData = function () {
        GroupService.getGroups().then(function (data) {
            $scope.groups = data.data;
            if ($scope.filterGroup) {
                $scope.filterGroup = $scope.groups.find(function (g) {
                    return g.IDGroup === $scope.filterGroup.IDGroup;
                });
            }
        });
        StudentService.getStudents().then(function (data) {
            var city = $scope.filterCity;
            var group = $scope.filterGroup;
            $scope.students = data.data.filter(function (st) {
                return (city == undefined || city.length === 0 || st.BirthPlace == undefined || st.BirthPlace.length === 0 || st.BirthPlace.toLowerCase().indexOf(city.toLowerCase()) >= 0)
                    && (group == undefined || st.IDGroup == group.IDGroup);
            });
        });
    }

    this.reloadData();
};

StudentListController.$inject = ['$scope', 'StudentService', 'GroupService'];