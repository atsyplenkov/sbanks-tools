<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ru_RU">
<context>
    <name>Processing</name>
    <message>
        <location filename="." line="0"/>
        <source>Savitzky-Golay Filter</source>
        <translation type="obsolete">Фильтр Савицкого-Голея</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Resampling distance in meters</source>
        <translation type="obsolete">Шаг ресемплирования в метрах</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Spline smoothing factor</source>
        <translation type="obsolete">Коэффициент сглаживания сплайна</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Input layer</source>
        <translation type="obsolete">Входной слой</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Max segment length for densification (0 to disable)</source>
        <translation type="obsolete">Максимальная длина сегмента для денсификации (0 — отключить)</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Window length (must be odd)</source>
        <translation type="obsolete">Длина окна (должна быть нечетной)</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Polynomial order</source>
        <translation type="obsolete">Порядок полинома</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Apply spline resampling after smoothing?</source>
        <translation type="obsolete">Применить сплайновый ресемплинг после сглаживания?</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>SG smoothed layer</source>
        <translation type="obsolete">Слой, сглаженный SG</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Input layer uses a geographic CRS. Results may be inaccurate. Consider reprojecting to a projected CRS.</source>
        <translation type="obsolete">Входной слой использует географическую CRS. Результаты могут быть неточными. Рекомендуется перепроецировать слой в проецируемую CRS.</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Window length adjusted to {} (must be odd)</source>
        <translation type="obsolete">Длина окна скорректирована до {} (должна быть нечетной)</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Polynomial order adjusted to {} (must be less than window length)</source>
        <translation type="obsolete">Порядок полинома скорректирован до {} (должен быть меньше длины окна)</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Line has fewer points ({}) than window length ({}). Skipping smoothing.</source>
        <translation type="obsolete">Линия имеет меньше точек ({}) чем длина окна ({}). Сглаживание пропущено.</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Ring has fewer points ({}) than window length ({}). Skipping S-G smoothing.</source>
        <translation type="obsolete">Кольцо имеет меньше точек ({}) чем длина окна ({}). Сглаживание S-G пропущено.</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Skipping point geometry for feature {}</source>
        <translation type="obsolete">Точечная геометрия объекта {} пропущена</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Whittaker-Eilers Filter</source>
        <translation type="obsolete">Фильтр Уиттакера-Эйлерса</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Lambda (smoothing strength)</source>
        <translation type="obsolete">Лямбда (сила сглаживания)</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Derivative order for penalty</source>
        <translation type="obsolete">Порядок производной для штрафа</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>WE smoothed layer</source>
        <translation type="obsolete">Слой, сглаженный WE</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Line has fewer points ({}) than minimum required ({}). Skipping W-E smoothing.</source>
        <translation type="obsolete">Линия имеет меньше точек ({}) чем минимально требуется ({}). Сглаживание W-E пропущено.</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Ring has fewer points ({}) than minimum required ({}). Skipping W-E smoothing.</source>
        <translation type="obsolete">Кольцо имеет меньше точек ({}) чем минимально требуется ({}). Сглаживание W-E пропущено.</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Whittaker smoothing failed: {}. Returning original geometry.</source>
        <translation type="obsolete">Сглаживание Уиттакера завершилось ошибкой: {}. Возвращена исходная геометрия.</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>sbanks</source>
        <translation type="obsolete">sbanks</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Smooths vector geometries (MULTI)LINESTRING and (MULTI)POLYGON using the Savitzky-Golay filter (&lt;i&gt;Savitzky &amp; Golay&lt;/i&gt;, 1964).
