var StudentService = function ($http) {
    this.getStudents = function () {
        var promise = $http.get('StudentList/Students').success(function (data) {
            return data;
        })
        return promise;
    }
}

StudentService.$inject = ['$http'];