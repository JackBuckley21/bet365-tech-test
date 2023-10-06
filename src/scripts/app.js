window.Bet365 = window.Bet365 || {};

window.Bet365.app = (function (win) {
  var gridView,
    MktStoreData,
    deltaCSVParser,
    getStatsBtn;

  var init = function (){
    var isUpdating = false,
      CSVParser = win.Bet365.fileReaders.CSVParser,
      DeltaCSVParser = win.Bet365.fileReaders.DeltaCSVParser,
      MktStoreData = win.Bet365.store.MktStore,
      BaseModel = win.Bet365.model.BaseModel,
      GridView = win.Bet365.views.GridView;

    csvParser = new CSVParser("/data/snapshot.csv");

    csvParser.getCSVAsList(function (list) {
      MktStoreData = new MktStoreData(BaseModel, list);
      gridView = new GridView("grid-view", MktStoreData);

      gridView.render();

      deltaCSVParser = new DeltaCSVParser("/data/deltas.csv");

      deltaCSVParser.on("updated", (args) => {
        MktStoreData.updateDeltas(args[0], args[1], gridView);
      });

      getStatsBtn = document.getElementById("import-data");

      getStatsBtn.addEventListener("click", function (ev) {
        ev.preventDefault();

        if (!isUpdating) {
          isUpdating = true;
          deltaCSVParser.getDeltas();
        }
      });
    });
  };

  return {
    init,
  };
})(window);
