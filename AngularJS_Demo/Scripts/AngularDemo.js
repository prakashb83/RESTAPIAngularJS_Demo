// Defining angularjs module
var app = angular.module('demoModule', []);

// Defining angularjs Controller and injecting TrainingsService
app.controller('demoCtrl', function ($scope, $http, TrainingsService) {

    $scope.TrainingsData = null;
    // Fetching records from the factory created at the bottom of the script file
    TrainingsService.GetAllRecords().then(function (d) {
        $scope.TrainingsData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    // Calculate Total of StartDate After Initialization
    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.TrainingsData, function (item) {
            total += item.StartDate;
        })
        return total;
    }

    $scope.Training = {
        Id: '',
        TrainingName: '',
        StartDate: '',
        EndDate: ''
    };

    // Reset Training details
    $scope.clear = function () {
        $scope.Training.Id = '';
        $scope.Training.TrainingName = '';
        $scope.Training.StartDate = '';
        $scope.Training.EndDate = '';
    }

    //Add New Item
    $scope.save = function () {
        if ($scope.Training.TrainingName != "" &&
       $scope.Training.StartDate != "" && $scope.Training.EndDate != "") {
            // Call Http request using $.ajax

            //$.ajax({
            //    type: 'POST',
            //    contentType: 'application/json; charset=utf-8',
            //    data: JSON.stringify($scope.Training),
            //    url: 'api/Training/PostTraining',
            //    success: function (data, status) {
            //        $scope.$apply(function () {
            //            $scope.TrainingsData.push(data);
            //            alert("Training Added Successfully !!!");
            //            $scope.clear();
            //        });
            //    },
            //    error: function (status) { }
            //});

            // or you can call Http request using $http
            $http({
                method: 'POST',
                url: 'api/Training/PostTraining/',
                data: $scope.Training
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.TrainingsData.push(response.data);
                $scope.clear();
                alert("Training Added Successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Edit Training details
    $scope.edit = function (data) {
        $scope.Training = { Id: data.Id, TrainingName: data.TrainingName, StartDate: data.StartDate, EndDate: data.EndDate };
    }

    // Cancel Training details
    $scope.cancel = function () {
        $scope.clear();
    }

    // Update Training details
    $scope.update = function () {
        if ($scope.Training.TrainingName != "" &&
       $scope.Training.StartDate != "" && $scope.Training.EndDate != "") {
            $http({
                method: 'PUT',
                url: 'api/Training/PutTraining/' + $scope.Training.Id,
                data: $scope.Training
            }).then(function successCallback(response) {
                $scope.TrainingsData = response.data;
                $scope.clear();
                alert("Training Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Delete Training details
    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'api/Training/DeleteTraining/' + $scope.TrainingsData[index].Id,
        }).then(function successCallback(response) {
            $scope.TrainingsData.splice(index, 1);
            alert("Training Deleted Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

});

// Here I have created a factory which is a populer way to create and configure services. You may also create the factories in another script file which is best practice.
// You can also write above codes for POST,PUT,DELETE in this factory instead of controller, so that our controller will look clean and exhibits proper Separation of Concern.
app.factory('TrainingsService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('api/Training/GetAllTrainings');
    }
    return fac;
});