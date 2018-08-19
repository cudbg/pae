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
    console.log(newData[i]);
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
    console.log(y);
    let y2 = interp(y, this.width);
    console.log(y2);
    console.log(Math.min(...y2));
    let y3 = y2 - Math.min(...y2);
    console.log(y3);
    let y4 = y3 * (this.height/Math.max(...y3));
    console.log(y4);

    return y4;
  }
}
