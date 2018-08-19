import ApEn from './apen.js';
import Scale from './scale.js';

export default class PAE {
  constructor(m, r, width, height) {
    this.apen = new ApEn(m, r);
    this.scale = new Scale(width, height);
  }
  pae(U) {
    U = this.scale.scale(U);
    return this.apen.apen(U);
  }
}
