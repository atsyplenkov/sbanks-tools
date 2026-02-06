# sbanks

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![ru](https://img.shields.io/badge/lang-ru-green.svg)](README.ru.md)

<p align="center">
     <a href="https://github.com/astral-sh/ruff"><img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json" alt="Ruff"></a>
     <a href="https://github.com/atsyplenkov/sbanks-tools/actions/workflows/qgis-ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/atsyplenkov/sbanks-tools/qgis-ci.yml?branch=master&style=flat&labelColor=1C2C2E&color=88AB26&logo=QGIS&logoColor=white&label=QGIS"></a>
     <a href="https://github.com/atsyplenkov/sbanks-tools/actions/workflows/arcgis-ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/atsyplenkov/sbanks-tools/arcgis-ci.yml?branch=master&style=flat&labelColor=1C2C2E&color=2C7AC3&logo=arcgis&logoColor=white&label=ArcGIS"></a>
</p>

Плагин для QGIS 3+ и ArcGIS Pro, который сглаживает векторный 2D геометрии с помощью 1D фильтров [Savitzky-Golay](https://doi.org/10.1021/ac60214a047) (1964) и [Whittaker-Eilers](https://doi.org/10.1021/ac034173t) (2003) с опциональным пост-ресемплингом для более гладкого результата. Изначально плагин разрабатывался для береговых линий рек, оцифрованных по спутниковым снимкам (миссии Landsat и Sentinel), которые часто имеют зигзагообразную (пикселизированную) форму. Но так же применим для других задач.

Этот репозиторий содержит только frontend-реализацию для ГИС-программ. Основные алгоритмы и backend-логика поддерживаются в репозитории [sbanks-lib](https://github.com/atsyplenkov/sbanks-lib).

![Применение плагина sbanks в QGIS для фильтрации и сглаживания береговой линии Краснодарского водохранилища, полученной по данным Landsat-7.](assets/sbanks-example.png)

## Установка

### QGIS

**Вариант 1: Официальный репозиторий (⚠️ ЕЩЕ НЕ ДОСТУПНО)**

1. Откройте QGIS и перейдите в **Plugins** > **Manage and Install Plugins...**
2. Откройте вкладку **All** и найдите `sbanks`.
3. Выберите плагин в списке и нажмите **Install Plugin**.

**Вариант 2: Установка из ZIP**

Если вам нужна конкретная версия или плагин еще недоступен в репозитории:

1. Скачайте ZIP-файл последнего релиза со страницы [Releases](https://github.com/atsyplenkov/sbanks-tools/releases).
2. В QGIS перейдите в **Plugins** > **Manage and Install Plugins...** > **Install from ZIP**.
3. Выберите загруженный файл `sbanks-qgis.zip`.

### ArcGIS Pro

1. Скачайте отдельный файл `sbanks-arcgis.pyt` со страницы [Releases](https://github.com/atsyplenkov/sbanks-tools/releases).
2. Откройте ваш проект в ArcGIS Pro.
3. В панели **Catalog** нажмите правой кнопкой на **Toolboxes** и выберите **Add Toolbox**.
4. Перейдите к загруженному файлу `sbanks-arcgis.pyt` и выберите его.
5. Инструмент станет доступен в разделе Project Toolboxes.

## Сборка из исходников (QGIS)

1. Клонируйте репозиторий
```bash
git clone https://github.com/atsyplenkov/qgis-tools.git && cd qgis-tools
```
2. Создайте пакет плагина:
```bash
make zip
```
3. В QGIS перейдите в **Plugins** > **Manage and Install Plugins...** > **Install from ZIP**
4. Выберите сгенерированный файл `sbanks.zip`

## Лицензия и цитирование

Этот код с открытым исходным кодом и распространяется по лицензии GPL-2.0+, см. файл [LICENCE](LICENSE).

Если вы используете этот плагин в научных статьях, пожалуйста, цитируйте ПО следующим образом:

> Tsyplenkov, A. (2026). Sbanks: Smooth vector geometries using Savitzky-Golay or Whittaker-Eilers filters [Software]. GitHub. https://github.com/atsyplenkov/sbanks-tools

## Благодарности
Части логики сглаживания были вдохновлены работами [**Zoltán Sylvester**](https://github.com/zsylvester) по меандрированию рек и репозиторием [channelmapper](https://github.com/zsylvester/channelmapper).
