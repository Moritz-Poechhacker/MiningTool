"use strict";

app.component("oretable", {
    templateUrl: "components/oretable.html",
    controller: "OreTableController",
    bindings: {
    }
});


app.controller("OreTableController", function($scope, $http, $log, TransactionService) {
    $scope.transactions = TransactionService.getTransactions();
    this.$onInit = function () {
        $scope.allminables = TransactionService.getOre();
        $log.debug($scope.allminables);
        }
});

