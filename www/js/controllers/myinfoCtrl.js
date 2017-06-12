angular.module('myinfoCtrl',[])
  .controller('myinfoCtrl', function($scope, $state, $http) {
    $scope.tasks = [];
    $scope.statusInfos = [];
    $scope.flightReport = [];
    var act = function() {
      var request = {
        method: "post",
        url: "/api/cia/notificationAcknowledge.do",
        //url: "http://cia.airchina.com.cn/cia/notificationAcknowledge.do",
        data: {
        }
      };
      var tempStorage = window.sessionStorage;
      $http(request).then(function (response){
        console.log(response.status);

        var parser = new DOMParser()
        var doc = parser.parseFromString(response.data, "text/html");

        var infoList = doc.getElementsByClassName("statusInfo");

        Array.prototype.forEach.call(infoList, function(info) {
          // Do stuff here
          $scope.statusInfos.push(info.textContent);
        });


        $scope.flightReport.push(doc.getElementsByName("latest30DaysActualFlightTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("currentMonthActualFlightTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest90DaysActualFlightTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest1YearActualFlightTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest30DaysActualDutyTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("currentMonthActualDutyTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest90DaysActualDutyTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest1YearActualDutyTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest30DaysDeadHeadTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("currentMonthDeadHeadTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest90DaysDeadHeadTime")[0].value);
        $scope.flightReport.push(doc.getElementsByName("latest1YearDeadHeadTime")[0].value);

      })
        .catch(function(response) {
          console.error('Gists error', response.status, response.data);
        });
    }


    act();
  });

