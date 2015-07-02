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

//= require bootstrap-daterangepicker/daterangepicker.js
//= require angular-daterangepicker/js/angular-daterangepicker.js




// require Chart.js/Chart.js
// require angular-chart.js/dist/angular-chart.js



//= require report_object
//= require_self


// var HOST = location.origin;
var HOST = 'https://api.fda.gov';
var APIKEY = "AdI7VwjhIVFykmklU56DkJGwHZXA2x725diFJSGB";
var app = angular.module("openfda", ['ui.bootstrap', 'ui.grid', 'nvd3', 'localytics.directives', 'ui-rangeSlider', 'daterangepicker']);


app

  .controller("DashboardCtrl",
    ['$scope', '$http', '$window', '$filter', 'orderByFilter', 'filterFilter', '$q',
    function ($scope, $http, $window, $filter, orderByFilter, filterFilter, $q) {

    $scope.safetyReportProperties = $window.safetyReportProperties;
    $scope.orderByFilter = orderByFilter;

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    $scope.safetyReportObject = $window.safetyReportObject;

    $scope.dateOptions = {
      startDate: '2014-03-01',
      endDate: '2014-03-31',
      minDate: '2004-01-01',
      maxDate: '2014-03-31',
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.onTabChange = function() {
      // $window.
      // $($window).trigger('resize')
      $window.dispatchEvent(new Event('resize'));
    }

    $scope.openDate = function() {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    }

    // Generic search text
    $scope.searchText = ''

    $scope.reset = function() {
      $scope.messages = [];
      $scope.searchOptions = {};
      $scope.tempSearchOptions = {};
      $scope.renderAll();
    }

    $scope.tempSearchOptions = {};

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
      columnDefs: $filter('filter')(safetyReportProperties, {value: {inTable: true}}).map(function(p){ return {field: p.full_field, displayName: p.value.name}}),

      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,

      enableFiltering: true,
      enableSorting: false,
      flatEntityAccess: false,
      showColumnFooter: true,
      showGridFooter: true,
      // gridMenuTitleFilter: function(fullField) {
      //   debugger
      //   var field = fullField.split('.');
      //   var obj;
      //   angular.forEach(field, function(value, key){
      //     obj = obj ? safetyReportObject[value] : obj[value];
      //   });
      //   return obj.name
      //   // $filter('filter')(safetyReportProperties, {value: {: true}})
      // }

    }

    var defaultRequest = {
      method: 'GET',
      cache: true,
      url: $window.HOST + '/drug/event.json',
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
      return processedValues.join(' AND ')
    }

    function queryBuilder(fieldCount, limit) {
      var newRequest = angular.copy(defaultRequest);
      newRequest.params = angular.copy($scope.options);

      var searchQuery = [];
      var searchFieldsQuery = buildSearchParam($scope.tempSearchOptions);
      if(searchFieldsQuery) {
        searchQuery.push(searchFieldsQuery)
      }
      if($scope.searchText != '') {
        searchQuery.push($scope.searchText)
      }

      newRequest.params.search = searchQuery.join(' AND ').replace(/\s/g, '+');

      if(limit) {
        newRequest.params.limit = limit;
      }


      if (fieldCount) {
        newRequest.params.count = fieldCount //+ '.exact';
      }

      return newRequest;
    }


    $scope.search = function() {

      // request.params = $scope.options;
      // request.params.search = queryBuilder($scope.searchOptions);


      return $http(queryBuilder(null, 100))
        .then(function(resp) {
          $scope.stats.total = resp.data.meta.results.total;
          $scope.gridOptions.data = resp.data.results;
          return true;
        })
    }

    $scope.loading = false;

    $scope.renderAll = function() {
      $scope.loading = true;
      $scope.messages = [];
      $scope.search()
        .then(function(){
          $scope.renderCharts()
        })
        .catch(function(resp) {
          $scope.messages.push({alertClass: 'danger', text: resp.data.error.message})
        })
        .finally(function(){
          $scope.loading = false;
        })

    }

    function scaledTickFormat(d) {
      var prefix = d3.formatPrefix(d);
      return d3.round(prefix.scale(d), 1) + prefix.symbol;
    }

    function percenTickFormat(d) {
      return d3.format('%')(d);
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
          "showControls": false,
          "clipEdge": true,
          "staggerLabels": true,
          "transitionDuration": 500,
          "stacked": true,
          "reduceXTicks": false,
          "xAxis": {
            "axisLabel": "Weight",
            "showMaxMin": false,
            reduceXTicks: false
          },
          "yAxis": {
            "axisLabel": "Percentage of Event Count",
            "axisLabelDistance": 40,
            tickFormat: percenTickFormat
          }
        }
      };

    var defaultLineChartOptions = {

        "chart": {
          "type": "lineChart",
          "height": 350,
          "margin": {
            "top": 20,
            "right": 20,
            "bottom": 40,
            "left": 55
          },
          // "useInteractiveGuideline": true,
          // "dispatch": {},
          "xAxis": {
            "axisLabel": "Time (ms)"
          },
          "yAxis": {
            "axisLabel": "Voltage (v)",
            // "axisLabelDistance": 30
          },
          "transitionDuration": 250
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
        "margin": {
          "top": 20,
          "right": 20,
          "bottom": 60,
          "left": 245
        },
        "showControls": false,
        "showValues": true,
        "transitionDuration": 500,
        valueFormat: scaledTickFormat,
        "xAxis": {
          "showMaxMin": false
        },
        "yAxis": {
          "axisLabel": "Values",
          tickFormat: scaledTickFormat,
        }
      }
    };



    $scope.renderCharts = function() {
      return $q.all([
        $scope.renderMonthChart(),
        $scope.renderWeightChart(),
        $scope.renderCountryChart(),
        $scope.renderAgeChart(),
        $scope.renderSexChart(),
        $scope.renderOutcomeChart(),
        $scope.renderMedicineChart(),
        $scope.renderOccupationChart(),
        $scope.renderDrugUsageChart(),
      ])

    }

    function convertToPercent(a,b) {
      return (a / b)
    }

    function remapData(unProcessData, field, total) {

      var processedData =  [
        {
          key: field,
          values: []
        }
      ];

      unProcessData.map(function(item) {
        processedData[0].values.push({
          x: item.term,
          y: total ? convertToPercent(item.count, total) : item.count
        })
      });

      return processedData;

    }

    // function remapData(unProcessData, field) {

    //   var processedData =  [
    //     {
    //       key: field,
    //       values: []
    //     }
    //   ];

    //   unProcessData.map(function(item) {
    //     processedData[0].values.push({
    //       x: item.term,
    //       y: item.count
    //     })
    //   });

    //   return processedData;

    // }

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

    $scope.renderMonthChart = function() {

      var field = 'receivedate';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "Month";
      chartOptions.chart.yAxis.axisLabel = "% of Event Count";

      $scope.monthOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){
          var total = 0
          var monthData = [{term:'Jan', count: 0}, {term:'Feb', count: 0}, {term:'Mar', count: 0}, {term:'Apr', count: 0}, {term:'May', count: 0}, {term:'June', count: 0}, {term:'July', count: 0}, {term:'Aug', count: 0}, {term:'Sept', count: 0}, {term:'Oct', count: 0}, {term:'Nov', count: 0}, {term:'Dec', count: 0}];
          var monthIndex;
          unProcessData = unProcessData.map(function(d){
            monthIndex = parseInt(d.time.toString().substr(4,2)) - 1;
            monthData[monthIndex].count = monthData[monthIndex].count + d.count
            total += d.count;
          })
          // sortedData = orderByFilter(unProcessData, 'term')
          $scope.monthData = remapData(monthData, 'Month', total);
        })
    }

    $scope.renderWeightChart = function() {

      var field = 'patientweight';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "Weight (Kg)";
      chartOptions.chart.yAxis.axisLabel = "% of Event Count";

      $scope.weightOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){
          var groupedData = [];
          var total = 0
          unProcessData.map(function(d) {
            var gap = 20;
            index = Math.floor(parseInt(d.term)/gap);
            if(!angular.isDefined(groupedData[index])) {
              groupedData[index] = {term: ((index) * gap) + '<= wt <' + ((index + 1) * gap), count: 0}
            }
            groupedData[index].count += d.count;
            total += d.count;
          })
          // sortedData = orderByFilter(groupedData, 'term')
          $scope.weightData = remapData(groupedData, 'Weight', total);
        })
    }

    $scope.renderCountryChart = function() {

      var field = 'occurcountry';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "";
      chartOptions.chart.yAxis.axisLabel = "% of Event Count";
      chartOptions.chart.margin.bottom = 200;
      chartOptions.chart.height = 450;
      chartOptions.chart.rotateYLabel = true;
      chartOptions.chart.rotateLabels = -45;
      chartOptions.chart.xAxis.axisLabelDistance = 150;

      chartOptions.chart.x = function (d){
        return COUNTRIES_FULL[d.x.toUpperCase()] || d.x;
      },

      $scope.countryOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){
          // sortedData = orderByFilter(unProcessData, 'value')

          var total = 0;
          unProcessData.map(function(d) {
            total += d.count;
          })

          sortedData = unProcessData;

          // $scope.countryChartData = remapData2(sortedData, ['Country']);
          // $scope.countryOptions.chart.xAxis.tickValues = $scope.countryChartData.labels;
          $scope.countryData = remapData(sortedData, 'Country', total);
          return true;
        })
    }

    $scope.renderAgeChart = function() {

      var field = 'patientonsetage';

      var chartOptions = angular.copy(defaultChartOptions)
      chartOptions.chart.xAxis.axisLabel = "Age (years)";
      chartOptions.chart.yAxis.axisLabel = "% of Event Count";

      $scope.ageOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){

          var ageData = [];
          var total = 0
          unProcessData.map(function(d) {
            var gap = 10;
            index = Math.floor(parseInt(d.term)/gap);
            if(index <= 12) {
              if(!angular.isDefined(ageData[index])) {
                ageData[index] = {term: ((index* gap) + 1) + ' - ' + ((index+1) * gap), count: 0}
              }
              ageData[index].count += d.count;
              total += d.count;
            }
          })


          // sortedData = orderByFilter(ageData, 'term')
          $scope.ageData = remapData(ageData, 'Age', total);

          return true;
        })
    }

    $scope.renderMedicineChart = function() {

      var field = 'patient.drug.medicinalproduct.exact';

      var chartOptions = angular.copy(defaultBarHorizontalChartOptions);
      chartOptions.chart.xAxis.axisLabel = "";
      chartOptions.chart.yAxis.axisLabel = "% of Event Count";

      $scope.medicineOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){
          sortedData = orderByFilter(unProcessData, 'term')
          $scope.medicineData = remapData(sortedData, 'Drug');
          return true;
        })
    }


    $scope.renderDrugUsageChart = function() {

      var field = 'medicinalproduct';

      var chartOptions = angular.copy(defaultChartOptions);
      chartOptions.chart.xAxis.axisLabel = "";
      chartOptions.chart.yAxis.axisLabel = "Event Count";
      chartOptions.chart.yAxis.tickFormat = scaledTickFormat;
      chartOptions.chart.rotateYLabel = true,
      chartOptions.chart.rotateLabels = -45,
      chartOptions.chart.margin.bottom = 200;
      chartOptions.chart.height = 450;
      chartOptions.chart.xAxis.axisLabelDistance = 150;

      $scope.drugUsageOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){
          // sortedData = orderByFilter(unProcessData, 'term')
          $scope.drugUsageData = remapData(unProcessData.reverse()  , 'Drug');
          return true;
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

      return $scope.getCounts(field)
        .then(function(unProcessData){
          $scope.sexData = unProcessData;
          return true;
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

      return $scope.getCounts(field)
        .then(function(unProcessData){
          // sortedData = orderByFilter(unProcessData, 'term')
          // $scope.outcomeData = remapData(sortedData, 'Sex');
          $scope.outcomeData = unProcessData;
          return true;
        })
    }

    $scope.renderOccupationChart = function() {

      var field = 'primarysource.qualification';

      var chartOptions = angular.copy(defaultPieChartOptions);
      // chartOptions.chart.xAxis.axisLabel = "Sex";
      // chartOptions.chart.yAxis.axisLabel = "Count of Events";

      chartOptions.chart.x = function (d){
        return QUALIFICATIONS[d.term];
      },

      $scope.occupationOptions = chartOptions;

      return $scope.getCounts(field)
        .then(function(unProcessData){
          // sortedData = orderByFilter(unProcessData, 'term')
          // $scope.occupationData = remapData(sortedData, 'Sex');
          $scope.occupationData = unProcessData;
          return true;
        })
    }

    $scope.getCounts = function(fieldCount, limit) {

      limit =  angular.isDefined(limit) ? limit : '';
      var deferred = $q.defer();

      var promise = $http(queryBuilder(fieldCount, limit))
        .success(function(data, status, headers, config) {
          deferred.resolve(data.results)
          return ;
        })
        // .then(function(resp) {
        //   return resp.data.results;
        // })
        .error( function(data) {
          var message = data.error.message;
          switch(data.error.code) {
            case 'OVER_RATE_LIMIT':
              message = "API Rate Limit Reached. Please try again by clicking the Apply Filters button";
            break;
          }
          $scope.messages.push({alertClass: 'danger', text: message})
          deferred.reject(data);
        });

        return deferred.promise
    }

    angular.forEach($scope.safetyReportProperties, function(property, key){
      if (property.value.visible && property.value.preprocess) {

        property.value.preprocess.apply(property, [property, $scope])
          // .then(function(data) {
          // })
      }
    });



    $scope.opened = false;

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);

    $scope.renderAll();

  }]);
