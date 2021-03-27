var executeWithTime = function (fn) {

    var startTime = new Date();

    var result = fn();

    var stopTime = new Date();

    return {
        result,
        startTime,
        stopTime,
        difference: stopTime.getSeconds() - startTime.getSeconds()
    }
}

export {
    executeWithTime
};