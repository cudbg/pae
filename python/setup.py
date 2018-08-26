from setuptools import setup, find_packages


# with open('README.rst') as f:
    # readme = f.read()

# with open('LICENSE') as f:
    # license = f.read()

setup(
    name='pae',
    version='1.0.0',
    description='Pixel Approximate Entropy',
    author='Gabriel Ryan',
    author_email='gabriel.ryan@columbia.edu',
    install_requires=['numpy'],
    setup_requires=['pytest-runner'],
    tests_require=['pytest'],
    packages=find_packages(exclude=('tests', 'docs'))
)
