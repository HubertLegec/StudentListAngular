/// <reference path="../dependencies/app.js" />

var getStudentService = function (dataToReturn) {
    var studentService = {};
    studentService.getStudents = function () {
        return {
            then: function (callback) {
                callback({ data: dataToReturn });
            }
        }
    }
    return studentService;
};

var getGroupService = function (dataToReturn) {
    var groupService = {};
    groupService.getGroups = function () {
        return {
            then: function (callback) {
                callback({ data: dataToReturn });
            }
        }
    }
    return groupService;
};

var groups = [
    { IDGroup: 1, Name: 'aa' },
    { IDGroup: 2, Name: 'bb' },
    { IDGroup: 3, Name: 'cc' }
];

var students = [
    { IDStudent: 1, IDGroup: 1, FirstName: 's1', LastName: 's11', IndexNo: '123', BirthPlace: 'Warsaw' },
    { IDStudent: 2, IDGroup: 2, FirstName: 's2', LastName: 's22', IndexNo: '234', BirthPlace: 'Cracow' },
    { IDStudent: 3, IDGroup: 3, FirstName: 's3', LastName: 's33', IndexNo: '345', BirthPlace: 'Warsaw' }
];

describe('Controller: StudentListController', function () {
    var scope, createController;

   beforeEach(module('studentListApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function (students, groups) {
            return $controller('StudentListController', {
                $scope: scope,
                StudentService: getStudentService(students),
                GroupService: getGroupService(groups)
            });
        };
    }));

    it('initialStateTest', function () {
        createController([], []);

        expect(scope.students.length).toBe(0);
        expect(scope.groups.length).toBe(0);
        expect(scope.filterGroups.length).toBe(1);
        expect(scope.totalItems).toBe(0);
        expect(scope.currentPage).toBe(1);
        expect(scope.itemsPerPage).toBe(10);
    });

    it('selectStudentTest', function () {
        createController(students, groups);
        expect(scope.totalItems).toBe(3);
        expect(scope.groups.length).toBe(3);
        expect(scope.selectedStudent.IDStudent).toBe(undefined);

        scope.onStudentClick(students[0]);
        expect(scope.selectedStudent.IDStudent).toBe(1);
        expect(scope.selectedStudent.group.Name).toBe(groups[0].Name);
    });

    it('deselectStudentTest', function () {
        createController(students, groups);
        scope.onStudentClick(students[0]);
        expect(scope.selectedStudent.IDStudent).toBe(1);

        scope.onStudentClick(students[0]);
        expect(scope.selectedStudent.IDStunent).toBe(undefined);
    });

    it('filterWithNoCriteriaTest', function () {
        createController(students, groups);
        scope.onFilterClick();

        expect(scope.students.length).toBe(3);
    });

    it('filterByCityTest', function () {
        createController(students, groups);
        scope.filterCity = 'aRsa';
        scope.onFilterClick();

        expect(scope.students.length).toBe(2);
        expect(scope.students[0].IDStudent).toBe(1);
        expect(scope.students[1].IDStudent).toBe(3);
    });

    it('filterByGroupTest', function () {
        createController(students, groups);
        scope.filterGroup = groups[1];
        scope.onFilterClick();

        expect(scope.students.length).toBe(1);
        expect(scope.students[0].IDStudent).toBe(2);
    })

    it('filterByCityAndGroupTest', function () {
        createController(students, groups);
        scope.filterGroup = groups[1];
        scope.filterCity = 'aRsa';
        scope.onFilterClick();

        expect(scope.students.length).toBe(0);
    });
})