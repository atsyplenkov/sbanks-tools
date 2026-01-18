# -*- coding: utf-8 -*-
"""
Tests for the QGIS Sbanks algorithms.

These tests require a QGIS environment to run.
Use: apptainer exec ~/Soft/qgis_ltr.sif bash -c \
     "cd /path/to/sbanks-tools/qgis && PYTHONPATH=. pytest -v tests/"
"""

import pytest


def test_sbanks_core_import():
    """Test that sbanks_core can be imported."""
    from sbanks_core import WhittakerSmoother
    from sbanks_core import smooth_open_geometry, smooth_closed_geometry
    from sbanks_core.geometry import haversine_distance, calculate_cumulative_distances

    assert WhittakerSmoother is not None
    assert smooth_open_geometry is not None
    assert smooth_closed_geometry is not None
    assert haversine_distance is not None
    assert calculate_cumulative_distances is not None


def test_sbanks_core_basic_functionality():
    """Test basic functionality of sbanks_core without QGIS."""
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
    # Endpoints should be preserved
    assert x_sm[0] == x[0]
    assert x_sm[-1] == x[-1]


# Tests below require QGIS environment
@pytest.mark.skipif(
    not pytest.importorskip("qgis", reason="QGIS not available"),
    reason="QGIS not available"
)
class TestQGISAlgorithms:
    """Tests that require QGIS environment."""

    def test_algorithm_import(self):
        """Test that algorithm classes can be imported."""
        from sbanks.sbanks_algorithm import SbanksAlgorithm
        from sbanks.sbanks_whittaker_algorithm import WhittakerAlgorithm

        assert SbanksAlgorithm is not None
        assert WhittakerAlgorithm is not None

    def test_algorithm_instantiation(self):
        """Test that algorithms can be instantiated."""
        from sbanks.sbanks_algorithm import SbanksAlgorithm
        from sbanks.sbanks_whittaker_algorithm import WhittakerAlgorithm

        savgol = SbanksAlgorithm()
        assert savgol.name() == 'savgol_filter'
        assert savgol.displayName() == 'Savitzky-Golay Filter'

        whittaker = WhittakerAlgorithm()
        assert whittaker.name() == 'whittaker_filter'
        assert whittaker.displayName() == 'Whittaker-Eilers Filter'
