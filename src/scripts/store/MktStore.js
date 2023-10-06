window.Bet365 = window.Bet365 || {};
window.Bet365.store = window.Bet365.store || {};

window.Bet365.store.MktStore = (function (win) {
  const BaseStore = window.Bet365.store.BaseStore;

  function MktStore() {
    BaseStore.apply(this, arguments);
    this.history = [this.data];
    this.highestPrice = this.getHighestPrice(0, this.data);
    this.lowestPrice = this.getLowestPrice(this.highestPrice, this.data);
    this.totalTime = 0;
  }

  MktStore.prototype = Object.create(BaseStore.prototype);

  MktStore.prototype.getUpdateHistory = function () {
    return this.history;
  };

  MktStore.prototype.updateDeltas = function (rows, tick) {
    rows.forEach((row, i) => {
      const [_, __, price, change, chgPercent] = row;

      if (price.length > 0) {
        this.data[i]["Price"] = price;
        this.fire("updatedModel", [i, "Price", price]);
      }

      if (change.length > 0) {
        this.data[i]["Change"] = change;
        this.fire("updatedModel", [i, "Change", change]);
      }

      if (chgPercent.length > 0) {
        this.data[i]["Chg %"] = chgPercent;
        this.fire("updatedModel", [i, "Chg %", chgPercent]);
      }

      this.data[i]["tick"] =
        this.history.length > 1
          ? this.history[this.history.length - 1][0]["tick"] + parseInt(tick)
          : parseInt(tick);
    });

    this.highestPrice = this.getHighestPrice(this.highestPrice, this.data);
    this.lowestPrice = this.getLowestPrice(this.lowestPrice, this.data);
    this.setTotalTime(tick);
    this.history.push(this.copyData(this.data));
    this.fire("updatedCollection");
  };

  MktStore.prototype.setTotalTime = function (tick) {
    this.totalTime += parseInt(tick);
  };

  MktStore.prototype.getLowestPrice = function (lowestPrice, data) {
    return Math.min(lowestPrice, ...data.map((item) => parseInt(item["Price"])));
  };

  MktStore.prototype.getHighestPrice = function (highestPrice, data) {
    return Math.max(highestPrice, ...data.map((item) => parseInt(item["Price"])));
  };

  return MktStore;
})(this);
