window.Bet365 = window.Bet365 || {};
window.Bet365.fileReaders = window.Bet365.fileReaders || {};

window.Bet365.fileReaders.CSVParser = (function(win){



    var CsvParser = function(path){

        this.path = path;
        this.events = {};
    };

    CsvParser.prototype.getFile = function(path, callback){

        var request = new XMLHttpRequest();

        request.addEventListener("load", function(){

            callback(this.responseType, this.responseText);

        });

        request.open("GET", path);
        request.send();
    };

    CsvParser.prototype.setPath = function(path){

        this.path = path;
    };

    CsvParser.prototype.on = function(eventName, eventHandler){

        typeof this.events[eventName] === "undefined" ? this.events[eventName] = [eventHandler] : this.events[eventName].push(eventHandler);
    };

    CsvParser.prototype.fire = function(eventName, arguments){

        var eventsLen;

        if (typeof this.events[eventName] !== "undefined"){

            eventsLen = this.events[eventName].length;

            for (var i = 0; i < eventsLen; i++){

                this.events[eventName][i].call(this, arguments);
            }
        }
    };

    CsvParser.prototype.getCSVAsList = function(callback){

        this.getFile(this.path, function(responseType, responseText){

            var rowsLen,
                rowLen,
                rowArr,
                row,
                propValues,
                list = [],
                rows = responseText.split("\n");

            rowsLen = rows.length - 1;
            propValues = rows[0].split(",");
            rowLen = propValues.length;

            for (var i = 1; i < rowsLen; i++){

                rowArr = rows[i].split(",");
                row = {};

                for (var x = 0; x < rowLen;x++){

                    row[propValues[x]] = rowArr[x];
                }

                list.push(row);
            }

            callback(list);
        });
    };

    return CsvParser;

})(this);