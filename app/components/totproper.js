"use strict";
//Dropdown felder für jeden Character in denen man das gesamt der einzelnen Erze sieht
app.component("totproper", {
    templateUrl: "components/totproper.html",
    controller: "TotProController",
    bindings: {
        reload: "<"
    }
});


app.controller("TotProController", function(TransactionService, $log, $scope) {

    $scope.ausgabe = [];
    this.stat = true;

    this.$onChanges = function(changesObj){
        $scope.ausgabe = [];
        let toArray = TransactionService.getTotProper();
        for (let key in toArray) {
            $scope.ausgabe.push({ "name": key, "oresAndAmounts":toArray[key], "PPTransH": true });
            $log.debug("totproper");
            $log.debug($scope.ausgabe);
        }

    };

    this.showOrHide = function(){
        for (let i = 0; i < $scope.ausgabe.length; i++){
            $scope.ausgabe[i].PPTransH = this.stat ? false : true;
        }
        this.stat = !this.stat;
    };
});