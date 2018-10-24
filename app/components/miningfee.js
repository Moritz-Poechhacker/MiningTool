"use strict";
//Fügt einen neuen Character hinzu
app.component("miningfee", {
    templateUrl: "components/miningfee.html",
    controller: "MiningFeeController",
    bindings: {
    }
});


app.controller("MiningFeeController", function(TransactionService, $scope, $log) {

    $scope.fee = 0;
    this.tempfee = 0;

    this.setFee = function(){
        $scope.fee = this.tempfee;
        $log.debug($scope.fee);
    };

});