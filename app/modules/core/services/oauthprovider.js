'use strict';

/**
 * @ngdoc service
 * @name core.Services.OauthProvider
 * @description OauthProvider Factory
 */
angular
    .module('core')
    .factory('OauthProvider',
        ['$q', '$http',
        function($q, $http) {
            
            var oauthProvider = {};

            oauthProvider.google = function(clientId, appScope) {
                var deferred = $q.defer();
                if (window.cordova) {
                  var browserRef = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId 
                    + '&redirect_uri=http://fake.com:3000/callback&scope=' + appScope.join(" ") 
                    + '&approval_prompt=force&response_type=code&auth_user=""', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                  browserRef.addEventListener("loadstart", function (event) {
                    if ((event.url).indexOf("http://localhost/callback") === 0) {
                      var callbackResponse = (event.url).split("#")[1];
                      var responseParameters = (callbackResponse).split("&");
                      var parameterMap = [];
                      for (var i = 0; i < responseParameters.length; i++) {
                        parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                      }
                      console.log(parameterMap);
                      if (parameterMap["access_token"] !== undefined && parameterMap["access_token"] !== null) {
                        var promiseResponse = {
                          access_token: parameterMap["access_token"],
                          token_type: parameterMap["token_type"],
                          uid: parameterMap["uid"]
                        };
                        deferred.resolve({ access_token: parameterMap["access_token"], token_type: parameterMap["token_type"], expires_in: parameterMap["expires_in"] });
                      } else {
                        deferred.reject("Problem authenticating");
                      }
                      browserRef.close();
                    }
                  });
                } else {
                  deferred.reject("Cannot authenticate via a web browser");
                }
                return deferred.promise;
            }

            return oauthProvider;
    }]);
