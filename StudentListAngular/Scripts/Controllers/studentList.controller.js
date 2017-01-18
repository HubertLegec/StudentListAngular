var StudentListController = function ($scope, StudentService, GroupService) {
    $scope.students = [];
    $scope.groups = [];
    $scope.filterGroups = [];
    $scope.selectedStudent = {};
    $scope.filterCity = undefined;
    $scope.filterGroup = undefined;
    $scope.error = undefined;
    $scope.addEnabled = true;
    var controller = this;
    var studentList;
    var indexNo;


    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.onClearClick = function () {
        $scope.filterCity = undefined;
        $scope.filterGroup = undefined;
        controller.reloadData();
    };

    $scope.onFilterClick = function () {
        var city = $scope.filterCity;
        var group = $scope.filterGroup;
        $scope.students = controller.filterStudentList(controller.studentList, city, group, false);
    };

    $scope.onNewClick = function () {
        var stud = $scope.selectedStudent;
        console.log('stud', stud);
        stud.IDGroup = stud.group ? stud.group.IDGroup : undefined;
        StudentService.addStudent(stud, function (response) {
            controller.reloadData();
        }, function (response) {
            $scope.error = response.data.value;
        });
    }

    $scope.onEditClick = function () {
        var stud = $scope.selectedStudent;
        stud.IDGroup = stud.group ? stud.group.IDGroup : undefined;
        StudentService.editStudent(stud, function (response) {
            controller.reloadData();
        }, function (response) {
            $scope.error = response.data.value;
        });
    }

    $scope.onDeleteClick = function () {
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
            $scope.addEnabled = true;
        } else {
            $scope.selectedStudent = Object.assign({}, student, { group: $scope.getGroupForStudent(student) });
            controller.indexNo = $scope.selectedStudent.IndexNo;
            $scope.$watch('selectedStudent.IndexNo', function (newVal, oldVal) {
                $scope.addEnabled = (newVal != controller.indexNo);
            });
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

    $scope.isSame

    this.reloadData = function () {
        GroupService.getGroups().then(function (data) {
            $scope.groups = data.data;
            $scope.filterGroups = data.data.concat([{ Name: "" }]);
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
            $scope.students = controller.filterStudentList(data.data, city, group, true);
            $scope.totalItems = $scope.students.length;
        });
        $scope.error = undefined;
        $scope.selectedStudent = {};
    }

    this.filterStudentList = function(students, city, group, formatDate) {
        var filteredStudents = students.filter(function (st) {
            return (city == undefined || city.length === 0 ||
                (st.BirthPlace == undefined && (city == undefined || city.length === 0)) ||
                (st.BirthPlace != undefined && st.BirthPlace.toLowerCase().indexOf(city.toLowerCase()) >= 0))
                && (group == undefined || group.Name.length === 0 || st.IDGroup == group.IDGroup);
        });
        return formatDate ? filteredStudents.map(function (st) {
            return Object.assign(st, { BirthDate: controller.formatDate(st.BirthDate) })
        }) : filteredStudents;
    }

    this.formatDate = function (jsonDate) {
        if (jsonDate == undefined) {
            return;
        }
        var milli = jsonDate.replace(/\/Date\((-?\d+)\)\//, '$1');
        return new Date(parseInt(milli));
    }

    this.reloadData();
};

StudentListController.$inject = ['$scope', 'StudentService', 'GroupService'];