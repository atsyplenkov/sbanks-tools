# -*- coding: utf-8 -*-
"""
Sbanks ArcGIS Pro Python Toolbox

Smooth vector geometries using Savitzky-Golay or Whittaker-Eilers filters
with optional spline resampling.

Copyright (C) 2026 by Anatoly Tsyplenkov
"""

import os
import sys
import arcpy
import numpy as np

# Patch sys.path to include vendor/sbanks-lib
_current_dir = os.path.dirname(os.path.abspath(__file__))
_vendor_dir = os.path.join(_current_dir, 'vendor', 'sbanks-lib')
if _vendor_dir not in sys.path:
    sys.path.insert(0, _vendor_dir)

from sbanks_core.whittaker import WhittakerSmoother
from sbanks_core.savgol import smooth_open_geometry, smooth_closed_geometry
from sbanks_core.geometry import (
    calculate_cumulative_distances,
    apply_antihook_padding,
    apply_ring_padding,
    resample_and_smooth,
    snap_endpoints,
)


class Toolbox:
    """sbanks - Vector geometry smoothing toolbox."""

    def __init__(self):
        self.label = "sbanks"
        self.alias = "sbanks"
        self.tools = [SavitzkyGolayFilter, WhittakerEilersFilter]


class SavitzkyGolayFilter:
    """Savitzky-Golay Filter tool for smoothing vector geometries."""

    def __init__(self):
        self.label = "Savitzky-Golay Filter"
        self.description = (
            "Smooths vector geometries (polylines and polygons) using the "
            "Savitzky-Golay filter with optional spline resampling."
        )
        self.canRunInBackground = True

    def getParameterInfo(self):
        """Define parameter definitions."""
        # Input Features
        param0 = arcpy.Parameter(
            displayName="Input Features",
            name="in_features",
            datatype="GPFeatureLayer",
            parameterType="Required",
            direction="Input"
        )
        param0.filter.list = ["Polyline", "Polygon"]

        # Output Features
        param1 = arcpy.Parameter(
            displayName="Output Features",
            name="out_features",
            datatype="DEFeatureClass",
            parameterType="Required",
            direction="Output"
        )

        # Window Length
        param2 = arcpy.Parameter(
            displayName="Window Length (must be odd)",
            name="window_length",
            datatype="GPLong",
            parameterType="Required",
            direction="Input"
        )
        param2.value = 11

        # Polynomial Order
        param3 = arcpy.Parameter(
            displayName="Polynomial Order",
            name="polyorder",
            datatype="GPLong",
            parameterType="Required",
            direction="Input"
        )
        param3.value = 3

        # Use Resampling
        param4 = arcpy.Parameter(
            displayName="Apply Spline Resampling",
            name="use_resampling",
            datatype="GPBoolean",
            parameterType="Optional",
            direction="Input"
        )
        param4.value = True

        # Sampling Distance
        param5 = arcpy.Parameter(
            displayName="Resampling Distance",
            name="sampling_distance",
            datatype="GPDouble",
            parameterType="Optional",
            direction="Input"
        )
        param5.value = 25.0

        # Smoothing Factor
        param6 = arcpy.Parameter(
            displayName="Spline Smoothing Factor",
            name="smoothing_factor",
            datatype="GPDouble",
            parameterType="Optional",
            direction="Input"
        )
        param6.value = 1.0

        return [param0, param1, param2, param3, param4, param5, param6]

    def isLicensed(self):
        """Set whether tool is licensed to execute."""
        return True

    def updateParameters(self, parameters):
        """Modify the values and properties of parameters."""
        # Enable/disable resampling parameters based on checkbox
        if parameters[4].value:
            parameters[5].enabled = True
            parameters[6].enabled = True
        else:
            parameters[5].enabled = False
            parameters[6].enabled = False
        return

    def updateMessages(self, parameters):
        """Modify the messages created by internal validation."""
        # Validate window length is odd
        if parameters[2].value is not None:
            if parameters[2].value % 2 == 0:
                parameters[2].setWarningMessage(
                    "Window length will be adjusted to {} (must be odd)".format(
                        parameters[2].value + 1
                    )
                )
            if parameters[2].value < 3:
                parameters[2].setErrorMessage("Window length must be at least 3")

        # Validate polyorder < window_length
        if parameters[2].value is not None and parameters[3].value is not None:
            window = parameters[2].value if parameters[2].value % 2 == 1 else parameters[2].value + 1
            if parameters[3].value >= window:
                parameters[3].setErrorMessage(
                    "Polynomial order must be less than window length"
                )
        return

    def execute(self, parameters, messages):
        """Execute the tool."""
        in_fc = parameters[0].valueAsText
        out_fc = parameters[1].valueAsText
        window = parameters[2].value
        order = parameters[3].value
        resample = parameters[4].value if parameters[4].value else False
        delta_s = parameters[5].value if parameters[5].value else 25.0
        smooth_factor = parameters[6].value if parameters[6].value else 1.0

        # Adjust window length if even
        if window % 2 == 0:
            window += 1
            arcpy.AddMessage(f"Window length adjusted to {window} (must be odd)")

        # Describe input
        desc = arcpy.Describe(in_fc)
        shape_type = desc.shapeType
        sr = desc.spatialReference

        # Create output feature class
        arcpy.CreateFeatureclass_management(
            os.path.dirname(out_fc),
            os.path.basename(out_fc),
            shape_type,
            in_fc,
            spatial_reference=sr
        )

        # Get field names (excluding OID and Shape)
        fields = [f.name for f in arcpy.ListFields(in_fc)
                  if f.type not in ['OID', 'Geometry'] and f.name.upper() != 'SHAPE']

        # Process features
        with arcpy.da.SearchCursor(in_fc, ['SHAPE@'] + fields) as src:
            with arcpy.da.InsertCursor(out_fc, ['SHAPE@'] + fields) as dst:
                for row in src:
                    geom = row[0]
                    if geom is None:
                        dst.insertRow(row)
                        continue

                    smoothed_geom = self._smooth_geometry(
                        geom, window, order, resample, delta_s, smooth_factor
                    )
                    dst.insertRow([smoothed_geom] + list(row[1:]))

        arcpy.AddMessage(f"Successfully processed features to {out_fc}")
        return

    def _smooth_geometry(self, geom, window, order, resample, delta_s, smooth_factor):
        """Smooth a geometry based on its type."""
        if geom is None:
            return geom
        if geom.type == "polyline":
            return self._smooth_polyline(geom, window, order, resample, delta_s, smooth_factor)
        elif geom.type == "polygon":
            return self._smooth_polygon(geom, window, order, resample, delta_s, smooth_factor)
        return geom

    def _smooth_polyline(self, geom, window, order, resample, delta_s, smooth_factor):
        """Smooth a polyline geometry."""
        arr = arcpy.Array()
        for part in geom:
            pts = [p for p in part if p is not None]
            if len(pts) < window:
                arr.add(arcpy.Array([arcpy.Point(p.X, p.Y) for p in pts]))
                continue

            x = np.array([p.X for p in pts])
            y = np.array([p.Y for p in pts])

            # Store original endpoints
            x_s, y_s = x[0], y[0]
            x_e, y_e = x[-1], y[-1]

            # Smooth using sbanks_core
            x_sm, y_sm = smooth_open_geometry(x, y, window, order)

            # Optional resampling
            if resample:
                x_sm, y_sm = resample_and_smooth(x_sm, y_sm, delta_s, smooth_factor)
                x_sm, y_sm = snap_endpoints(
                    np.asarray(x_sm), np.asarray(y_sm), x_s, y_s, x_e, y_e
                )

            arr.add(arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x_sm, y_sm)]))

        return arcpy.Polyline(arr, geom.spatialReference)

    def _smooth_polygon(self, geom, window, order, resample, delta_s, smooth_factor):
        """Smooth a polygon geometry."""
        arr = arcpy.Array()
        for part in geom:
            pts = [p for p in part if p is not None]
            x = np.array([p.X for p in pts])
            y = np.array([p.Y for p in pts])

            # Check if ring is closed (last point == first point)
            if len(x) > 1 and abs(x[-1] - x[0]) < 1e-9 and abs(y[-1] - y[0]) < 1e-9:
                x = x[:-1]
                y = y[:-1]

            if len(x) < window:
                ring = arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x, y)])
                ring.add(arcpy.Point(x[0], y[0]))  # Close the ring
                arr.add(ring)
                continue

            # Smooth using sbanks_core
            x_sm, y_sm = smooth_closed_geometry(x, y, window, order)

            # Optional resampling
            if resample:
                # Append first point for spline continuity
                x_c = np.append(x_sm, x_sm[0])
                y_c = np.append(y_sm, y_sm[0])
                x_r, y_r = resample_and_smooth(x_c, y_c, delta_s, smooth_factor)
                x_sm = np.asarray(x_r)
                y_sm = np.asarray(y_r)
                # Remove duplicate closing point if present
                if len(x_sm) > 1 and abs(x_sm[-1] - x_sm[0]) < 1e-9:
                    x_sm = x_sm[:-1]
                    y_sm = y_sm[:-1]

            ring = arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x_sm, y_sm)])
            ring.add(arcpy.Point(x_sm[0], y_sm[0]))  # Close the ring
            arr.add(ring)

        return arcpy.Polygon(arr, geom.spatialReference)


