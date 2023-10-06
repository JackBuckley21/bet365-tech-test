window.Bet365 = window.Bet365 || {};
window.Bet365.views = window.Bet365.views || {};

window.Bet365.views.BaseView = (function (win) {
    function BaseView(rootElementId) {
        this.rootElementId = rootElementId;
        this.rootElement = document.getElementById(this.rootElementId);
    }

    BaseView.prototype.render = function () {
        throw new Error("This class must be extended to provide rendering functionality");
    };

    return BaseView;
})(this);
