import numpy as np


class ApEn:

    def __init__(self, m, r):
        self.m = m
        self.r = r

    def approx_entropy(self, x):
        
        if (type(x) != np.ndarray):
            x = np.array(x)
        
        if (x.ndim != 1):
            raise ValueError("Input must be 1 dimensional.")

        N = x.shape[0]
        m = self.m
        r = self.r

        def _d(x_i, x_j):
            return np.max(np.abs(x_i - x_j), 1)

        def _phi(N, m, r, x):
            s = np.empty((N - m + 1, m))
            for i in range(N - m + 1):
                s[i,:] = x[i:i+m]
            
            C = np.zeros((N - m + 1,))
            for i in range(N - m +1):
                C += np.less_equal(_d(s, np.roll(s, i, axis=0)), r)
            C /= (N - m + 1.0)
              
            return (N - m + 1.0)**(-1) * np.sum(np.log(C))
            
        return abs(_phi(N, m + 1, r, x) - _phi(N, m, r, x))


class Scale:

    def __init__(self, h, w):
        self.h = h
        self.w = w


    def scale(self, y):

        if (type(y) != np.ndarray):
            y = np.array(y)

        if (y.ndim != 1):
            raise ValueError("Input must be 1 dimensional.")

        h = self.h
        w = self.w

        y2 = np.interp(np.linspace(0, y.size-1, w), np.arange(y.size), y)
        y3 = y2 - np.min(y2)
        y4 = y3 * (h/np.max(y3))
        return y4


class PAE:

    def __init__(self, h, w, m=2, r=20.0):
        self.scale = Scale(h, w)
        self.apen = ApEn(m, r)

    def pae(self, x):
        x_scaled = self.scale.scale(x)
        return self.apen.approx_entropy(x_scaled)

