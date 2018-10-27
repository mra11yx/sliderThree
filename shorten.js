Object.prototype.ev = function (evtNm, cbk) {
    return this.addEventListener(evtNm, cbk);
};

Object.prototype.multEvs = function (arrEvts, cbk) {
    arrEvts.forEach(function (el) {
        // add event listener with variable being input \'el\'
        return this.addEventListener(el, cbk);
    });
};