class WhittakerEilersFilter:
    """Whittaker-Eilers Filter tool for smoothing vector geometries."""

    def __init__(self):
        self.label = "Whittaker-Eilers Filter"
        self.description = (
            "Smooths vector geometries (polylines and polygons) using the "
            "Whittaker-Eilers filter with distance-aware smoothing and "
            "optional spline resampling."
        )
        self.canRunInBackground = True

    def getParameterInfo(self):
        """Define parameter definitions."""
        # Input Features
        param0 = arcpy.Parameter(
            displayName="Input Features",
            name="in_features",
            datatype="GPFeatureLayer",
            parameterType="Required",
            direction="Input"
        )
        param0.filter.list = ["Polyline", "Polygon"]

        # Output Features
        param1 = arcpy.Parameter(
            displayName="Output Features",
            name="out_features",
            datatype="DEFeatureClass",
            parameterType="Required",
            direction="Output"
        )

        # Lambda (smoothing strength)
        param2 = arcpy.Parameter(
            displayName="Lambda (Smoothing Strength)",
            name="lmbda",
            datatype="GPDouble",
            parameterType="Required",
            direction="Input"
        )
        param2.value = 20000.0

        # Derivative Order
        param3 = arcpy.Parameter(
            displayName="Derivative Order for Penalty",
            name="order",
            datatype="GPLong",
            parameterType="Required",
            direction="Input"
        )
        param3.value = 2
        param3.filter.type = "Range"
        param3.filter.list = [1, 4]

        # Use Resampling
        param4 = arcpy.Parameter(
            displayName="Apply Spline Resampling",
            name="use_resampling",
            datatype="GPBoolean",
            parameterType="Optional",
            direction="Input"
        )
        param4.value = True

        # Sampling Distance
        param5 = arcpy.Parameter(
            displayName="Resampling Distance",
            name="sampling_distance",
            datatype="GPDouble",
            parameterType="Optional",
            direction="Input"
        )
        param5.value = 25.0

        # Smoothing Factor
        param6 = arcpy.Parameter(
            displayName="Spline Smoothing Factor",
            name="smoothing_factor",
            datatype="GPDouble",
            parameterType="Optional",
            direction="Input"
        )
        param6.value = 1.0

        return [param0, param1, param2, param3, param4, param5, param6]

    def isLicensed(self):
        """Set whether tool is licensed to execute."""
        return True

    def updateParameters(self, parameters):
        """Modify the values and properties of parameters."""
        if parameters[4].value:
            parameters[5].enabled = True
            parameters[6].enabled = True
        else:
            parameters[5].enabled = False
            parameters[6].enabled = False
        return

    def updateMessages(self, parameters):
        """Modify the messages created by internal validation."""
        if parameters[2].value is not None and parameters[2].value < 0:
            parameters[2].setErrorMessage("Lambda must be non-negative")
        return

    def execute(self, parameters, messages):
        """Execute the tool."""
        in_fc = parameters[0].valueAsText
        out_fc = parameters[1].valueAsText
        lmbda = parameters[2].value
        order = parameters[3].value
        resample = parameters[4].value if parameters[4].value else False
        delta_s = parameters[5].value if parameters[5].value else 25.0
        smooth_factor = parameters[6].value if parameters[6].value else 1.0

        # Describe input
        desc = arcpy.Describe(in_fc)
        shape_type = desc.shapeType
        sr = desc.spatialReference
        is_geographic = sr.type == "Geographic"

        # Create output feature class
        arcpy.CreateFeatureclass_management(
            os.path.dirname(out_fc),
            os.path.basename(out_fc),
            shape_type,
            in_fc,
            spatial_reference=sr
        )

        # Get field names
        fields = [f.name for f in arcpy.ListFields(in_fc)
                  if f.type not in ['OID', 'Geometry'] and f.name.upper() != 'SHAPE']

        # Process features
        with arcpy.da.SearchCursor(in_fc, ['SHAPE@'] + fields) as src:
            with arcpy.da.InsertCursor(out_fc, ['SHAPE@'] + fields) as dst:
                for row in src:
                    geom = row[0]
                    if geom is None:
                        dst.insertRow(row)
                        continue

                    smoothed_geom = self._smooth_geometry(
                        geom, lmbda, order, resample, delta_s, smooth_factor, is_geographic
                    )
                    dst.insertRow([smoothed_geom] + list(row[1:]))

        arcpy.AddMessage(f"Successfully processed features to {out_fc}")
        return

    def _smooth_geometry(self, geom, lmbda, order, resample, delta_s, smooth_factor, is_geographic):
        """Smooth a geometry based on its type."""
        if geom is None:
            return geom
        if geom.type == "polyline":
            return self._smooth_polyline(geom, lmbda, order, resample, delta_s, smooth_factor, is_geographic)
        elif geom.type == "polygon":
            return self._smooth_polygon(geom, lmbda, order, resample, delta_s, smooth_factor, is_geographic)
        return geom

    def _smooth_polyline(self, geom, lmbda, order, resample, delta_s, smooth_factor, is_geographic):
        """Smooth a polyline geometry using Whittaker-Eilers filter."""
        arr = arcpy.Array()
        min_points = 5

        for part in geom:
            pts = [p for p in part if p is not None]
            if len(pts) < min_points:
                arr.add(arcpy.Array([arcpy.Point(p.X, p.Y) for p in pts]))
                continue

            x = np.array([p.X for p in pts])
            y = np.array([p.Y for p in pts])

            # Store original endpoints
            x_s, y_s = x[0], y[0]
            x_e, y_e = x[-1], y[-1]

            # Calculate cumulative distances
            distances = calculate_cumulative_distances(x, y, is_geographic)

            # Anti-hook padding
            pad_count = max(5, len(x) // 4)
            x_ext, y_ext, d_ext = apply_antihook_padding(x, y, distances, pad_count)

            # Apply Whittaker-Eilers filter
            try:
                smoother = WhittakerSmoother(
                    lmbda=lmbda,
                    order=order,
                    data_length=len(x_ext),
                    x_input=d_ext.tolist()
                )
                x_sm = np.array(smoother.smooth(x_ext.tolist()))
                y_sm = np.array(smoother.smooth(y_ext.tolist()))
            except Exception as e:
                arcpy.AddWarning(f"Whittaker smoothing failed: {e}. Using original geometry.")
                arr.add(arcpy.Array([arcpy.Point(p.X, p.Y) for p in pts]))
                continue

            # Trim back to original range
            x_sm = x_sm[pad_count:-pad_count]
            y_sm = y_sm[pad_count:-pad_count]

            # Snap endpoints
            x_sm, y_sm = snap_endpoints(x_sm, y_sm, x_s, y_s, x_e, y_e)

            # Optional resampling
            if resample:
                x_sm, y_sm = resample_and_smooth(x_sm, y_sm, delta_s, smooth_factor)
                x_sm, y_sm = snap_endpoints(
                    np.asarray(x_sm), np.asarray(y_sm), x_s, y_s, x_e, y_e
                )

            arr.add(arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x_sm, y_sm)]))

        return arcpy.Polyline(arr, geom.spatialReference)

    def _smooth_polygon(self, geom, lmbda, order, resample, delta_s, smooth_factor, is_geographic):
        """Smooth a polygon geometry using Whittaker-Eilers filter."""
        arr = arcpy.Array()
        min_points = 6

        for part in geom:
            pts = [p for p in part if p is not None]
            x = np.array([p.X for p in pts])
            y = np.array([p.Y for p in pts])

            # Check if ring is closed
            if len(x) > 1 and abs(x[-1] - x[0]) < 1e-9 and abs(y[-1] - y[0]) < 1e-9:
                x = x[:-1]
                y = y[:-1]

            if len(x) < min_points:
                ring = arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x, y)])
                ring.add(arcpy.Point(x[0], y[0]))
                arr.add(ring)
                continue

            # Calculate distances including closing segment
            distances = calculate_cumulative_distances(
                np.append(x, x[0]),
                np.append(y, y[0]),
                is_geographic
            )
            ring_distances = distances[:-1]
            total_perimeter = distances[-1]

            # Ring padding
            pad_count = max(5, len(x) // 4)
            x_ext, y_ext, d_ext = apply_ring_padding(x, y, ring_distances, pad_count, total_perimeter)

            # Apply Whittaker-Eilers filter
            try:
                smoother = WhittakerSmoother(
                    lmbda=lmbda,
                    order=order,
                    data_length=len(x_ext),
                    x_input=d_ext.tolist()
                )
                x_sm = np.array(smoother.smooth(x_ext.tolist()))
                y_sm = np.array(smoother.smooth(y_ext.tolist()))
            except Exception as e:
                arcpy.AddWarning(f"Whittaker smoothing failed: {e}. Using original geometry.")
                ring = arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x, y)])
                ring.add(arcpy.Point(x[0], y[0]))
                arr.add(ring)
                continue

            # Trim back to original range
            x_sm = x_sm[pad_count:-pad_count]
            y_sm = y_sm[pad_count:-pad_count]

            # Optional resampling
            if resample:
                x_c = np.append(x_sm, x_sm[0])
                y_c = np.append(y_sm, y_sm[0])
                x_r, y_r = resample_and_smooth(x_c, y_c, delta_s, smooth_factor)
                x_sm = np.asarray(x_r)
                y_sm = np.asarray(y_r)
                if len(x_sm) > 1 and abs(x_sm[-1] - x_sm[0]) < 1e-9:
                    x_sm = x_sm[:-1]
                    y_sm = y_sm[:-1]

            ring = arcpy.Array([arcpy.Point(xi, yi) for xi, yi in zip(x_sm, y_sm)])
            ring.add(arcpy.Point(x_sm[0], y_sm[0]))
            arr.add(ring)

        return arcpy.Polygon(arr, geom.spatialReference)
