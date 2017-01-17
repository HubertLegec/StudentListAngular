var GroupService = function ($http) {
    this.getGroups = function () {
        var promise = $http.get('Group/Groups').success(function (data) {
            return data;
        })
        return promise;
    };

    this.deleteGroup = function (group, successCallback, errorCallback) {
        $http
            .post('/Group/Delete', group, {})
            .then(successCallback, errorCallback);
    };

    this.addGroup = function (group, successCallback, errorCallback) {
        $http
            .post('/Group/Add', group, {})
            .then(successCallback, errorCallback);
    };

    this.editGroup = function (group, successCallback, errorCallback) {
        $http
           .post('/Group/Edit', group, {})
           .then(successCallback, errorCallback);
    };
}

GroupService.$inject = ['$http'];