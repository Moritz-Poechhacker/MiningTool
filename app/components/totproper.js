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
        //$scope.ausgabe = [];
        let array = [];
        let i = 0;

        let toArray = TransactionService.getTotProper();
        for (let key in toArray) {
            array.push({ "name": key, "oresAndAmounts":toArray[key], "PPTransH": $scope.ausgabe[i] ? $scope.ausgabe[i].PPTransH : true });
            i++;
        }
        $log.debug($scope.ausgabe);
        $scope.ausgabe = array;
        $log.debug("TotPro2", array);

    };

    this.showOrHide = function(){
        for (let i = 0; i < $scope.ausgabe.length; i++){
            $scope.ausgabe[i].PPTransH = this.stat ? false : true;
        }
        this.stat = !this.stat;
    };

    this.showPerPerson = function(charactername){
        $log.debug("Charactername: ", charactername);
        $scope.ausgabe.find(function(obj){return obj.name == charactername}).PPTransH = !$scope.ausgabe.find(function(obj){return obj.name == charactername}).PPTransH;
        let debuggi = $scope.ausgabe.find(function(obj){return obj.name == charactername}).PPTransH;
        $log.debug("charstat: " + debuggi);
        $log.debug("TotPro3: ", $scope.ausgabe);
    };

    this.totalFee = function(charname){
        let feecalc = TransactionService.getTransactions();
        let count = 0;
        for(let i = 0; i < feecalc.length; i++){
            if(feecalc[i].name == charname){
                count++;
            }
        }
        let calcfee = TransactionService.getFee();
        console.log("Calcfee: " + calcfee);
        console.log("Count: " + count);
        let final = count * calcfee;
        return final;
    };
});