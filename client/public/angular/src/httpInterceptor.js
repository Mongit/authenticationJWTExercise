(function() {
    var app = angular.module("app");
    
    app.factory("httpInterceptor", ['$q', '$location', 'tokenStorage', function($q, $location, tokenStorage) {
        
        var freeAccessPages = ['/login'];
        
        return {
            //optional method
            'request': function(request) {
                //if is not listed in the freeAccessPages array
                if(freeAccessPages.indexOf($location.path()) === -1) {
                    var tokenObj = tokenStorage.getToken();
                    
                    if(tokenObj === undefined)
                        $location.path('/login');
                }
                
                //set 's-access-roken' header
                request.headers['x-access-token'] = tokenStorage.getAccessHeader();
                
                return request;
            },
            
            'requestError': function(rejection) {
                return $q.reject(rejection);
            },
            
            'response': function(response) {
                //do something on success
                return response;
            },
            
            'responseError': function(rejection) {
                if(rejection.status === 401) {
                    $location.path('/login');
                } 
                
                return $q.reject(rejection);
            }
        };
        
    }]);
})();