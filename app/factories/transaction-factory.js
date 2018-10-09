"use strict";
//Erzeugt eine neue transaktion aus den gegebenen daten und schickt sie an die Service liste
app.factory("Transaction", function(TransactionService){
function Transaction(name, ore, amount){
    this.name = name;
    this.ore = ore;
    this.amount = amount;
    this.Tvalue = TransactionService.getPriceFromList(this.ore)*this.amount;

    Object.defineProperty(this, "getTransName", {value: this.name, writable:false});
    Object.defineProperty(this, "getTransOre", {value: this.ore, writable:false});
    Object.defineProperty(this, "getTransAmount", {value: this.amount, writable:false});
    Object.defineProperty(this, "getTvalue", {value: this.Tvalue, writable:false});
}

return Transaction;

});