# Sbanks

<p align="center">
     <a href="https://github.com/atsyplenkov/sbanks/.github/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/atsyplenkov/sbanks/ci.yml?style=flat&labelColor=1C2C2E&color=88AB26&logo=GitHub%20Actions&logoColor=white&label=CI"></a>
</p>

A QGIS 3+ and ArcGIS Pro Processing plugin that smooths 2D vector geometries using 1D linear filters with optional spline resampling for smoother output. It was initially designed for and works best with riverbanks mapped from satellite imageries (Landsat and Sentinel missions), which tend to produce zig-zag (pixelated) lines.

> Placeholder for nice figure

## Installation

### QGIS

1. Navigate to ... TBA


## Build from source

1. Create the plugin package:
   ```bash
   make zip
   ```

2. In QGIS, go to **Plugins** > **Manage and Install Plugins...** > **Install from ZIP**

3. Select the generated `sbanks.zip` file

## License and Citation

This code is open-source and licensed under the GPL-2.0+ license, see file [LICENCE](LICENSE).

If you use this plugin in your research, please cite the following paper:

> TBA