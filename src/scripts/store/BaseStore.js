window.Bet365 = window.Bet365 || {};
window.Bet365.store = window.Bet365.store || {};

window.Bet365.store.BaseStore = (function () {
  const BaseStore = function (Model, data) {
    this.Model = Model;
    this.data = data;
    this.events = {};
  };

  BaseStore.prototype.copyData = function (data) {
    return data.map(item => ({ ...item }));
  };

  BaseStore.prototype.forEach = function (forEachFunc) {
    this.data.forEach((item, index) => {
      forEachFunc(new this.Model(item), index);
    });
  };

  BaseStore.prototype.on = function (eventName, eventHandler) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(eventHandler);
  };

  BaseStore.prototype.fire = function (eventName, arguments) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(handler => {
        handler.call(this, arguments);
      });
    }
  };

  return BaseStore;
})();
