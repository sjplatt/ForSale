var app = angular.module('Items', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-item', {
            templateUrl: 'partials/item-form.html',
            controller: 'AddItemCtrl'
        })
        .when('/item/:id', {
            templateUrl: 'partials/view-item.html',
            controller: 'ViewItemCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var Items = $resource('/api/items');
        Items.query(function(items) {
            $scope.items = items;
        });
    }
]);
app.controller('AddItemCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.save = function() {
            var Items = $resource('/api/items');
            Items.save($scope.item, function() {
                $location.path('/');
            });
        };
    }
]);
app.controller('ViewItemCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams) {
        var Items = $resource('/api/items/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        Items.get({
            id: $routeParams.id
        }, function(item) {
            $scope.item = item;
        });

        $scope.saveComment = function() {
            $scope.item.comments.push({
                user: "Temp",
                text: $scope.comment.description
            });
            $scope.comment.description = "";
            Items.update($scope.item, function() {});
        };
    }
]);