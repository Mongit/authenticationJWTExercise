(function() {
    var app = angular.module('app');
    
    app.factory("tokenStorage", ["$window", function($window) {
        return {
            getToken: function() {
                var json = $window.localStorage.getItem('token');
                if(json) return JSON.parse(json);
                
                return undefined;
            },
            
            setToken: function(data) {
                $window.localStorage.setItem('token', JSON.stringify(data));
            },
            
            clearToken: function() {
                $window.localStorage.setItem('token', '');
            },
            
            getAccessHeader: function() {
                var that = this;
                var token = that.getToken();
                if(token) {
                    return token.token;
                }
                return '';
            }
            
        };
    }]);
})();