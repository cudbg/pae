import ApEn from './apen.js';
import Scale from './scale.js';

export default class PAE {
  constructor(width, height, m=2, r=20.0) {
    this.apen = new ApEn(m, r);
    this.scale = new Scale(width, height);
  }
  pae(U) {
    U = this.scale.scale(U);
    return this.apen.apen(U);
  }
}
