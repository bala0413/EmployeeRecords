'use strict';

var app = angular.module('demo', ['ngSanitize', 'ui.select']);

app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

app.controller('DemoCtrl', function ($scope, $http, $timeout, $interval) {
    var vm = this;

    //vm.disabled = undefined;
    //vm.searchEnabled = undefined;

    //vm.setInputFocus = function () {
    //    $scope.$broadcast('UiSelectDemo1');
    //};

    //vm.enable = function () {
    //    vm.disabled = false;
    //};

    //vm.disable = function () {
    //    vm.disabled = true;
    //};

    //vm.enableSearch = function () {
    //    vm.searchEnabled = true;
    //};

    //vm.disableSearch = function () {
    //    vm.searchEnabled = false;
    //};

    //vm.clear = function () {
    //    vm.person.selected = undefined;
    //    vm.address.selected = undefined;
    //    vm.country.selected = undefined;
    //};

    $scope.someGroupFn = function (item) {

        if (item.name[0] >= 'A' && item.name[0] <= 'M')
            return 'From A - M';

        if (item.name[0] >= 'N' && item.name[0] <= 'Z')
            return 'From N - Z';

    };

    $scope.firstLetterGroupFn = function (item) {
        return item.name[0];
    };

    $scope.reverseOrderFilterFn = function (groups) {
        return groups.reverse();
    };

    //vm.personAsync = { selected: "adam@email.com" };
    //vm.peopleAsync = [];

    //$timeout(function () {
    //    vm.peopleAsync = [
    //        { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
    //        { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
    //        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    //        { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
    //    ];
    //}, 3000);

    //vm.counter = 0;
    //vm.onSelectCallback = function (item, model) {
    //    vm.counter++;
    //    vm.eventResult = { item: item, model: model };
    //};

    //vm.removed = function (item, model) {
    //    vm.lastRemoved = {
    //        item: item,
    //        model: model
    //    };
    //};

    //vm.tagTransform = function (newTag) {
    //    var item = {
    //        name: newTag,
    //        email: newTag.toLowerCase() + '@email.com',
    //        age: 'unknown',
    //        country: 'unknown'
    //    };

    //    return item;
    //};

    vm.peopleObj = {
        '1': { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
        '2': { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
        '3': { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
        '4': { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
    };

    vm.person = {};

    vm.person.selectedValue = vm.peopleObj[1];
    vm.person.selectedSingle = 'Estefanía';
    vm.person.selectedSingleKey = '4';
    // To run the demos with a preselected person object, uncomment the line below.
    //vm.person.selected = vm.person.selectedValue;

    vm.people = [
        { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
        { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
        { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
        { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
    ];

    vm.availableColors = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Maroon', 'Umbra', 'Turquoise'];

   // vm.singleDemo = {};
   // vm.singleDemo.color = '';
    vm.multipleDemo = {};
    vm.multipleDemo.colors = ['Blue', 'Red'];
    //vm.multipleDemo.colors2 = ['Blue', 'Red'];
    vm.multipleDemo.selectedPeople = [vm.people[2]];
   // vm.multipleDemo.selectedPeople2 = vm.multipleDemo.selectedPeople;
   // vm.multipleDemo.selectedPeopleWithGroupBy = [vm.people[2], vm.people[0]];
    vm.multipleDemo.selectedPeopleSimple = ['estefania@email.com'];
   // vm.multipleDemo.removeSelectIsFalse = [vm.people[2], vm.people[0]];

    //vm.appendToBodyDemo = {
    //    remainingToggleTime: 0,
    //    present: true,
    //    startToggleTimer: function () {
    //        var scope = vm.appendToBodyDemo;
    //        var promise = $interval(function () {
    //            if (scope.remainingTime < 1000) {
    //                $interval.cancel(promise);
    //                scope.present = !scope.present;
    //                scope.remainingTime = 0;
    //            } else {
    //                scope.remainingTime -= 1000;
    //            }
    //        }, 1000);
    //        scope.remainingTime = 3000;
    //    }
    //};

    //vm.address = {};
    //vm.refreshAddresses = function (address) {
    //    var params = { address: address, sensor: false };
    //    return $http.get(
    //        'http://maps.googleapis.com/maps/api/geocode/json',
    //        { params: params }
    //    ).then(function (response) {
    //        vm.addresses = response.data.results;
    //    });
    //};

    //vm.addPerson = function (item, model) {
    //    if (item.hasOwnProperty('isTag')) {
    //        delete item.isTag;
    //        vm.people.push(item);
    //    }
    //}

    $scope.country = {};
    $scope.countries = [
        { name: 'American Samoa', code: 'AS' },    
        { name: 'Iceland', code: 'IS' },
        { name: 'India', code: 'IN' },
        { name: 'Indonesia', code: 'ID' },
        { name: 'Iraq', code: 'IQ' },
        { name: 'Italy', code: 'IT' },
        { name: 'Jamaica', code: 'JM' },
    ];
});