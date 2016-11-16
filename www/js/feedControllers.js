angular.module('starter.feedController', [])
        .controller(
                'FeedCtrl',
                ['$scope', '$firebaseArray', '$state', 'signinService','userService',
                    function ($scope, $firebaseArray, $state, signinService, userService)
                    {
                        console.log('FeedCtrl');
                        var uuid = userService.getUserID();
                        console.log(uuid);
                        var ref = firebase.database().ref('feedData').child(uuid).limitToLast(200);
                        //var todayHistory = firebase.database().ref('feedData').child(uuid) ;
                        console.log(uuid);

                        console.log(ref);
                        var feed = {
                            activity: 'feed',
                            type: '',
                            datetime: '',
                            unit: '',
                            amount: '',
                            note: ''
                        };
                        var feedingLog = [];

                        function getCollection() {
                            return $firebaseArray(ref).$loaded();
                        }

                        function validateData(inputForm) {
                            $scope.inputFormSubmitted = true;
                            if (inputForm.$valid) {
                                $scope.updateTime();
                                $scope.addFeedData();
                            }
                        }

                        // insert feed data in database
                        function addFeedData() {
                            
                            var list = $firebaseArray(ref);
                            list.$add($scope.feed).then(function (ref) {
                                var id = ref.key;
                                if (id)
                                    console.log('Feed data inserted successfully');
                            });
                        }

                        function updateTime() {
                            $scope.feed.datetimestamp = $scope.feed.datetime.getTime();
                        }

                        function arrangeData(dataObject) {
                            var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                            dataObject.forEach(function (entry) {
                                var data = {
                                    type: entry.type,
                                    datetime: new Date(entry.datetimestamp).toLocaleString('en-US', options),
                                    unit: entry.unit,
                                    amount: entry.amount
                                };
                                feedingLog.push(data);
                            });
                        }

                        // get user id 
                        var userId = signinService.signinUser();
                  
                        
                        // if user is not logged in route to login page
                        if (userId === false)
                            $state.go('tab.dash', {reload: true});
                        
                        getCollection()
                                .then(function (data) {
                                    arrangeData(data);
                                    $scope.feedData = data;
                                    $scope.feed = feed;
                                    $scope.addFeedData = addFeedData;
                                    $scope.updateTime = updateTime;
                                    $scope.feedingLog = feedingLog;
                                    $scope.validateData = validateData;
                                    $scope.inputFormSubmitted = false;
                                    $scope.feed.datetime = new Date();
                                    console.log($scope);

                                })
                                .catch(function (error) {
                                    console.log('Error:', error);
                                });
                        console.log($scope);
                    }]);