import random
import numpy as np
    
    
def approx_entropy(x, m=2, r=20.0, use_std_r=False):
    
    N = x.shape[0]

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
        
    if use_std_r:
        r = r * np.std(x)
        
    return abs(_phi(N, m + 1, r, x) - _phi(N, m, r, x))

def id_scale(y):
    return y

def get_approx_entropy(m, r, scale=id_scale):
    
    def custom_approx_entropy(x):
    
        x = scale(x)
        N = x.shape[0]


        def _d(x_i, x_j):
            return np.max(np.abs(x_i - x_j), 1)

        def _phi(N, m, r, x):
            s = np.empty((N - m + 1, m))
            for i in range(N - m + 1):
                # try:
                    s[i,:] = x[i:i+m]
                # except Exception as e:
                    # print(s[i, :].shape, x[i:i+m].shape, i, m)
                    # raise e


            C = np.zeros((N - m + 1,))
            for i in range(N - m +1):
                C += np.less_equal(_d(s, np.roll(s, i, axis=0)), r)
            C /= (N - m + 1.0)

            return (N - m + 1.0)**(-1) * np.sum(np.log(C))

        return abs(_phi(N, m + 1, r, x) - _phi(N, m, r, x))
    
    return custom_approx_entropy


def sample_entropy(x, m=2, r=0.15, use_std_r=True):
    
    N = x.shape[0]

    def _d(x_i, x_j):
        return np.max(np.abs(x_i - x_j), 1)

    def _C(N, m, r, x):
        s = np.empty((N - m + 1, m))
        for i in range(N - m + 1):
            s[i,:] = x[i:i+m]
        
        C = np.zeros((N - m + 1,))
        for i in range(1, N - m +1):
            C += np.less_equal(_d(s, np.roll(s, i, axis=0)), r)
        C /= (N - m - 1.0)
          
        return np.sum(C) / (N - m)
        
    if use_std_r:
        r = r * np.std(x)
        
    A = _C(N, m+1, r, x)
    B = _C(N, m, r, x)
    return -np.log(A / B)


def triangle_noise(data, pts=1, dx=3):
    max_noise = np.std(data)
    noised = np.copy(data)
    inds = np.random.choice(range(0, noised.size - 1), pts)
    for ind in inds:
        noise = (random.random() - 0.5) * 2.0 * max_noise        
        for i in range(max(ind-dx, 0), min(ind+dx+1, noised.size)):
            noised[i] += noise * (1.0 - (abs((ind - i))/(dx+1.0)))
    return noised


def get_scale(h, w):
    def curry_scale(y):
        try:
            y2 = np.interp(np.linspace(0, y.size-1, w), np.arange(y.size), y)
        except Exception as e:
            print('error on y: '+str(y))
            raise e
            
        y3 = y2 - np.min(y2)
        y4 = y3 * (h/np.max(y3))
        return y4
    return curry_scale


def scale(y, h, w):
    try:
        y2 = np.interp(np.linspace(0, y.size-1, w), np.arange(y.size), y)
    except Exception as e:
        print('error on y: '+str(y))
        raise e

    y3 = y2 - np.min(y2)
    y4 = y3 * (h/np.max(y3))
    return y4


def step_noise_cb(i):
    step_size = 1
    dx = 3
    if i > 0:
        x5 = i // 5
        x10 = i // 10
        x20 = i // 20
        step_size += x5 + x10 + x20
        
        if i > 50:
            dx = 2
        if i > 100:
            dx = 1
        if i > 200:
            dx = 0

    return (step_size, dx)


def add_entropy(data, entropy_to_add,
                entropy_fcn=sample_entropy,
                noise_fcn=triangle_noise,
                scale=id_scale,
                step_cb=None,
                step_size=1, 
                max_steps=300,
                verbose=False):
    
    
    meas_entropy = approx_entropy(scale(data))
    target_entropy = meas_entropy + entropy_to_add
    
    return noise_to_entropy(data, target_entropy,
                            meas_entropy,
                            entropy_fcn,
                            noise_fcn, 
                            scale, 
                            step_cb,
                            step_size, 
                            max_steps,
                            verbose)
        

def noise_to_entropy(data, target_entropy,
                     meas_entropy=None,
                     entropy_fcn=approx_entropy,
                     noise_fcn=triangle_noise,
                     step_cb=None,
                     max_steps=300,
                     verbose=False):
    
    if meas_entropy is None:
        meas_entropy = entropy_fcn(data)
                
    noised = np.copy(data)
    i = 0
    noise_args = ()
    while (meas_entropy < target_entropy):
        if (i >= max_steps):
            if verbose:
                print('exceeded max iterations!')
            break
        if step_cb is not None:
            noise_args = step_cb(i)
            
        new_noised = noise_fcn(noised, *noise_args)
        new_meas_entropy = entropy_fcn(new_noised)
        
        if new_meas_entropy > meas_entropy:
            meas_entropy = new_meas_entropy
            noised = new_noised
        
        i += 1
    
    if verbose:
        print('noise iters: {}'.format(i))

    return noised


# def smooth(data, w):
def smooth(data, window_width, smooth_factor):
    # w = np.array([w_edge, 1.0, w_edge])
    w = np.hamming(window_width) + smooth_factor
    w = w/w.sum()
    
    tiles = len(w) // 2
    # print(tiles)
    startpad = np.tile(data[0], tiles)
    endpad = np.tile(data[-1], tiles)
    
    # print(startpad.shape, data.shape, endpad.shape)
    
    smoothed = np.convolve(np.concatenate([startpad, data, endpad]),
                           w, mode='valid')
    
    return smoothed
    
def smooth_to_entropy(data, target_entropy,
                      entropy_fcn=approx_entropy,
                      scale=id_scale,
                      max_steps=600,
                      verbose=False):
    
    meas_entropy = entropy_fcn(scale(data))
                
    smoothed = np.copy(data)
    i = 0
    width = 3
    w = 0
    while (meas_entropy > target_entropy):
        if (i >= max_steps):
            if verbose:
                print('exceeded max iterations!')
            break
        
        if i < 50:
            w += 0.0025
        else:# i < 100:
            w += 0.005
        # else:
        #     w += 0.01
            
        if i < 200:
            pass
            # if i%100 == 0:
            #     width += 2
        elif i < 400:
            if i%50 == 0:
                w = 0
                width += 2
        elif i < 550:
            if i%10 == 0:
                width += 2
        else:
            if i%5 == 0:
                width += 2
            
        smoothed = smooth(data, width, w)
        meas_entropy = entropy_fcn(scale(smoothed))
        
        i += 1
                
    if verbose:
        print('width: {} smoothing factor: {}'.format(width, w))
        print('smooth iters: {}'.format(i))
    return smoothed