&lt;h4&gt;Parameters:&lt;/h4&gt;- &lt;b&gt;Max segment length&lt;/b&gt;: Densifies sparse segments before smoothing. Segments longer than this value will have points inserted via linear interpolation. This prevents spike artifacts on geometries with uneven vertex density (e.g., raster-derived polygons). Set to 0 to disable.
- &lt;b&gt;Window length&lt;/b&gt;: The length of the filter window (must be odd). Larger values produce smoother results.
- &lt;b&gt;Polynomial order&lt;/b&gt;: The order of the polynomial used to fit samples. Must be less than window length.
&lt;h4&gt;Optional:&lt;/h4&gt;- &lt;b&gt;Apply spline resampling&lt;/b&gt;: Optionally resample the smoothed geometry using cubic spline interpolation following &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Resampling distance&lt;/b&gt;: Target distance between points after resampling.
- &lt;b&gt;Spline smoothing factor&lt;/b&gt;: Controls the amount of smoothing applied during spline interpolation.
&lt;h4&gt;References:&lt;/h4&gt;Savitzky, A. &amp; Golay, M. J. E. Smoothing and Differentiation of Data by Simplified Least Squares Procedures. Anal. Chem. 36, 1627–1639 (1964).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</source>
        <translation type="obsolete">Сглаживает векторные геометрии (MULTI)LINESTRING и (MULTI)POLYGON с помощью фильтра Савицкого-Голея (&lt;i&gt;Savitzky &amp; Golay&lt;/i&gt;, 1964).
&lt;h4&gt;Параметры:&lt;/h4&gt;- &lt;b&gt;Макс. длина сегмента&lt;/b&gt;: Перед сглаживанием уплотняет разреженные сегменты. Для сегментов длиннее этого значения добавляются точки линейной интерполяцией. Это снижает артефакты на геометриях с неравномерной плотностью вершин (например, полигоны, полученные из растра). Укажите 0, чтобы отключить.
- &lt;b&gt;Длина окна&lt;/b&gt;: Длина окна фильтра (должна быть нечетной). Большие значения дают более гладкий результат.
- &lt;b&gt;Порядок полинома&lt;/b&gt;: Порядок полинома для аппроксимации. Должен быть меньше длины окна.
&lt;h4&gt;Дополнительно:&lt;/h4&gt;- &lt;b&gt;Применить сплайновый ресемплинг&lt;/b&gt;: Дополнительно пересэмплирует сглаженную геометрию кубическим сплайном по &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Шаг ресемплирования&lt;/b&gt;: Целевое расстояние между точками после ресемплирования.
- &lt;b&gt;Коэффициент сглаживания сплайна&lt;/b&gt;: Управляет степенью сглаживания при сплайновой интерполяции.
&lt;h4&gt;Ссылки:&lt;/h4&gt;Savitzky, A. &amp; Golay, M. J. E. Smoothing and Differentiation of Data by Simplified Least Squares Procedures. Anal. Chem. 36, 1627–1639 (1964).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</translation>
    </message>
    <message>
        <location filename="." line="0"/>
        <source>Smooths vector geometries (MULTI)LINESTRING and (MULTI)POLYGON using the Whittaker-Eilers filter (Eilers, 2003) with distance-aware smoothing.

The Whittaker-Eilers filter uses the actual distances between vertexes, making it suitable for unevenly spaced data. For geographic CRS, Haversine distances are used automatically, otherwise the Cartesian one are used.
&lt;h4&gt;Parameters:&lt;/h4&gt;- &lt;b&gt;Lambda&lt;/b&gt;: Smoothing strength parameter. Higher values produce smoother results. Typical values range from 1e3 to 1e6.
- &lt;b&gt;Derivative order&lt;/b&gt;: Order of the derivative used in the penalty term (1-4). Higher orders preserve more detail.
&lt;h4&gt;Optional:&lt;/h4&gt;- &lt;b&gt;Apply spline resampling&lt;/b&gt;: Optionally resample the smoothed geometry using cubic spline interpolation following &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Resampling distance&lt;/b&gt;: Target distance between points after resampling.
- &lt;b&gt;Spline smoothing factor&lt;/b&gt;: Controls the amount of smoothing applied during spline interpolation.
&lt;h4&gt;References:&lt;/h4&gt;Eilers, P. H. C. A Perfect Smoother. Anal. Chem. 75, 3631–3636 (2003).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</source>
        <translation type="obsolete">Сглаживает векторные геометрии (MULTI)LINESTRING и (MULTI)POLYGON с помощью фильтра Уиттакера-Эйлерса (Eilers, 2003) с учетом расстояний.

