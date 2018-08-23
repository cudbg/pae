/* global describe, it, before */

import chai from 'chai';
//import {Scale, ApEn, PAE} from '../lib/pae.js';
import Scale from '../src/scale.js';
//import {ApEn} from '../src/apen.js';
//import {PAE} from '../src/pae.js';

chai.expect();

const expect = chai.expect;

let lib;
console.log(Scale);
let scale = new Scale(8, 9);
console.log(scale);
let scaled = scale.scale([1,3,1]);
console.log(scaled);

//describe('Given Scale', () => {
  //before(() => {
    //lib = new Scale(8, 9);
  //});
  //describe('when scaling', () => {
    //it('should return correct scaled', () => {
      //console.log('output:');
      //console.log(lib.scale([1,2,1]));
      //expect(lib.scale([1,3,1])).to.deep.equal([0., 2., 4., 6., 8., 6., 4., 2., 0.]);
    //});
  //});
//});

