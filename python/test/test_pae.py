import numpy as np

from pae import PAEMeasure


def test_linear():
    pae_meas = PAEMeasure(300, 200, 2, 20.0)

    x = np.linspace(0,2,300)
    linear_chart = x*0.5 - 0.5

    saved_lin_res = np.asscalar(np.load('test/linear_result.npy'))

    assert pae_meas.pae(linear_chart) == saved_lin_res

    # print(lin_res)
    # np.save('linear_result.npy', lin_res)



def test_complex():
    pae_meas = PAEMeasure(300, 200, 2, 20.0)

    complex_chart = np.load('test/noised.npy')

    saved_complex_res = np.asscalar(np.load('test/complex_result.npy'))
    assert pae_meas.pae(complex_chart) == saved_complex_res

if __name__ == "__main__":
    print('test_linear')
    test_linear()
    print('test_complex')
    test_complex()
