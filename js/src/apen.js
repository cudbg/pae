export default class ApEn {
  constructor(m, r) {
    this.m = m;
    this.r = r;
  }
  apen(U) {
    let m = this.m;
    let r = this.r;

    var N = U.length;

    function _maxdist(x_i, x_j) {
      var max = 0;
      for (var i=0; i<x_i.length; i++) {
        var dist = Math.abs(x_i[i] - x_j[i]);
        if (dist > max) {
          max = dist;
        }
      }
      return max;
      // return max([abs(ua - va) for ua, va in zip(x_i, x_j)]);
    }

    function _phi(m) {
      var x = [];
      for (let i=0; i<N-m+1; i++) {
        let sub = [];
        for (let j=i; j<i+m; j++) {
          sub.push(U[j]);
        }
        x.push(sub);
      }

      var C = [];
      for (let i=0; i<x.length; i++) {
        let sub = [];
        for (let j=0; j<x.length; j++) {
          if (_maxdist(x[i], x[j]) <= r) {
            sub.push(1);
          }
        }
        C.push(sub.length / (N - m + 1));
      }
      return (1/(N - m +1)) * C.map(Math.log)
        .reduce(function (acc, val) {return acc + val;});
    }

    return Math.abs(_phi(m + 1) - _phi(m));
  }
}
