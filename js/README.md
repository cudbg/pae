# Pixel Approximate Entropy

This repository shares implementations of Pixel Approximate Entropy, a visual complexity measure for estimating how easy line charts are to read. A detailed description of our research is presented in our recent IEEE InfoVIS 2018 paper [At a Glance: Pixel Approximate Entropy as a Measure of Line Chart Complexity](https://www.dropbox.com/s/9jipqhq1yqgn5yt/glance-infovis18-camera.pdf?dl=0). 

## Usage

The javascript package can be installed with npm:

```sh
npm i pae
```

Optionally use the `--save` option to add to `package.json` dependencies.

The package can then be included in your `index.html` with:

```html
<script src="node_modules/pae/lib/pae.js"></script>
```


Alternately, you can just include `pae` from jsdelivr cdn:

```html
<script src="https://cdn.jsdelivr.net/npm/pae/lib/pae.js"></script>
```

Once you have included pae in your webpage, it can be used as follows:

```js
var pae_meas = new pae.PAE(300, 200);
console.log(pae_meas.pae(data)); // data is javascript array of numbers
```
