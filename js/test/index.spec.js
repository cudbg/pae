
import chai from 'chai';

import Scale from '../src/scale.js';
//import {ApEn} from '../src/apen.js';
import {PAE} from '../src/pae.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given Scale', () => {
  before(() => {
    lib = new Scale(9, 8);
  });
  it('should return correct scaled', () => {
    expect(lib.scale([1,3,1])).to.deep.equal([0., 2., 4., 6., 8., 6., 4., 2., 0.]);
  });
});

//describe('Given PAE', () => {
  //before(() => {
    //lib = new PAE(9, 8);
  //});
  //it('should return correct scaled', () => {
    //expect(lib.scale([1,3,1])).to.deep.equal([0., 2., 4., 6., 8., 6., 4., 2., 0.]);
  //});
//});

