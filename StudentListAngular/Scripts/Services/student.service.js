var StudentService = function ($http) {
    this.getStudents = function () {
        var promise = $http.get('StudentList/Students').success(function (data) {
            return data;
        })
        return promise;
    };

    this.deleteStudent = function (student, successCallback, errorCallback) {
        $http
            .post('/StudentList/DeleteStudent', student, {})
            .then(successCallback, errorCallback);
    }

    this.addStudent = function (student, successCallback, errorCallback) {
        $http
            .post('/StudentList/AddStudent', student, {})
            .then(successCallback, errorCallback);
    }

    this.editStudent = function (student, successCallback, errorCallback) {
        $http
            .post('/StudentList/EditStudent', student, {})
            .then(successCallback, errorCallback);
    }
}

StudentService.$inject = ['$http'];