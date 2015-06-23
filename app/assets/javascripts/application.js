// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//


//= require jquery
//= require jquery_ujs
// require turbolinks
// require_tree .


//= require bootstrap/dist/js/bootstrap
//= require moment/moment

//= require angular
//= require angular-bootstrap/ui-bootstrap
//= require angular-bootstrap/ui-bootstrap-tpls

//= require angular-ui-grid/ui-grid
//= require polyfill

//= require report_object
//= require_self


var APIKEY = "AdI7VwjhIVFykmklU56DkJGwHZXA2x725diFJSGB";
var app = angular.module("openfda", ['ui.bootstrap', 'ui.grid']);


app
  // .factory('paramsInjector', [function() {
  //   var paramsInjector = {
  //       request: function(config) {

  //         config.transformRequest.push(function(data, headers){

  //           debugger

  //         })

  //         // config.url = config.url.replace('%5B', '[').replace('%5D', ']');
  //         return config;
  //       }
  //   };
  //   return paramsInjector;
  // }])
  // .config(['$httpProvider', function($httpProvider) {
  //   // $httpProvider.interceptors.push('paramsInjector');

  // // $httpProvider.defaults.transformRequest = function(data) {

  // //   debugger

  // //   var query = '',
  // //     name, value;
  // //   if (data instanceof Object) {

  // //     for (key in data) {

  // //       name = key;
  // //       value = data[key];

  // //       query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';

  // //     }
  // //     return query;
  // //   } else {
  // //     return data;
  // //   }

  // // };

  // }])
  .controller("DashboardCtrl", ['$scope', '$http', '$window', function ($scope, $http, $window) {

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    $scope.safetyReportObject = $window.safetyReportObject;

    $scope.reset = function() {
      $scope.searchOptions = {};
    }



    $scope.options = {
      api_key: $window.APIKEY,
      limit: 10,
      search: '',
      skip: 0,
      count: ''

    }

    $scope.stats = {
      total: 0
    };

    $scope.isText = function(value) {
      return /text|checkbox/.test(value.elType);
    }

    $scope.isDate = function(value) {
      return /date/.test(value.elType);
    }


    $scope.searchOptions = {
      // receivedateFrom: moment().subtract(1, 'year').format('YYYY-MM-DD'),
      // receivedateTo: moment().format('YYYY-MM-DD'),
      // receivedate: null
    }

    $scope.gridOptions = {
      data: [],

      // infiniteScrollRowsFromEnd: 40,
      // infiniteScrollUp: true,
      // infiniteScrollDown: true,
      // columnDefs: [
      //   { name:'id'},
      //   { name:'name' },
      //   { name:'age' }
      // ],
      // data: 'data',
      // onRegisterApi: function(gridApi){
      //   gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getDataDown);
      //   gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getDataUp);
      //   $scope.gridApi = gridApi;
      // }
    }


    function buildDate(from, to) {
      // [20040101+TO+20081231]
      return '[' + from + '+TO+' + to + ']';
    }

    var request = {
      method: 'GET',
      url: 'https://api.fda.gov/drug/event.json',
      // transformRequest: $http.defaults.transformRequest.concat([function(req){
      transformRequest: [function(req, fn){
        debugger
      }].concat($http.defaults.transformRequest),
      // headers: {
      //   'Content-Type': undefined
      // },
      params: {}
    }

    function queryBuilder(options) {

      var passedOptions = [];

      angular.forEach(options, function(value, key) {
        console.log(value, key)
        passedOptions.push(key + ':' + value);
      });
      return passedOptions.join(' AND ').replace(/\s/g, '+')
    }


    $scope.search = function() {

      request.params = $scope.options;
      request.params.search = queryBuilder($scope.searchOptions);


      $http(request)
        .then(function(resp) {
          $scope.stats.total = resp.data.meta.results.total;
          $scope.gridOptions.data = resp.data.results;

        })
    }


    $scope.opened = false;


    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);

    $scope.search();

  }]);