"use strict";
//Der Service beinhaltet listen für Erze und personen und stellt diese zur verfügung
app.service("TransactionService", function($http,$log){
    let charList = [];
    let transactionList = [];
    let totproper = {};
    let fee = 0;
    let oreMainList = [
        {
            "Type":"Veldspar",
            "Name": "Veldspar",
            "Weight": "0.10",
            "value":1230
        },
        {
            "Type":"Veldspar",
            "Name": "Concentrated Veldspar",
            "Weight": "0.10",
            "value":17470
        },
        {
            "Type":"Veldspar",
            "Name": "Dense Veldspar",
            "Weight": "0.10",
            "value":17471
        },
        {
            "Type":"Veldspar",
            "Name": "Stable Veldspar",
            "Weight": "0.10",
            "value":46689
        },
        {
            "Type":"Scordite",
            "Name": "Scordite",
            "Weight": "0.15",
            "value":1228
        },
        {
            "Type":"Scordite",
            "Name": "Condensed Scordite",
            "Weight": "0.15",
            "value":17463
        },
        {
            "Type":"Scordite",
            "Name": "Massive Scordite",
            "Weight": "0.15",
            "value":17464
        },
        {
            "Type":"Scordite",
            "Name": "Glossy Scordite",
            "Weight": "0.15",
            "value":46687
        },
        {
            "Type":"Pyroxeres",
            "Name": "Pyroxeres",
            "Weight": "0.30",
            "value":1224
        },
        {
            "Type":"Pyroxeres",
            "Name": "Solid Pyroxeres",
            "Weight": "0.30",
            "value":17459
        },
        {
            "Type":"Pyroxeres",
            "Name": "Viscous Pyroxeres",
            "Weight": "0.30",
            "value":17460
        },
        {
            "Type":"Pyroxeres",
            "Name": "Opulent Pyroxeres",
            "Weight": "0.30",
            "value":46686
        },
        {
            "Type":"Plagioclase",
            "Name": "Plagioclase",
            "Weight": "0.35",
            "value":18
        },
        {
            "Type":"Plagioclase",
            "Name": "Azure Plagioclase",
            "Weight": "0.35",
            "value":17455
        },
        {
            "Type":"Plagioclase",
            "Name": "Rich Plagioclase",
            "Weight": "0.35",
            "value":17456
        },
        {
            "Type":"Plagioclase",
            "Name": "Sparkling Plagioclase",
            "Weight": "0.35",
            "value":46685
        },
        {
            "Type":"Omber",
            "Name": "Omber",
            "Weight": "0.60",
            "value":1227
        },
        {
            "Type":"Omber",
            "Name": "Silvery Omber",
            "Weight": "0.60",
            "value":17867
        },
        {
            "Type":"Omber",
            "Name": "Golden Omber",
            "Weight": "0.60",
            "value":17868
        },
        {
            "Type":"Omber",
            "Name": "Platinoid Omber",
            "Weight": "0.60",
            "value":46684
        },
        {
            "Type":"Kernite",
            "Name": "Kernite",
            "Weight": "1.20",
            "value":20
        },
        {
            "Type":"Kernite",
            "Name": "Luminous Kernite",
            "Weight": "1.20",
            "value":17452
        },
        {
            "Type":"Kernite",
            "Name": "Fiery Kernite",
            "Weight": "1.20",
            "value":17453
        },
        {
            "Type":"Kernite",
            "Name": "Resplendant Kernite",
            "Weight": "1.20",
            "value":46683
        },
        {
            "Type":"Jaspet",
            "Name": "Jaspet",
            "Weight": "2.00",
            "value":1226
        },
        {
            "Type":"Jaspet",
            "Name": "Pure Jaspet",
            "Weight": "2.00",
            "value":17448
        },
        {
            "Type":"Jaspet",
            "Name": "Pristine Jaspet",
            "Weight": "2.00",
            "value":17449
        },
        {
            "Type":"Jaspet",
            "Name": "Immaculate Jaspet",
            "Weight": "2.00",
            "value":46682
        },
        {
            "Type":"Hemorphite",
            "Name": "Hemorphite",
            "Weight": "3.00",
            "value":1231
        },
        {
            "Type":"Hemorphite",
            "Name": "Vivid Hemorphite",
            "Weight": "3.00",
            "value":17444
        },
        {
            "Type":"Hemorphite",
            "Name": "Radiant Hemorphite",
            "Weight": "3.00",
            "value":17445
        },
        {
            "Type":"Hemorphite",
            "Name": "Scintillating Hemorphite",
            "Weight": "3.00",
            "value":46681
        },
        {
            "Type":"Hedbergite",
            "Name": "Hedbergite",
            "Weight": "3.00",
            "value":21
        },
        {
            "Type":"Hedbergite",
            "Name": "Vitric Hedbergite",
            "Weight": "3.00",
            "value":17440
        },
        {
            "Type":"Hedbergite",
            "Name": "Glazed Hedbergite",
            "Weight": "3.00",
            "value":17441
        },
        {
            "Type":"Hedbergite",
            "Name": "Lustrous Hedbergite",
            "Weight": "3.00",
            "value":46680
        },
        {
            "Type":"Gneiss",
            "Name": "Gneiss",
            "Weight": "5.00",
            "value":1229
        },
        {
            "Type":"Gneiss",
            "Name": "Iridescent Gneiss",
            "Weight": "5.00",
            "value":17865
        },
        {
            "Type":"Gneiss",
            "Name": "Prismatic Gneiss",
            "Weight": "5.00",
            "value":17866
        },
        {
            "Type":"Gneiss",
            "Name": "Brilliant Gneiss",
            "Weight": "5.00",
            "value":46679
        },
        {
            "Type":"Dark Ochre",
            "Name": "Dark Ochre",
            "Weight": "8.00",
            "value":1232
        },
        {
            "Type":"Dark Ochre",
            "Name": "Onyx Ochre",
            "Weight": "8.00",
            "value":17436
        },
        {
            "Type":"Dark Ochre",
            "Name": "Obsidian Ochre",
            "Weight": "8.00",
            "value":17437
        },
        {
            "Type":"Dark Ochre",
            "Name": "Jet Ochre",
            "Weight": "8.00",
            "value":46675
        },
        {
            "Type":"Spodumain",
            "Name": "Spodumain",
            "Weight": "16.00",
            "value":19
        },
        {
            "Type":"Spodumain",
            "Name": "Bright Spodumain",
            "Weight": "16.00",
            "value":17466
        },
        {
            "Type":"Spodumain",
            "Name": "Gleaming Spodumain",
            "Weight": "16.00",
            "value":17467
        },
        {
            "Type":"Spodumain",
            "Name": "Dazzling Spodumain",
            "Weight": "16.00",
            "value":46688
        },
        {
            "Type":"Crokite",
            "Name": "Crokite",
            "Weight": "16.00",
            "value":1225
        },
        {
            "Type":"Crokite",
            "Name": "Sharp Crokite",
            "Weight": "16.00",
            "value":17432
        },
        {
            "Type":"Crokite",
            "Name": "Crystalline Crokite",
            "Weight": "16.00",
            "value":17433
        },
        {
            "Type":"Crokite",
            "Name": "Pellucid Crokite",
            "Weight": "16.00",
            "value":46677
        },
        {
            "Type":"Bistot",
            "Name": "Bistot",
            "Weight": "16.00",
            "value":1223
        },
        {
            "Type":"Bistot",
            "Name": "Triclinic Bistot",
            "Weight": "16.00",
            "value":17428
        },
        {
            "Type":"Bistot",
            "Name": "Monoclinic Bistot",
            "Weight": "16.00",
            "value":17429
        },
        {
            "Type":"Bistot",
            "Name": "Cubic Bistot",
            "Weight": "16.00",
            "value":46676
        },
        {
            "Type":"Arkonor",
            "Name": "Arkonor",
            "Weight": "16.00",
            "value":22
        },
        {
            "Type":"Arkonor",
            "Name": "Crimson Arkonor",
            "Weight": "16.00",
            "value":17425
        },
        {
            "Type":"Arkonor",
            "Name": "Prime Arkonor",
            "Weight": "16.00",
            "value":17426
        },
        {
            "Type":"Arkonor",
            "Name": "Flawless Arkonor",
            "Weight": "16.00",
            "value":46678
        },
        {
            "Type":"Mercoxit",
            "Name": "Mercoxit",
            "Weight": "40.00",
            "value":11396
        },
        {
            "Type":"Mercoxit",
            "Name": "Magma Mercoxit",
            "Weight": "40.00",
            "value":17869
        },
        {
            "Type":"Mercoxit",
            "Name": "Vitreous Mercoxit",
            "Weight": "40.00",
            "value":17870
        },
        {
            "Type":"Clear Icicle",
            "Name": "Clear Icicle",
            "Weight": "1000",
            "value":16262
        },
        {
            "Type":"Clear Icicle",
            "Name": "Enriched Clear Icicle",
            "Weight": "1000",
            "value":17978
        },
        {
            "Type":"White Glaze",
            "Name": "White Glaze",
            "Weight": "1000",
            "value":16265
        },
        {
            "Type":"White Glaze",
            "Name": "Pristine White Glaze",
            "Weight": "1000",
            "value":17976
        },
        {
            "Type":"Blue Ice",
            "Name": "Blue Ice",
            "Weight": "1000",
            "value":16264
        },
        {
            "Type":"Blue Ice",
            "Name": "Thick Blue Ice",
            "Weight": "1000",
            "value":17975
        },
        {
            "Type":"Glacial Mass",
            "Name": "Glacial Mass",
            "Weight": "1000",
            "value":16263
        },
        {
            "Type":"Glacial Mass",
            "Name": "Smooth Glacial Mass",
            "Weight": "1000",
            "value":17977
        },
        {
            "Type":"Glare Crust",
            "Name": "Glare Crust",
            "Weight": "1000",
            "value":16266
        },
        {
            "Type":"Dark Glitter",
            "Name": "Dark Glitter",
            "Weight": "1000",
            "value":16267
        },
        {
            "Type":"Gelidus",
            "Name": "Gelidus",
            "Weight": "1000",
            "value":16268
        },
        {
            "Type":"Krystallos",
            "Name": "Krystallos",
            "Weight": "1000",
            "value":16269
        }
    ];
    let mineralList = [
        {
            "Name": "Tritanium",
            "Weight": 0.01,
            "value": 34
        },
        {
            "Name": "Pyerite",
            "Weight": 0.01,
            "value": 35
        },
        {
            "Name": "Mexallon",
            "Weight": 0.01,
            "value": 36
        },
        {
            "Name": "Isogen",
            "Weight": 0.01,
            "value": 37
        },
        {
            "Name": "Nocxium",
            "Weight": 0.01,
            "value": 38
        },
        {
            "Name": "Zydrine",
            "Weight": 0.01,
            "value": 39
        },
        {
            "Name": "Megacyte",
            "Weight": 0.01,
            "value": 40
        },
        {
            "Name": "Morphite",
            "Weight": 0.01,
            "value": 11399
        },
        {
            "Name": "Heavy Water",
            "Weight": 0.4,
            "value": 16272
        },
        {
            "Name": "Liquid Ozone",
            "Weight": 0.4,
            "value": 16273
        },
        {
            "Name": "Strontium",
            "Weight": 3,
            "value": 16275
        },
        {
            "Name": "Oxygen Isotopes",
            "Weight": 0.03,
            "value": 17887
        },
        {
            "Name": "Helium Isotopes",
            "Weight": 0.03,
            "value": 16274
        },
        {
            "Name": "Hydrogen Isotopes",
            "Weight": 0.03,
            "value": 17889
        },
        {
            "Name": "Nitrogen Isotopes",
            "Weight": 0.03,
            "value": 17888
        },
    ];
    let oreContents = [
        {
            "Name": "Veldspar",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 415
                }
            ]
        },
        {
            "Name": "Concentrated Veldspar",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                }
            ]
        },
        {
            "Name": "Dense Veldspar",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                }
            ]
        },
        {
            "Name": "Stable Veldspar",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                }
            ]
        },
        {
            "Name": "Scordite",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 346
                },
                {
                    "Name": "Pyerite",
                    "Amount": 173
                }
            ]
        },
        {
            "Name": "Condensed Scordite",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 364
                },
                {
                    "Name": "Pyerite",
                    "Amount": 182
                }
            ]
        },
        {
            "Name": "Massive Scordite",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 381
                },
                {
                    "Name": "Pyerite",
                    "Amount": 190
                }
            ]
        },
        {
            "Name": "Glossy Scordite",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 398
                },
                {
                    "Name": "Pyerite",
                    "Amount": 199
                }
            ]
        },
        {
            "Name": "Pyroxeres",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 351
                },
                {
                    "Name": "Pyerite",
                    "Amount": 25
                },
                {
                    "Name": "Mexallon",
                    "Amount": 50
                },
                {
                    "Name": "Nocxium",
                    "Amount": 5
                }
            ]
        },
        {
            "Name": "Solid Pyroxeres",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 369
                },
                {
                    "Name": "Pyerite",
                    "Amount": 26
                },
                {
                    "Name": "Mexallon",
                    "Amount": 53
                },
                {
                    "Name": "Nocxium",
                    "Amount": 5
                }
            ]
        },
        {
            "Name": "Viscous Pyroxeres",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 387
                },
                {
                    "Name": "Pyerite",
                    "Amount": 27
                },
                {
                    "Name": "Mexallon",
                    "Amount": 55
                },
                {
                    "Name": "Nocxium",
                    "Amount": 5
                }
            ]
        },
        {
            "Name": "Opulent Pyroxeres",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 404
                },
                {
                    "Name": "Pyerite",
                    "Amount": 29
                },
                {
                    "Name": "Mexallon",
                    "Amount": 58
                },
                {
                    "Name": "Nocxium",
                    "Amount": 6
                }
            ]
        },
        {
            "Name": "Plagioclase",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 404
                },
                {
                    "Name": "Pyerite",
                    "Amount": 29
                },
                {
                    "Name": "Mexallon",
                    "Amount": 58
                },
                {
                    "Name": "Nocxium",
                    "Amount": 6
                }
            ]
        },
        {
            "Name": "Azure Plagioclase",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 404
                },
                {
                    "Name": "Pyerite",
                    "Amount": 29
                },
                {
                    "Name": "Mexallon",
                    "Amount": 58
                },
                {
                    "Name": "Nocxium",
                    "Amount": 6
                }
            ]
        },
        {
            "Name": "Rich Plagioclase",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 404
                },
                {
                    "Name": "Pyerite",
                    "Amount": 29
                },
                {
                    "Name": "Mexallon",
                    "Amount": 58
                },
                {
                    "Name": "Nocxium",
                    "Amount": 6
                }
            ]
        },
        {
            "Name": "Sparkling Plagioclase",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 404
                },
                {
                    "Name": "Pyerite",
                    "Amount": 29
                },
                {
                    "Name": "Mexallon",
                    "Amount": 58
                },
                {
                    "Name": "Nocxium",
                    "Amount": 6
                }
            ]
        },
        {
            "Name": "Spodumain",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                },
                {
                    "Name": "Pyerite",
                    "Amount": 12050
                },
                {
                    "Name": "Mexallon",
                    "Amount": 2100
                },
                {
                    "Name": "Isogen",
                    "Amount": 450
                }
            ]
        },
        {
            "Name": "Bright Spodumain",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                },
                {
                    "Name": "Pyerite",
                    "Amount": 12050
                },
                {
                    "Name": "Mexallon",
                    "Amount": 2100
                },
                {
                    "Name": "Isogen",
                    "Amount": 450
                }
            ]
        },
        {
            "Name": "Gleaming Spodumain",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                },
                {
                    "Name": "Pyerite",
                    "Amount": 12050
                },
                {
                    "Name": "Mexallon",
                    "Amount": 2100
                },
                {
                    "Name": "Isogen",
                    "Amount": 450
                }
            ]
        },
        {
            "Name": "Dazzling Spodumain",
            "contents": [
                {
                    "Name": "Tritanium",
                    "Amount": 56000
                },
                {
                    "Name": "Pyerite",
                    "Amount": 12050
                },
                {
                    "Name": "Mexallon",
                    "Amount": 2100
                },
                {
                    "Name": "Isogen",
                    "Amount": 450
                }
            ]
        },
    ];

    /*$log.debug("#################");
    $log.debug(oreMainList);
    $log.debug("#################");*/

    this.pchars = function(){
        console.log(charList);
        return charList;
    };

    this.addChar = function(name){
        console.log("In service: " + name);
        charList.push({"name":name});
    };

    this.getOre = function(ore){
        $log.debug("Ore name: ", ore);
        if(ore == undefined || ore == ''){
            $log.debug(oreMainList);
            return oreMainList;
        }else {
            let index = oreMainList.map(function(e){return e.Name}).indexOf(ore);
            $log.debug(index);
            if(index >= 0 && index <= oreMainList.length) {
                console.log(index);
                let tes = [oreMainList[index]];
                console.log(tes);
                return tes;
            }else{
                let arr = [
                    {
                        Name:"The ore could not be found in the list"
                    }
                ];
                $log.debug("Returns Ore: ",arr);
                return arr;
            }
        }
    };

    this.getMineral = function(mineral){
        $log.debug("Ore name: ", mineral);
        if(mineral == undefined || mineral == ''){
            $log.debug(mineralList);
            return mineralList;
        }else {
            let index = mineralList.map(function(e){return e.Name}).indexOf(mineral);
            $log.debug(index);
            if(index >= 0 && index <= mineralList.length) {
                console.log(index);
                let tes = [mineralList[index]];
                console.log(tes);
                return tes;
            }else{
                let arr = [
                    {
                        Name:"The mineral could not be found in the list"
                    }
                ];
                $log.debug("Returns Mineral: ",arr);
                return arr;
            }
        }
    };

    this.addTransaction = function(e){
        transactionList.push(e);
    };

    this.getTotProper = function () {
        return totproper;
    };

    this.setTotProper = function (tp) {
        totproper = tp;
        $log.debug("trans-service");
        $log.debug(totproper);
    };

    this.getTransactions = function(name){
        if(name == undefined || name == ''){
            //$log.debug(transactionList);
            return transactionList;
        }
    };

    this.roundNumber = function(num, scale) {
        if(!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + scale)  + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = "";
            if(+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    };

    this.getPrice = function(ID, pos){
        let that = this;
        $http
            .get('https://evepraisal.com/item/'+ ID +'.json?persist=no')
            .then(function(response){
                //$log.debug(response.data.summaries[1].prices.buy.median);
                    oreMainList[pos].value = that.roundNumber(response.data.summaries[1].prices.buy.median, 2);
                }
            );
    };
        for(let i = 0; i < oreMainList.length; i++){
          this.getPrice(oreMainList[i].value, i);
        }
    this.getPriceFromList = function(t){
            let i = oreMainList.findIndex(x => x.Name === t);
            $log.debug("I = " + i);
            /*$log.debug("###");
            $log.debug(oreMainList[i].value);
            $log.debug("###");*/
            return oreMainList[i].value;
    };

    this.getMineralPrice = function(ID, pos){
      let that = this;
      $http
          .get('https://evepraisal.com/item/'+ ID +'.json?persist=no')
          .then(function(response){
            mineralList[pos].value = that.roundNumber(response.data.summaries[1].prices.buy.median, 2);
        });
    };
    for(let i = 0; i < mineralList.length; i++){
        this.getMineralPrice(mineralList[i].value, i);
    }
    this.setFee = function(amount){
        fee = amount;
    };
    this.getFee = function(){
      return fee;
    };
});