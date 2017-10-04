angular.module('gwan')
    .controller('LoginCtrl', function($scope, $auth, toastr, AccountService) {
        var vm = this;
        vm.title = "LoginCtrl";

        vm.login = function() {
            console.log("=========================");
            console.log("login");
            console.log(JSON.stringify(vm.user));
            console.log("=========================");
            $auth.login(vm.user)
                .then(function(response) {
                    toastr.success('You have successfully signed in!');
                    AccountService.setUser(response.data.user);
                    window.location.href = "/bkpadmin";
                })
                .catch(function(error) {
                    console.log('error', error);
                    toastr.error(error.data.message, error.status);
                });
        };

        vm.signup = function() {
            console.log("=========================");
            console.log("signup");
            console.log(JSON.stringify(vm.user));
            console.log("=========================");

            $auth.signup(vm.user)
                .then(function(response) {
                    $auth.setToken(response);
                    //$location.path('/admin');
                    AccountService.setUser(response.data.user);
                    window.location.href = "/login.html";
                    toastr.info('You have successfully created a new account and have been signed-in');
                })
                .catch(function(response) {
                    toastr.error(response.data.message);
                });
        };

    });