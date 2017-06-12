angular.module('rosterCtrl',[])
  .controller('rosterCtrl', function($scope, $state, $http) {
    $scope.tasks = [];

    var getQueryDate = function(){
      var today = new Date();
      var mm = today.getMonth();
      var yy = today.getFullYear().toString().substr(-2)

      startDate = '01'+getMonthLetter(mm)+yy;
      if(mm !== 11){
        endDate = '30'+getMonthLetter(mm + 1)+yy;
      } else {
        var newYear = parseInt(yy) + 1;
        endDate = '30'+getMonthLetter(0)+newYear;
      }

      return {'startDate':startDate, 'endDate': endDate};
    }


    function getMonthLetter(m) {
      switch (m) {
        case 0:
          return 'JAN';
          break;
        case 1:
          return 'FEB';
          break;
        case 2:
          return 'MAR';
          break;
        case 3:
          return 'APR';
          break;
        case 4:
          return 'MAY';
          break;
        case 5:
          return 'JUN';
          break;
        case 6:
          return 'JUL';
          break;
        case 7:
          return 'AUG';
          break;
        case 8:
          return 'SEP';
          break;
        case 9:
          return 'OCT';
          break;
        case 10:
          return 'NOV';
          break;
        case 11:
          return 'DEC';
          break;
      }
    }
    var act = function() {
      var request = {
        method: "post",
        url: "/api/cia/notificationAcknowledge.do",
        // url: "http://cia.airchina.com.cn/cia/notificationAcknowledge.do",

        data: {
        }
      };
      var tempStorage = window.sessionStorage;
      $http(request).then(function (response){
        console.log(response.status);
        //console.log(response.headers.cookie);
        //console.log(response.data);
      })
        .catch(function(response) {
          console.error('Gists error', response.status, response.data);
        });
    }

    var init = function() {
      var queryDate = getQueryDate();
      var request = {
        method: "post",
        // url: "http://cia.airchina.com.cn/cia/rosterReport.do",
        url: "/api/cia/rosterReport.do",
        data: {
          rqstFrom: queryDate.startDate,
          rqstTo: queryDate.endDate
        }
      };
      var tempStorage = window.sessionStorage;
      $http(request).then(function (response){
        var parser = new DOMParser()
        var doc = parser.parseFromString(response.data, "text/html");
        var i = 0;
        while(doc.getElementById(String(i)) != null){
          i++;
          var task = {};
          task['startDate'] = doc.getElementById(i + '_0').textContent;
          task['Day'] = doc.getElementById(i + '_1').textContent;
          task['FltNum'] = doc.getElementById(i + '_2').textContent;
          task['Sector'] = doc.getElementById(i + '_3').textContent;
          task['AC'] = doc.getElementById(i + '_4').textContent;
          task['Duty'] = doc.getElementById(i + '_5').textContent;
          task['Rpt'] = doc.getElementById(i + '_8').textContent;
          task['STD'] = doc.getElementById(i + '_9').textContent;
          task['STA'] = doc.getElementById(i + '_10').textContent;
          task['FltTime'] = doc.getElementById(i + '_11').textContent;
          task['DutyTime'] = doc.getElementById(i + '_12').textContent;
          task['Hotel'] = doc.getElementById(i + '_13').textContent;
          $scope.tasks.push(task);
        }

      })
        .catch(function(response) {
          //console.error('Gists error', response.status, response.data);
        });
    }

    function showDetail(){
      console.log("shown");
    }

    act();
    init();
  });

