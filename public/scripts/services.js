app.service('postData', function($http) {
    this.posts = [];
    this.getPosts = function() {
        
    }
    this.getPostDetail = function(id) {
        $http({
            url: '/posts/'+id,
            method: "GET"            
        }).success(function (data, status, headers, config) {
            console.log(status, data);
            this.posts = data;
        }).error(function (data, status, headers, config) {
            console.log(status, data);
        });
    }
})