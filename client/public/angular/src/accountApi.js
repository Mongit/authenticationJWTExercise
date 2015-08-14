(function() {
    var app = angular.module('app');
    
    app.factory("accountFactory", ['$http', 'errorHandler', 'tokenStorage', function($http, errorHandler, tokenStorage) {
        var Account = function(url) {
            this.url = url;
        };
        
        Account.prototype.login = function(model, success) {
            var api = this;
            $http({
                url: api.url + "login",
                method: "POST",
                data: model
            }).success(function(data) {
                tokenStorage.setToken(data);
                success();
            }).error(errorHandler);
        };
        
        Account.prototype.logout = function(success) {
            var api = this;
            $http({
                url: api.url + "logout",
                method: "POST"
            }).success(function() {
                tokenStorage.clearToken();
                success();
            }).error(errorHandler);
        }
        
        return function(url) {
            return new Account(url);
        }
        
    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.factory("accountApi", ["accountFacotry", function(apiFactory) {
        var account = apiFactory('http://localhost:3001/account');
        return account;
    }]);
})();