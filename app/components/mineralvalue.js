"use strict";
//Komponente die alle Transaktionen ausgibt
app.component("mineralvalue", {
    templateUrl: "components/mineralvalue.html",
    controller: "MValController",
    bindings: {
    }
});


app.controller("MValController", function(TransactionService, $log, $scope) {
    $log.debug("MineralPrice: ", TransactionService.getMineral());
    $scope.orename = '';
    $scope.reproAmount = 50;
    $scope.repValue = 50;
    $scope.oreswithminerals = TransactionService.getOreMineralArray();
    $scope.rore;
    this.setRepVal = function(repval){
        $scope.repValue = (repval/100);
        TransactionService.setReproValue($scope.repValue);
        $log.debug("Ore Chosen: ", $scope.orename);
        $log.debug("Reprocessing Value: ", $scope.repValue);
        $scope.rore = TransactionService.getOreMineralPrice($scope.orename);
        $log.debug("Ore returned: ", $scope.rore);
    };
});