app.controller('mainController', function($scope) {
    $scope.message = 'Main Controller';
});

app.controller('dashboardController', function($scope, $location, toastr, postProvider) {
    $scope.posts = [];
    $scope.getPosts = function() {
        postProvider.getPosts().then((response) => {
            $scope.posts = response.data;
        }).catch((error) => {
            toastr.error(error.statusText);
        });
    }
    $scope.postDetail = function(id) {
        $location.path('/posts/'+id);
    }
})

app.controller('postsController', function($scope, toastr, postProvider) {
    $scope.posts = [];
    $scope.getPosts = function() {
        postProvider.getPosts().then((response) => {
            $scope.posts = response.data;
        }).catch((error) => {
            toastr.error(error.statusText);
        });
    }
});

app.controller('postDetailController', function($scope, $routeParams, toastr, postProvider) {
    $scope.post = {}    
    var id = $routeParams.id;
    $scope.getPostDetail = function() {
        postProvider.getPost(id).then((response) => {
            $scope.post = response.data;
        }).catch((error) => {
            toastr.error(error.statusText);
        })
    }
});


app.controller('createPostController', function($scope, $location, toastr, postProvider) {
    $scope.tags = [
        {isSelected: false, name: 'Python'},
        {isSelected: false, name: 'Django'},
        {isSelected: false, name: 'Javascript'}
    ]

    $scope.post = {tags: []}

    $scope.addTag = function(index) {
        $scope.tags[index].isSelected ? $scope.tags[index].isSelected = false: $scope.tags[index].isSelected = true;
    }

    $scope.savePost = function() {
        $scope.tags.forEach(d => {
            if(d.isSelected) 
                $scope.post.tags.push(d.name);
        });
        postProvider.createPost(JSON.stringify($scope.post))
        .then((response) => {
            console.log(response.data);
            $location.path('/dashboard')
        }).catch((error) => {
            toastr.error(error.statusText);
        })
    }
    
});


app.controller('editPostController', function($scope, $routeParams, $location, toastr, postProvider) {
    var id = $routeParams.id;
    $scope.post = {}    
    $scope.getPostDetail = function() {
        postProvider.getPost(id)
        .then((response) => {
            $scope.post = response.data;                
        }).catch((error) => {
            toastr.error(error.statusText);
        })
    }
    $scope.updatePost = function() {        
        postProvider.updatePost(id, JSON.stringify($scope.post))
        .then((response) => {
            console.log(response.data);
            $location.path('/dashboard')
        }).catch((error) => {
            toastr.error(error.statusText);
        })
    }
});


app.controller('deletePostController', function($scope, $routeParams, $location, toastr, postProvider) {
    var id = $routeParams.id;
    $scope.post = {}    
    $scope.getPostDetail = function() {
        postProvider.getPost(id)
            .then((response) => {
                $scope.post = response.data;                
            }).catch((error) => {
                toastr.error(error.statusText);
            })
    }
    $scope.deletePost = function() {        
        postProvider.deletePost(id)
        .then((response) => {
            $location.path('/dashboard');
        }).catch((error) => {
            toastr.error(error.statusText);
        })
    }
    $scope.cancelDelete = function() {
        $location.path('/dashboard');
    }
});

app.factory('postProvider', function($http) {
    var baseUrl = '/posts/'
    var postProvider = {};

    postProvider.getPosts = function() {
        return $http.get(baseUrl);
    }
    postProvider.getPost = function(id) {
        return $http.get(baseUrl + id);
    }
    postProvider.createPost = function(post) {
        return $http.post(baseUrl, post);
    }
    postProvider.updatePost = function(id, post) {
        return $http.patch(baseUrl + id, post);
    }
    postProvider.deletePost = function(id) {
        return $http.delete(baseUrl + id);
    }
    return postProvider;
})