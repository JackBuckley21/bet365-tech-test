window.Bet365 = window.Bet365 || {};
window.Bet365.views = window.Bet365.views || {};

window.Bet365.views.GridView = (function (win) {

    var BaseView = window.Bet365.views.BaseView;

    var GridView = function (rootElementId, collection) {

        var self = this;

        BaseView.call(this, rootElementId);

        this.collection = collection;

        this.collection.on("updatedModel", function (args) {

            self.updateDeltasInDOM(args[0], args[1], args[2]);
        });
    };


    GridView.prototype = Object.create(BaseView.prototype);

    GridView.prototype.updateDeltasInDOM = function (index, fieldName, value) {

        var tableCell = document.getElementById(fieldName.replace(" ", "-") + "-" + index);
        tableCell.textContent = value;
        tableCell.classList.add("updated");
        setTimeout(function(){
            tableCell.classList.remove("updated");
        }, 666)
    };

    GridView.prototype.render = function () {

        var tableCell,
            tableRow,
            headingCell,
            headingData = ["Name", "Company Name", "Price", "Change", "Chg %", "Mkt Cap"],
            headingDataLen = headingData.length,
            table = document.createElement("table"),
            thead = document.createElement("thead"),
            tbody = document.createElement("tbody"),
            tableHeadingRow = document.createElement("tr");

        for (var i = 0; i < headingDataLen; i++) {

            headingCell = document.createElement("th");
            tableHeadingRow.appendChild(headingCell);
            headingCell.textContent = headingData[i];
        }

        thead.appendChild(tableHeadingRow);
        table.appendChild(thead);

        var documentFragment = document.createDocumentFragment();

        this.collection.forEach(function (model, index) {

            tableRow = document.createElement("tr");

            for (var i = 0; i < headingDataLen; i++) {

                tableCell = document.createElement("td");
                tableCell.textContent = model.get(headingData[i]);
                tableCell.id = headingData[i].replace(" ", "-") + "-" + index;
                tableRow.appendChild(tableCell);
            }
            if (index % 2 == 0) {
                tableRow.classList.add("odd");
            }

            documentFragment.appendChild(tableRow);
        });

        tbody.appendChild(documentFragment);
        table.appendChild(tbody);

        table.classList.add("gridview__datatable")

        this.rootElement.appendChild(table);
    };

    return GridView;

})(this);