Фильтр Уиттакера-Эйлерса использует фактические расстояния между вершинами, поэтому подходит для неравномерно распределенных точек. Для географических CRS автоматически используются расстояния гаверсинуса, иначе используются декартовы расстояния.
&lt;h4&gt;Параметры:&lt;/h4&gt;- &lt;b&gt;Лямбда&lt;/b&gt;: Параметр силы сглаживания. Большее значение дает более гладкий результат. Типичный диапазон: от 1e3 до 1e6.
- &lt;b&gt;Порядок производной&lt;/b&gt;: Порядок производной в штрафном члене (1-4). Более высокие порядки сохраняют больше деталей.
&lt;h4&gt;Дополнительно:&lt;/h4&gt;- &lt;b&gt;Применить сплайновый ресемплинг&lt;/b&gt;: Дополнительно пересэмплирует сглаженную геометрию кубическим сплайном по &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Шаг ресемплирования&lt;/b&gt;: Целевое расстояние между точками после ресемплирования.
- &lt;b&gt;Коэффициент сглаживания сплайна&lt;/b&gt;: Управляет степенью сглаживания при сплайновой интерполяции.
&lt;h4&gt;Ссылки:&lt;/h4&gt;Eilers, P. H. C. A Perfect Smoother. Anal. Chem. 75, 3631–3636 (2003).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</translation>
    </message>
</context>
<context>
    <name>SbanksAlgorithm</name>
    <message>
        <location filename="../sbanks_algorithm.py" line="88"/>
        <source>Input layer</source>
        <translation type="unfinished">Входной слой</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="96"/>
        <source>Max segment length for densification (0 to disable)</source>
        <translation type="unfinished">Максимальная длина сегмента для денсификации (0 — отключить)</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="106"/>
        <source>Window length (must be odd)</source>
        <translation type="unfinished">Длина окна (должна быть нечетной)</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="116"/>
        <source>Polynomial order</source>
        <translation type="unfinished">Порядок полинома</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="126"/>
        <source>Apply spline resampling after smoothing?</source>
        <translation type="unfinished">Применить сплайновый ресемплинг после сглаживания?</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="134"/>
        <source>Resampling distance in meters</source>
        <translation type="unfinished">Шаг ресемплирования в метрах</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="147"/>
        <source>Spline smoothing factor</source>
        <translation type="unfinished">Коэффициент сглаживания сплайна</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="160"/>
        <source>SG smoothed layer</source>
        <translation type="unfinished">Слой, сглаженный SG</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="186"/>
        <source>Window length adjusted to {} (must be odd)</source>
        <translation type="unfinished">Длина окна скорректирована до {} (должна быть нечетной)</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="195"/>
        <source>Polynomial order adjusted to {} (must be less than window length)</source>
        <translation type="unfinished">Порядок полинома скорректирован до {} (должен быть меньше длины окна)</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="204"/>
        <source>Input layer uses a geographic CRS. Results may be inaccurate. Consider reprojecting to a projected CRS.</source>
        <translation type="unfinished">Входной слой использует географическую CRS. Результаты могут быть неточными. Рекомендуется перепроецировать слой в проецируемую CRS.</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="238"/>
        <source>Skipping point geometry for feature {}</source>
        <translation type="unfinished">Точечная геометрия объекта {} пропущена</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="404"/>
        <source>Line has fewer points ({}) than window length ({}). Skipping smoothing.</source>
        <translation type="unfinished">Линия имеет меньше точек ({}) чем длина окна ({}). Сглаживание пропущено.</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="512"/>
        <source>Ring has fewer points ({}) than window length ({}). Skipping S-G smoothing.</source>
        <translation type="unfinished">Кольцо имеет меньше точек ({}) чем длина окна ({}). Сглаживание S-G пропущено.</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="558"/>
        <source>Savitzky-Golay Filter</source>
        <translation type="unfinished">Фильтр Савицкого-Голея</translation>
    </message>
    <message>
        <location filename="../sbanks_algorithm.py" line="566"/>
        <source>Smooths vector geometries (MULTI)LINESTRING and (MULTI)POLYGON using the Savitzky-Golay filter (&lt;i&gt;Savitzky &amp; Golay&lt;/i&gt;, 1964).
