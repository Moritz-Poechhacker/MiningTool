"use strict";
//Komponente die alle Transaktionen ausgibt
app.component("alltransactions", {
    templateUrl: "components/alltransactions.html",
    controller: "AllTransController",
    bindings: {
    }
});


app.controller("AllTransController", function(TransactionService, $log, $scope) {

    console.log("alltransactions yes");
    $scope.allOretransactions = TransactionService.getTransactions();
    console.log($scope.allOretransactions);
});