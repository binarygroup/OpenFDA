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

//= require d3/d3.js
//= require nvd3/nv.d3.js
//= require angular-nvd3/dist/angular-nvd3.js


//= require chosen/chosen.jquery.min
//= require angular-chosen-localytics/chosen
// require angular-chosen/angular-chosen
//= require angular-rangeslider/angular.rangeSlider





// require Chart.js/Chart.js
// require angular-chart.js/dist/angular-chart.js



//= require report_object
//= require_self


var APIKEY = "AdI7VwjhIVFykmklU56DkJGwHZXA2x725diFJSGB";
var app = angular.module("openfda", ['ui.bootstrap', 'ui.grid', 'nvd3', 'localytics.directives', 'ui-rangeSlider']);


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
  .controller("DashboardCtrl", ['$scope', '$http', '$window', '$filter', 'orderByFilter', 'filterFilter', function ($scope, $http, $window, $filter, orderByFilter, filterFilter) {

    $scope.safetyReportProperties = $window.safetyReportProperties;
    $scope.orderByFilter = orderByFilter;

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    $scope.safetyReportObject = $window.safetyReportObject;

    $scope.reset = function() {
      $scope.searchOptions = {};
    }

    $scope.tempSearchOptions = {

    }

    $scope.debug = function(a, b, c) {

    }

    // $scope.getCountries = function() {

    //   var field = 'occurcountry';

    //   $scope.getCounts(field)
    //     .then(function(unProcessData){
    //       sortedData = orderByFilter(unProcessData, 'value').map(function(item) {
    //         return item.value
    //       })
    //     })
    // }

    $scope.countries = $window.COUNTRIES;

    $scope.directiveOptions = {
      no_results_text: "SO SORRY"
    };

    $scope.options = {
      api_key: $window.APIKEY,
      limit: '',
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

    $scope.columns =


    $scope.remove = function() {
      $scope.columns.splice($scope.columns.length-1, 1);
    }

    $scope.add = function() {
      $scope.columns.push({ field: 'company', enableSorting: false });
    }



    // function buildDate(from, to) {
    //   // [20040101+TO+20081231]
    //   return '[' + from + '+TO+' + to + ']';
    // }

    var defaultRequest = {
      method: 'GET',
      url: 'https://api.fda.gov/drug/event.json',
      // transformRequest: $http.defaults.transformRequest.concat([function(req){
      // transformRequest: [function(req, fn){
      //   debugger
      // }].concat($http.defaults.transformRequest),
      // headers: {
      //   'Content-Type': undefined
      // },
      params: {}
    }

    function extractSearchParams(params) {

      var fullField;
      var processedValue;
      var processedValues = []

      angular.forEach($scope.safetyReportProperties, function(property, key){

        fullField = property.full_field;
        processedValue = null;
        // Check if the temp params is set by the user
        if(params[fullField]) {
          // Found
          processedValue = property.value.process.apply(property, [params[fullField]]);

          if(processedValue) {
            processedValues.push(processedValue);
            // $scope.searchOptions[fullField] == processedValue;
          }

        }

      });

      return processedValues;
    }

    function buildSearchParam (params) {
      var passedOptions = [];

      var processedValues = extractSearchParams(params)

      // angular.forEach(searchOptions, function(value, key) {
      //   console.log(value, key)
      //   passedOptions.push(key + ':' + value);
      // });
      return processedValues.join(' AND ').replace(/\s/g, '+')
    }

    function queryBuilder(fieldCount) {
      var newRequest = angular.copy(defaultRequest);
      newRequest.params = angular.copy($scope.options);
      newRequest.params.search = buildSearchParam($scope.tempSearchOptions);

      if (fieldCount) {
        newRequest.params.count = fieldCount //+ '.exact';
      }

      return newRequest;
    }


    $scope.search = function() {

      // request.params = $scope.options;
      // request.params.search = queryBuilder($scope.searchOptions);


      $http(queryBuilder())
        .then(function(resp) {
          $scope.stats.total = resp.data.meta.results.total;
          $scope.gridOptions.data = resp.data.results;

        })
    }

    var defaultChartOptions = {
        "chart": {
          "type": "multiBarChart",
          "height": 200,
          "margin": {
            "top": 20,
            "right": 20,
            "bottom": 60,
            "left": 45
          },
          "clipEdge": true,
          "staggerLabels": true,
          "transitionDuration": 500,
          "stacked": true,
          "reduceXTicks": true,
          "xAxis": {
            "axisLabel": "Weight",
            "showMaxMin": false,
            reduceXTicks: false
          },
          "yAxis": {
            "axisLabel": "Count of Events",
            "axisLabelDistance": 60
          }
        }
      }

    var defaultPieChartOptions = {
      "chart": {
        x: function (d){return d.term;},
        y: function (d){return d.count;},
        "type": "pieChart",
        "height": 300,
        "showLabels": true,
        "transitionDuration": 500,
        "labelThreshold": 0.01,
        "labelType": 'percent',
        "donut": true,
        "legend": {
          "margin": {
            "top": 5,
            "right": 35,
            "bottom": 5,
            "left": 0
          }
        }
      }
    };

    var defaultBarHorizontalChartOptions = {
      "chart": {
        "type": "multiBarHorizontalChart",
        "height": 1500,
        "showControls": true,
        "showValues": true,
        "transitionDuration": 500,
        "xAxis": {
          "showMaxMin": false
        },
        "yAxis": {
          "axisLabel": "Values"
        }
      }
    };




    $scope.renderCharts = function() {
      $scope.renderWeightChart();
      $scope.renderCountryChart();
      $scope.renderAgeChart();
      $scope.renderSexChart();
      $scope.renderOutcomeChart();
      $scope.renderMedicineChart();

    }

    function remapData(unProcessData, field) {

      var processedData =  [
        {
          key: field,
          values: []
        }
      ];

      unProcessData.map(function(item) {
        processedData[0].values.push({
          x: item.term,
          y: item.count
        })
      });

      return processedData;

    }

    function remapData(unProcessData, field) {

      var processedData =  [
        {
          key: field,
          values: []
        }
      ];

      unProcessData.map(function(item) {
        processedData[0].values.push({
          x: item.term,
          y: item.count
        })
      });

      return processedData;

    }

    function remapData2(unProcessData, series) {

      var labels = [];
      var data = [[]];

      unProcessData.map(function(item) {
        labels.push(item.term);
        data[0].push(item.count);
      });

      return {
        labels: labels,
        data: data,
        series: series
      }

    }

    $scope.renderWeightChart = function() {

      var field = 'patientweight';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "Weight (kilograms)";
      chartOptions.chart.yAxis.axisLabel = "Count of Events";

      $scope.weightOptions = chartOptions;

      $scope.getCounts(field)
        .then(function(unProcessData){
          sortedData = orderByFilter(unProcessData, 'term')
          $scope.weightData = remapData(sortedData, 'Weight');
        })
    }

    $scope.renderCountryChart = function() {

      var field = 'occurcountry';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "Country";
      chartOptions.chart.yAxis.axisLabel = "Distinct Count of Report Id";

      $scope.countryOptions = chartOptions;

      $scope.getCounts(field)
        .then(function(unProcessData){
          // sortedData = orderByFilter(unProcessData, 'value')
          sortedData = unProcessData;

          // $scope.countryChartData = remapData2(sortedData, ['Country']);
          // $scope.countryOptions.chart.xAxis.tickValues = $scope.countryChartData.labels;
          $scope.countryData = remapData(sortedData, 'Country');
        })
    }

    $scope.renderAgeChart = function() {

      var field = 'patientonsetage';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "Age";
      chartOptions.chart.yAxis.axisLabel = "Count of Events";

      $scope.ageOptions = chartOptions;

      $scope.getCounts(field)
        .then(function(unProcessData){
          sortedData = orderByFilter(unProcessData, 'term')
          $scope.ageData = remapData(sortedData, 'Age');
        })
    }

    $scope.renderMedicineChart = function() {

      var field = 'medicinalproduct';

      var chartOptions = angular.copy(defaultBarHorizontalChartOptions);
      chartOptions.chart.xAxis.axisLabel = "Drug";
      chartOptions.chart.yAxis.axisLabel = "Count of Events";

      $scope.medicineOptions = chartOptions;

      $scope.getCounts(field)
        .then(function(unProcessData){
          sortedData = orderByFilter(unProcessData, 'term')
          $scope.medicineData = remapData(sortedData, 'Drug');
        })
    }


    $scope.renderSexChart = function() {

      var field = 'patientsex';

      var chartOptions = angular.copy(defaultPieChartOptions);
      // chartOptions.chart.xAxis.axisLabel = "Sex";
      // chartOptions.chart.yAxis.axisLabel = "Count of Events";
      chartOptions.chart.x = function (d){
        return SEX_VALUES[d.term];
      },

      $scope.sexOptions = chartOptions;

      $scope.getCounts(field)
        .then(function(unProcessData){
          $scope.sexData = unProcessData;
        })
    }

    $scope.renderOutcomeChart = function() {

      var field = 'patient.reaction.reactionoutcome';

      var chartOptions = angular.copy(defaultPieChartOptions);
      // chartOptions.chart.xAxis.axisLabel = "Sex";
      // chartOptions.chart.yAxis.axisLabel = "Count of Events";

      chartOptions.chart.x = function (d){
        return REACTION_OUTCOMES[d.term];
      },

      $scope.outcomeOptions = chartOptions;

      $scope.getCounts(field)
        .then(function(unProcessData){
          // sortedData = orderByFilter(unProcessData, 'term')
          // $scope.outcomeData = remapData(sortedData, 'Sex');
          $scope.outcomeData = unProcessData;
        })
    }

    $scope.getCounts = function(fieldCount) {

      return $http(queryBuilder(fieldCount))
        .then(function(resp) {
          return resp.data.results;
        })
    }

    angular.forEach($scope.safetyReportProperties, function(property, key){
      if (property.value.preprocess) {

        property.value.preprocess.apply(property, [property, $scope])
          // .then(function(data) {
          // })
      }
    });



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
    // $scope.renderCharts();



    // /* Random Data Generator (took from nvd3.org) */
    // function generateData() {
    //     return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
    //         return {
    //             key: 'Stream' + i,
    //             values: data
    //         };
    //     });
    // }

    // /* Inspired by Lee Byron's test data generator. */
    // function stream_layers(n, m, o) {
    //     if (arguments.length < 3) o = 0;
    //     function bump(a) {
    //         var x = 1 / (.1 + Math.random()),
    //             y = 2 * Math.random() - .5,
    //             z = 10 / (.1 + Math.random());
    //         for (var i = 0; i < m; i++) {
    //             var w = (i / m - y) * z;
    //             a[i] += x * Math.exp(-w * w);
    //         }
    //     }
    //     return d3.range(n).map(function() {
    //         var a = [], i;
    //         for (i = 0; i < m; i++) a[i] = o + o * Math.random();
    //         for (i = 0; i < 5; i++) bump(a);
    //         return a.map(stream_index);
    //     });
    // }

    // /* Another layer generator using gamma distributions. */
    // function stream_waves(n, m) {
    //     return d3.range(n).map(function(i) {
    //         return d3.range(m).map(function(j) {
    //             var x = 20 * j / m - i / 3;
    //             return 2 * x * Math.exp(-.5 * x);
    //         }).map(stream_index);
    //     });
    // }

    // function stream_index(d, i) {
    //     return {x: i, y: Math.max(0, d)};
    // }



  }]);