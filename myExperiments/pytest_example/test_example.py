from example import *

def test_add():
    assert add(1, 2) == 3
    assert add(1, -2) == -1
    assert add(1000000000000000000, 2) == 1000000000000000002

def test_multiply():
    assert multiply(2, 4) == 8
    assert multiply(-3, 2) == -6