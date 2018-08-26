from setuptools import setup, find_packages


with open('../README.md') as f:
    readme = f.read()

with open('../LICENSE') as f:
    license = f.read()

setup(
    name='pae',
    version='1.0.0',
    description='Pixel Approximate Entropy',
    long_description=readme,
    long_description_content_type='text/markdown',
    url='https://github.com/gryan11/pae',
    author='Gabriel Ryan',
    author_email='gabriel.ryan@columbia.edu',
    install_requires=['numpy'],
    setup_requires=['pytest-runner'],
    tests_require=['pytest'],
    packages=find_packages(exclude=('tests', 'docs'))
)