&lt;h4&gt;Parameters:&lt;/h4&gt;- &lt;b&gt;Max segment length&lt;/b&gt;: Densifies sparse segments before smoothing. Segments longer than this value will have points inserted via linear interpolation. This prevents spike artifacts on geometries with uneven vertex density (e.g., raster-derived polygons). Set to 0 to disable.
- &lt;b&gt;Window length&lt;/b&gt;: The length of the filter window (must be odd). Larger values produce smoother results.
- &lt;b&gt;Polynomial order&lt;/b&gt;: The order of the polynomial used to fit samples. Must be less than window length.
&lt;h4&gt;Optional:&lt;/h4&gt;- &lt;b&gt;Apply spline resampling&lt;/b&gt;: Optionally resample the smoothed geometry using cubic spline interpolation following &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Resampling distance&lt;/b&gt;: Target distance between points after resampling.
- &lt;b&gt;Spline smoothing factor&lt;/b&gt;: Controls the amount of smoothing applied during spline interpolation.
&lt;h4&gt;References:&lt;/h4&gt;Savitzky, A. &amp; Golay, M. J. E. Smoothing and Differentiation of Data by Simplified Least Squares Procedures. Anal. Chem. 36, 1627–1639 (1964).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</source>
        <translation type="unfinished">Сглаживает векторные геометрии (MULTI)LINESTRING и (MULTI)POLYGON с помощью фильтра Савицкого-Голея (&lt;i&gt;Savitzky &amp; Golay&lt;/i&gt;, 1964).
&lt;h4&gt;Параметры:&lt;/h4&gt;- &lt;b&gt;Макс. длина сегмента&lt;/b&gt;: Перед сглаживанием уплотняет разреженные сегменты. Для сегментов длиннее этого значения добавляются точки линейной интерполяцией. Это снижает артефакты на геометриях с неравномерной плотностью вершин (например, полигоны, полученные из растра). Укажите 0, чтобы отключить.
- &lt;b&gt;Длина окна&lt;/b&gt;: Длина окна фильтра (должна быть нечетной). Большие значения дают более гладкий результат.
- &lt;b&gt;Порядок полинома&lt;/b&gt;: Порядок полинома для аппроксимации. Должен быть меньше длины окна.
&lt;h4&gt;Дополнительно:&lt;/h4&gt;- &lt;b&gt;Применить сплайновый ресемплинг&lt;/b&gt;: Дополнительно пересэмплирует сглаженную геометрию кубическим сплайном по &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Шаг ресемплирования&lt;/b&gt;: Целевое расстояние между точками после ресемплирования.
- &lt;b&gt;Коэффициент сглаживания сплайна&lt;/b&gt;: Управляет степенью сглаживания при сплайновой интерполяции.
&lt;h4&gt;Ссылки:&lt;/h4&gt;Savitzky, A. &amp; Golay, M. J. E. Smoothing and Differentiation of Data by Simplified Least Squares Procedures. Anal. Chem. 36, 1627–1639 (1964).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</translation>
    </message>
</context>
<context>
    <name>SbanksProvider</name>
    <message>
        <location filename="../sbanks_provider.py" line="76"/>
        <source>sbanks</source>
        <translation type="unfinished">sbanks</translation>
    </message>
</context>
<context>
    <name>WhittakerAlgorithm</name>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="87"/>
        <source>Input layer</source>
        <translation type="unfinished">Входной слой</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="95"/>
        <source>Lambda (smoothing strength)</source>
        <translation type="unfinished">Лямбда (сила сглаживания)</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="105"/>
        <source>Derivative order for penalty</source>
        <translation type="unfinished">Порядок производной для штрафа</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="116"/>
        <source>Apply spline resampling after smoothing?</source>
        <translation type="unfinished">Применить сплайновый ресемплинг после сглаживания?</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="124"/>
        <source>Resampling distance in meters</source>
        <translation type="unfinished">Шаг ресемплирования в метрах</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="137"/>
        <source>Spline smoothing factor</source>
        <translation type="unfinished">Коэффициент сглаживания сплайна</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="150"/>
        <source>WE smoothed layer</source>
        <translation type="unfinished">Слой, сглаженный WE</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="197"/>
        <source>Skipping point geometry for feature {}</source>
        <translation type="unfinished">Точечная геометрия объекта {} пропущена</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="364"/>
        <source>Line has fewer points ({}) than minimum required ({}). Skipping W-E smoothing.</source>
        <translation type="unfinished">Линия имеет меньше точек ({}) чем минимально требуется ({}). Сглаживание W-E пропущено.</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="540"/>
        <source>Whittaker smoothing failed: {}. Returning original geometry.</source>
        <translation type="unfinished">Сглаживание Уиттакера завершилось ошибкой: {}. Возвращена исходная геометрия.</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="503"/>
        <source>Ring has fewer points ({}) than minimum required ({}). Skipping W-E smoothing.</source>
        <translation type="unfinished">Кольцо имеет меньше точек ({}) чем минимально требуется ({}). Сглаживание W-E пропущено.</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="581"/>
        <source>Whittaker-Eilers Filter</source>
        <translation type="unfinished">Фильтр Уиттакера-Эйлерса</translation>
    </message>
    <message>
        <location filename="../sbanks_whittaker_algorithm.py" line="589"/>
        <source>Smooths vector geometries (MULTI)LINESTRING and (MULTI)POLYGON using the Whittaker-Eilers filter (Eilers, 2003) with distance-aware smoothing.

