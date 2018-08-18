export default class Scale {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  scale(y) {
    let y2 = interp(y, this.width);
    let y3 = y2 - Math.min(...y2);
    let y4 = y3 * (this.height/Math.max(...y3));

    return y4;
  }
}

/* copied from https://stackoverflow.com/questions/26941168/javascript-interpolate-an-array-of-numbers */
function interp(data, fitCount) {

    var linearInterpolate = function (before, after, atPoint) {
        return before + (after - before) * atPoint;
    };

    var newData = new Array();
    var springFactor = new Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0]; // for new allocation
    for ( var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = new Number(Math.floor(tmp)).toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
};
