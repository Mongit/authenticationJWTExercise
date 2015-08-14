(function() {
    var app = angular.module('app');
    
    app.factory("apiFactory", ['$http', '$location', 'errorHandler', function($http, $location, errorHandler) {
        var Api = function(url) {
            this.url = url;
        };
        
        Api.prototype.call = function(success) {
            var api = this;
            $http({
                url: api.url + "date",
                method: "GET"
            }).success(success).error(errorHandler);
        };
        
        return function(url) {
            return new Api(url);
        };
        
    }]);
})();

(function() {
    var app = angular.module("app");
    
    app.factory("api", ['apiFactory', function(apiFactory) {
        var api = apiFactory('http://localhost:3001/api/');
        return api;
    }]);
})();