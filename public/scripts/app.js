var app = angular.module('blogApp', ["ngRoute", "toastr"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./../views/home.html",
        controller  : 'mainController'
    })
    .when("/dashboard", {
        templateUrl : "./../views/dashboard.html",
        controller  : 'dashboardController'
    })
    .when("/posts", {
        templateUrl : "./../views/posts.html",
        controller  : 'postsController'
    })
    .when("/posts/:id", {
        templateUrl : "./../views/post-detail.html",
        controller  : 'postDetailController'
    })
    .when("/createPost", {
        templateUrl : "./../views/create-post.html",
        controller  : 'createPostController'
    })
    .when("/editPost/:id", {
        templateUrl : "./../views/edit-post.html",
        controller  : 'editPostController'
    })
    .when("/deletePost/:id", {
        templateUrl : "./../views/delete-post.html",
        controller  : 'deletePostController'
    })
    .otherwise({
        redirectTo: "/"
    });
});

app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,    
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      target: 'body'
    });
  });


app.filter('objToDate', function() {
    return function(id) {
        if(id) {
            return new Date(parseInt(id.substring(0,8), 16) * 1000).toDateString().slice(4);
        } else {
            return ''
        }        
    };
});