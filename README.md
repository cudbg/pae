# Pixel Approximate Entropy

This repository shares implementations of Pixel Approximate Entropy, a visual complexity measure for estimating how easy line charts are to read. A detailed description of our research is presented in our recent IEEE InfoVIS 2018 paper [At a Glance: Pixel Approximate Entropy as a Measure of Line Chart Complexity](https://www.dropbox.com/s/9jipqhq1yqgn5yt/glance-infovis18-camera.pdf?dl=0). 

For an example of PAE, considering the two following charts.

![Alt](/docs/imgs/linear.png) ![Alt](/docs/imgs/noised.png)

The first chart, an increasing line, is intuitively simpler and easier to read. PAE can be used to determine this analytically: the first chart has a PAE of 0.003, while the second chart has a PAE of 0.913.

We see PAE as a potentially useful tool in line chart recommendations and automatic simplification. For example, the second chart can smoothed to reduce its PAE to 0.253:

![Alt](/docs/imgs/smoothed.png)


We provide implementations of PAE in python and javascript.

## Python Usage

The python pae package can be installed with pip:

```sh
pip install pae

```

Once installed, the `PAEMeasure` class can be instantiated with the width and height of the chart in pixels. There are also parameters for the _m_ and _r_ parameters of ApEn that default to values in the paper of _2_ and _20.0_.

```python
from pae import PAEMeasure

pae_meas = PAEMeasure(300, 200) # equivalent to: PAEMeasure(300, 200, m=2, r=20.0)
```

The PAEMeasure class can then be used to evaluate the PAE of any one dimensional python list or numpy array with its given parameters.

```python
import numpy as np

x = np.linspace(0,2,300)
linear_chart = x*0.5 - 0.5

print('PAE of chart is {}'.format(pae_meas.pae(linear_chart)))
```

## Javascript Usage

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
console.log(pae_meas.pae(data)); # data is javascript array of numbers
```
