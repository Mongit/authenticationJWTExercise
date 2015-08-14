(function() {
    var app = angular.module("app");
    
    app.factory("errorHandler", ["$window", '$location', function($window, $location) {
        return function(data, status, headers, config, statusText) {
            console.error('%s %s %s', config.method, config.url, status);
        };
        
    }]);
})();