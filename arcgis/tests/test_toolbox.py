# -*- coding: utf-8 -*-
"""
Tests for the ArcGIS Sbanks toolbox.

These tests can be run without ArcGIS to verify sbanks_core integration.
Full toolbox tests require ArcGIS Pro environment.
"""



def test_sbanks_core_import():
    """Test that sbanks_core can be imported."""
    import sys
    import os

    # Add vendor path (simulating what the toolbox does)
    current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    vendor_dir = os.path.join(current_dir, "vendor", "sbanks-lib")
    if vendor_dir not in sys.path:
        sys.path.insert(0, vendor_dir)

    from sbanks_core import WhittakerSmoother
    from sbanks_core import smooth_open_geometry, smooth_closed_geometry
    from sbanks_core.geometry import haversine_distance, calculate_cumulative_distances

    assert WhittakerSmoother is not None
    assert smooth_open_geometry is not None
    assert smooth_closed_geometry is not None
    assert haversine_distance is not None
    assert calculate_cumulative_distances is not None


def test_sbanks_core_basic_functionality():
    """Test basic functionality of sbanks_core without ArcGIS."""
    import numpy as np
    from sbanks_core import WhittakerSmoother, smooth_open_geometry

    # Test WhittakerSmoother
    n = 50
    y = np.sin(np.linspace(0, 4 * np.pi, n)) + 0.1 * np.random.randn(n)
    smoother = WhittakerSmoother(lmbda=1e4, order=2, data_length=n)
    y_smooth = smoother.smooth(y.tolist())
    assert len(y_smooth) == n

    # Test smooth_open_geometry
    x = np.linspace(0, 10, 30)
    y = np.sin(x) + 0.1 * np.random.randn(30)
    x_sm, y_sm = smooth_open_geometry(x, y, 11, 3)
    assert len(x_sm) == 30
    assert x_sm[0] == x[0]
    assert x_sm[-1] == x[-1]


# Full toolbox tests would require ArcGIS Pro environment
# and would test the actual tool execution
