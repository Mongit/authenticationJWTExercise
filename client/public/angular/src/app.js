(function() {
    var app = angular.module('app', ['ngRoute']);
    
    app.config(["$routeProvider", "httpProvider", function($router, $httpProvider) {
        
        $httpProvider.interceptors.push('httpInterceptor');
       
        $router.when("/", {templateUrl: "angular/views/index.html"})
        .when("/login", {templateUrl: "angular/views/login.html"})
        
        .otherwise({ redirectTo: "/"});
    }]);
})();