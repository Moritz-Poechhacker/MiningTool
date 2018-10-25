"use strict";
app.component("umrandung", {
    templateUrl: "components/umrandung.html",
    controller: "UmrandungController",
    bindings: {
    }
});

app.controller("UmrandungController", function ($scope, TransactionService, $log) {
    $scope.totals = [];
    $scope.reloadBla = true;

    $scope.aktualisiere = function () {
        $scope.totals = [];
        let totProper = {};
        let sentOresAndAmount = new Map();

        TransactionService.getTransactions().map(function (x) {
            //console.log("get wenn key nicht vorhanden: " + sentOresAndAmount.get(x.ore));
            if(!totProper.hasOwnProperty(x.name)){
                totProper[x.name] = { [x.ore]: x.amount, "totalvalue": x.Tvalue};
            }else{
                if(totProper[x.name].hasOwnProperty(x.ore)){
                    let objekt = totProper[x.name];
                    objekt[x.ore] = objekt[x.ore] + x.amount;
                    objekt.totalvalue = objekt.totalvalue + x.Tvalue;
                    totProper[x.name] = objekt;
                }else{
                    let objekt = totProper[x.name];
                    objekt[x.ore] = x.amount;
                    objekt.totalvalue = objekt.totalvalue + x.Tvalue;
                    totProper[x.name] = objekt;
                }
            }
            sentOresAndAmount.set(x.ore, sentOresAndAmount.has(x.ore) ? sentOresAndAmount.get(x.ore) + x.amount : x.amount);
        });

        TransactionService.setTotProper(totProper);
        $scope.reloadBla = !$scope.reloadBla;
        /*console.log("########");
        console.log(totProper);
        console.log("########");*/
        $log.debug("####");
        $log.debug(sentOresAndAmount);
        for(let oreAndAmount of sentOresAndAmount){
            let dubidubiduba = oreAndAmount[1] * TransactionService.getOre(oreAndAmount[0])[0].value;
            $scope.totals.push({"ore": oreAndAmount[0], "amount": oreAndAmount[1], "transvalue": dubidubiduba});
            $log.debug("umrandung totals: ", $scope.totals);
        }

    };
});