var app = (function () {
    this.modules = {};
    this.$ = function (text) {
        var result = document.querySelectorAll(text);
        if (result.length == 1) {
            return result[0];
        }
        return result;
    }
    this.log = function () {
        console.log('Log', arguments);
    }
    return this;
})();