The Whittaker-Eilers filter uses the actual distances between vertexes, making it suitable for unevenly spaced data. For geographic CRS, Haversine distances are used automatically, otherwise the Cartesian one are used.
&lt;h4&gt;Parameters:&lt;/h4&gt;- &lt;b&gt;Lambda&lt;/b&gt;: Smoothing strength parameter. Higher values produce smoother results. Typical values range from 1e3 to 1e6.
- &lt;b&gt;Derivative order&lt;/b&gt;: Order of the derivative used in the penalty term (1-4). Higher orders preserve more detail.
&lt;h4&gt;Optional:&lt;/h4&gt;- &lt;b&gt;Apply spline resampling&lt;/b&gt;: Optionally resample the smoothed geometry using cubic spline interpolation following &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Resampling distance&lt;/b&gt;: Target distance between points after resampling.
- &lt;b&gt;Spline smoothing factor&lt;/b&gt;: Controls the amount of smoothing applied during spline interpolation.
&lt;h4&gt;References:&lt;/h4&gt;Eilers, P. H. C. A Perfect Smoother. Anal. Chem. 75, 3631–3636 (2003).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</source>
        <translation type="unfinished">Сглаживает векторные геометрии (MULTI)LINESTRING и (MULTI)POLYGON с помощью фильтра Уиттакера-Эйлерса (Eilers, 2003) с учетом расстояний.

Фильтр Уиттакера-Эйлерса использует фактические расстояния между вершинами, поэтому подходит для неравномерно распределенных точек. Для географических CRS автоматически используются расстояния гаверсинуса, иначе используются декартовы расстояния.
&lt;h4&gt;Параметры:&lt;/h4&gt;- &lt;b&gt;Лямбда&lt;/b&gt;: Параметр силы сглаживания. Большее значение дает более гладкий результат. Типичный диапазон: от 1e3 до 1e6.
- &lt;b&gt;Порядок производной&lt;/b&gt;: Порядок производной в штрафном члене (1-4). Более высокие порядки сохраняют больше деталей.
&lt;h4&gt;Дополнительно:&lt;/h4&gt;- &lt;b&gt;Применить сплайновый ресемплинг&lt;/b&gt;: Дополнительно пересэмплирует сглаженную геометрию кубическим сплайном по &lt;i&gt;Sylvester et al.&lt;/i&gt; (2021)
- &lt;b&gt;Шаг ресемплирования&lt;/b&gt;: Целевое расстояние между точками после ресемплирования.
- &lt;b&gt;Коэффициент сглаживания сплайна&lt;/b&gt;: Управляет степенью сглаживания при сплайновой интерполяции.
&lt;h4&gt;Ссылки:&lt;/h4&gt;Eilers, P. H. C. A Perfect Smoother. Anal. Chem. 75, 3631–3636 (2003).
Sylvester, Z., Durkin, P. R., Hubbard, S. M. &amp; Mohrig, D. Autogenic translation and counter point bar deposition in meandering rivers. GSA Bulletin 133, 2439–2456 (2021).</translation>
    </message>
</context>
</TS>
