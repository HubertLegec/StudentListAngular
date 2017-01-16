var GroupService = function ($http) {
    this.getGroups = function () {
        var promise = $http.get('Group/Groups').success(function (data) {
            return data;
        })
        return promise;
    }
}

GroupService.$inject = ['$http'];