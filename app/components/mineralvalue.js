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

});