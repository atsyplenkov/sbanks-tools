# -*- coding: utf-8 -*-
"""Tests for the QGIS plugin package bootstrap."""

import importlib


def test_qgis_plugin_package_importable_as_sbanks_plugin():
    module = importlib.import_module("sbanks_plugin")
    assert module is not None
