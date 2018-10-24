"use strict";
//Stellt dropdowns und eingabefelder für Erzabbau-transaktionen zur verfügung und sendet die daten an die factory
app.component("addtransaction", {
    templateUrl: "components/addtransaction.html",
    controller: "TransactionController",
    bindings: {
        mitteilen: "&"
    }
});


app.controller("TransactionController", function(TransactionService, $scope, $log, Transaction) {
    $scope.transcharname = '';
    $scope.transorename = '';
    $scope.transamount = 1;
    $scope.charlist = TransactionService.pchars();
    $scope.orelist = TransactionService.getOre();
    this.allThide = true;
    let that = this;
    $scope.onTrans = function() {
        //console.log($scope.transcharname);
        //console.log($scope.transorename);
        //console.log($scope.transamount);
        TransactionService.addTransaction(new Transaction($scope.transcharname, $scope.transorename, $scope.transamount));
        that.mitteilen();
        console.log("Transactions: ");
        console.log(TransactionService.getTransactions());
    }
});
