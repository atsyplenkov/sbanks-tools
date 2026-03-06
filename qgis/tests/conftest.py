# -*- coding: utf-8 -*-
"""
Pytest configuration for QGIS Sbanks plugin tests.

Sets up sys.path to include vendor dependencies before tests run.
"""

import os
import sys

# Add vendor/sbanks to sys.path for sbanks imports
_tests_dir = os.path.dirname(os.path.abspath(__file__))
_plugin_dir = os.path.dirname(_tests_dir)
_vendor_dir = os.path.join(_plugin_dir, "sbanks_plugin", "vendor", "sbanks")

if _vendor_dir not in sys.path:
    sys.path.insert(0, _vendor_dir)
