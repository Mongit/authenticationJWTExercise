(function() {
    var app = angular.module('app');
    
    app.controller('InndexController', ['$location', 'api', 'accountApi', 'tokenStorage', function($location, api, accountApi, tokenStorage) {
        
        var model = this;
        model.data = undefined;
        model.username = tokenStorage.getToken().username;
        
        model.callApi = function() {
            api.call(function(date){
                model.data = date;
            });
        };
                                            
        model.logout = function() {
            accountApi.logout(function() {
                $location.path('/login');
            });
        };

    }]);
})();

(function() {
    var app = angular.module('app');
    
    app.controller('LoginController', ['$location', 'accountApi', function($location, accountApi) {
        var model = this;
        model.username = '';
        model.password = '';
        
        model.login = function() {
            accountApi.login({ username: model.username, password: model.password }, function() {
                $location.path('/');
            });
        };
    }]);
})();