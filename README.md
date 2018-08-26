# pae

This repository shares implementations of Pixel Approximate Entropy, a visual complexity measure for estimating how easy line charts are to read. A detailed description of our research is presented in our recent IEEE InfoVIS 2018 paper [At a Glance: Pixel Approximate Entropy as a Measure of Line Chart Complexity](https://www.dropbox.com/s/9jipqhq1yqgn5yt/glance-infovis18-camera.pdf?dl=0). 

For an example of PAE, considering the two following charts.

TODO put charts here

The one on the left, an increasing line, is intuitively simpler and easier to read. PAE can be used to determine this analytically: the chart on the right has a PAE of NNN, while the chart on the right has a PAE of NNN.

We see PAE as a potentially useful tool in line chart recommendations and automatic simplification, since simplifying a chart will reduce its PAE. This can be seen in the following chart.


We provide implementations of PAE in python and javascript.

## Python

The python pae package can be installed with pip:

```sh
pip install pae

```

Once installed, the `PAEMeasure` class can be instantiated with the width and height of the chart in pixels. There are also parameters for the _m_ and _r_ parameters of ApEn that default to values in the paper of _2_ and _20.0_.

```python
from pae import PAEMeasure

pae_meas = PAEMeasure(300, 200)
```

The PAEMeasure class can then be used to evaluate the PAE of any one dimensional python list or numpy array with its given parameters.

```python
import numpy as np

x = np.linspace(0,2,300)
linear_chart = x*0.5 - 0.5

print('PAE of chart is {}'.format(pae_meas.pae(linear_chart)))
```

