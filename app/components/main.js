"use strict";

app.component("main", {
    templateUrl: "components/main.html",
    controller: "MainController"
});


app.controller("MainController", function(Liste) {
    this.aufgaben = Liste.aufgaben;
});
