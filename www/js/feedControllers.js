angular.module('starter.feedController', [])
        .controller(
                'FeedCtrl',
                ['$scope', '$firebaseArray', '$state', 'signinService', 'userService',
                    function ($scope, $firebaseArray, $state, signinService, userService)
                    {
                        console.log('FeedCtrl');
                        var uuid = userService.getUserID();
                        var currentDatetime = new Date().getTime();
                        var prevDatetime = currentDatetime - 7 * 24 * 3600000;
                        var ref = firebase.database().ref('feedData').child(uuid)
                                .orderByChild('datetimestamp')
                                .startAt(prevDatetime)
                                .endAt(currentDatetime);
                        console.log(uuid);

                        console.log(ref);
                        var feedHistory = {
                            date: ''
                        };
                        var feed = {
                            activity: 'feed',
                            type: '',
                            datetime: '',
                            unit: '',
                            amount: '',
                            note: ''
                        };
                        var feedingLog = [];
                        var feedingLogToday = [];

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
                            var options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
                            dataObject.forEach(function (entry) {
                                var data = {
                                    type: entry.type,
                                    //datetime: new Date(entry.datetimestamp).toLocaleString('en-US', options),
                                    datetime: new Date(entry.datetimestamp),
                                    date: new Date(entry.datetimestamp).setHours(0, 0, 0, 0),
                                    time: new Date(entry.datetimestamp).setDate(0),
                                    unit: entry.unit,
                                    amount: entry.amount
                                };
                                console.log(data);
                                if (new Date().setHours(0, 0, 0, 0) == new Date(entry.datetimestamp).setHours(0, 0, 0, 0))
                                    feedingLogToday.push(data);
                                feedingLog.push(data);

                            });
                        }
                        function showFeedHistory() {
                            console.log('feedhistory date');
                            console.log($scope.feedHistory.date);
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
                                    $scope.feedingLogToday = feedingLogToday;
                                    $scope.validateData = validateData;
                                    $scope.inputFormSubmitted = false;
                                    $scope.feed.datetime = new Date();
                                    $scope.feedHistory = feedHistory;
                                    $scope.showFeedHistory = showFeedHistory;
                                    console.log($scope);

                                })
                                .catch(function (error) {
                                    console.log('Error:', error);
                                });
                        console.log($scope);
                    }]);