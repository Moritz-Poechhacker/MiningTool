"use strict";
//Fügt einen neuen Character hinzu
app.component("newplayer", {
    templateUrl: "components/newplayer.html",
    controller: "NewPlayerController",
    bindings: {
    }
});


app.controller("NewPlayerController", function(TransactionService, $scope, $log) {
    $scope.charname = '';
    this.playerlist = true;

    $scope.onInput = function(val) {
        TransactionService.addChar(val);
        console.log("In newplayer: "  + val);
        $scope.characters = TransactionService.pchars();
        console.log(TransactionService.pchars());
    };

});