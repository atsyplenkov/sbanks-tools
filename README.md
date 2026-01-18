# Sbanks

<p align="center">
     <a href="https://github.com/atsyplenkov/sbanks-tools/actions/workflows/qgis-ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/atsyplenkov/sbanks-tools/qgis-ci.yml?style=flat&labelColor=1C2C2E&color=88AB26&logo=QGIS&logoColor=white&label=QGIS"></a>
     <a href="https://github.com/atsyplenkov/sbanks-tools/actions/workflows/arcgis-ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/atsyplenkov/sbanks-tools/arcgis-ci.yml?style=flat&labelColor=1C2C2E&color=2C7AC3&logo=arcgis&logoColor=white&label=ArcGIS"></a>
</p>

A QGIS 3+ and ArcGIS Pro Processing plugin that smooths 2D vector geometries using 1D linear filters with optional spline resampling for smoother output. It was initially designed for and works best with riverbanks mapped from satellite imageries (Landsat and Sentinel missions), which tend to produce zig-zag (pixelated) lines.

> Placeholder for nice figure

## Installation

### QGIS

**Option 1: Official Repository (⚠️ NOT YET AVAILABLE)**

1. Open QGIS and navigate to **Plugins** > **Manage and Install Plugins...**
2. Select the **All** tab and search for `Sbanks`.
3. Select the plugin from the list and click **Install Plugin**.

**Option 2: Install from ZIP**

If you need a specific version or the plugin is not yet available in the repository:

1. Download the latest release ZIP file from the [Releases page](https://github.com/atsyplenkov/sbanks-tools/releases).
2. In QGIS, go to **Plugins** > **Manage and Install Plugins...** > **Install from ZIP**.
3. Select the downloaded `sbanks-qgis.zip` file.

### ArcGIS Pro

1. Download the repository or the standalone `sbanks-arcgis.pyt` file from [Releases page](https://github.com/atsyplenkov/sbanks-tools/releases).
2. Open your project in ArcGIS Pro.
3. In the **Catalog** pane, right-click **Toolboxes** and select **Add Toolbox**.
4. Navigate to the `sbanks-tools/arcgis` folder and select `sbanks-arcgis.pyt`.
5. The tool will now be available under your Project Toolboxes.

## Build from source (QGIS)

1. Create the plugin package:
```bash
make zip
```

2. In QGIS, go to **Plugins** > **Manage and Install Plugins...** > **Install from ZIP**
3. Select the generated `sbanks.zip` file

## License and Citation

This code is open-source and licensed under the GPL-2.0+ license, see file [LICENCE](LICENSE).

If you use this plugin in your research, please cite the software as follows:

> Tsyplenkov, A. (2026). Sbanks: Smooth vector geometries using Savitzky-Golay or Whittaker-Eilers filters [Software]. GitHub. https://github.com/atsyplenkov/sbanks-tools

## Acknowledgements
Portions of the smoothing logic were inspired by [**Zoltán Sylvester's**](https://github.com/zsylvester) work on river meandering and the [channelmapper](https://github.com/zsylvester/channelmapper) repository.