/* copied from https://stackoverflow.com/questions/26941168/javascript-interpolate-an-array-of-numbers */
function interp(data, fitCount) {

  var linearInterpolate = function (before, after, atPoint) {
    return before + (after - before) * atPoint;
  };

  var newData = [];
  var springFactor = (data.length - 1) / (fitCount - 1);

  newData[0] = data[0];
  for ( var i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor;
    var before = Math.floor(tmp);
    var after = Math.ceil(tmp);
    var atPoint = tmp - before;

    newData[i] = linearInterpolate(data[before], data[after], atPoint);
  }
  newData[fitCount - 1] = data[data.length - 1]; // for new allocation
  return newData;
};

export default class Scale {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  scale(y) {
    let y2 = interp(y, this.width);
    let min = Math.min(...y2);
    let y3 = y2.map(val => val - min);
    let max = Math.max(...y3);
    let factor = 1;
    if (max) {
      factor = this.height/max;
    }
    let y4 = y3.map(val => val*factor);

    return y4;
  }
}
