var StudentListController = function ($scope, StudentService, GroupService) {
    this.students = [];
    $scope.filteredStudents = this.students;
    $scope.groups = [];
    $scope.filterGroups = [];
    $scope.selectedStudent = {};
    $scope.filterCity = undefined;
    $scope.filterGroup = undefined;
    $scope.error = undefined;
    var controller = this;
    var studentList;

    $scope.onClearClick = function () {
        $scope.filterCity = undefined;
        $scope.filterGroup = undefined;
        controller.reloadData();
    };

    $scope.onFilterClick = function () {
        var city = $scope.filterCity;
        var group = $scope.filterGroup;
        $scope.students = controller.filterStudentList(controller.studentList, city, group);
    };

    $scope.onNewClick = function () {
        StudentService.addStudent($scope.selectedStudent, function (response) {
            controller.reloadData();
        }, function (response) {
            $scope.error = response.data.value;
        });
    }

    $scope.onEditClick = function () {
        StudentService.editStudent($scope.selectedStudent, function (response) {
            controller.reloadData();
        }, function (response) {
            $scope.error = response.data.value;
        });
    }

    $scope.onDeleteClick = function () {
        console.log('del click');
        StudentService.deleteStudent($scope.selectedStudent,
            function (response) {
                controller.reloadData();
            },
            function (response) {
                $scope.error = response.data.value;
            });
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
            $scope.filterGroups = data.data;
            $scope.filterGroups.push({Name: ""});
            if ($scope.filterGroup) {
                $scope.filterGroup = $scope.groups.find(function (g) {
                    return g.IDGroup === $scope.filterGroup.IDGroup;
                });
            }
        });
        StudentService.getStudents().then(function (data) {
            var city = $scope.filterCity;
            var group = $scope.filterGroup;
            controller.studentList = data.data;
            $scope.students = controller.filterStudentList(data.data, city, group);
        });
        $scope.error = undefined;
        $scope.selectedStudent = {};
    }

    this.filterStudentList = function(students, city, group) {
        return students.filter(function (st) {
            return (city == undefined || city.length === 0 || st.BirthPlace == undefined || st.BirthPlace.length === 0 || st.BirthPlace.toLowerCase().indexOf(city.toLowerCase()) >= 0)
                && (group == undefined || group.Name.length === 0 || st.IDGroup == group.IDGroup);
        }).map(function (st) { return Object.assign({}, st, {BirthDate: controller.formatDate(st.BirthDate)})});
    }

    this.formatDate = function (jsonDate) {
        if (!date) {
            return;
        }
        var milli = jsonDate.replace(/\/Date\((-?\d+)\)\//, '$1');
        var date = new Date(parseInt(milli));
        return date;
    }

    this.reloadData();
};

StudentListController.$inject = ['$scope', 'StudentService', 'GroupService'];