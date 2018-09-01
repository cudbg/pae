
import chai from 'chai';

import Scale from '../src/scale.js';
//import {ApEn} from '../src/apen.js';
import PAE from '../src/pae.js';

import {linear} from './linear.js';
import {noised} from './noised.js';

chai.expect();

const expect = chai.expect;

function round(num, dec_pts) {
  let shift = Math.pow(10, dec_pts);
  let num1 = num * shift;
  return Math.round(num1) / shift;
}

let lib;

describe('Given Scale', () => {
  before(() => {
    lib = new Scale(9, 8);
  });
  it('should return correct scaled', () => {
    expect(lib.scale([1,3,1])).to.deep.equal([0., 2., 4., 6., 8., 6., 4., 2., 0.]);
  });
});

describe('Given PAE', () => {
  before(() => {
    lib = new PAE(300, 200);
  });
  it('should return correct pae for linear chart', () => {
    expect(round(lib.pae(linear), 13)).to.deep.equal(0.0031469638707);
  });
  it('should return correct pae for complex chart', () => {
    expect(round(lib.pae(noised), 13)).to.deep.equal(1.0638669698183);
  });
});

