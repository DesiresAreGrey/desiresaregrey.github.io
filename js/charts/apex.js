import ApexCharts from 'apexcharts';
import "../utils/utils.js";
export class Apex {
    static get isMobile() { return window.innerWidth > 768 ? false : true; }
    static get animationEnabled() { return localStorage.getItem('chart-animations-enabled')?.parseJson() ?? !Apex.isMobile; }
    static #charts = [];
    static get charts() {
        return [...Apex.#charts];
    }
    static createRatioBarChart(chartId, data, title, subtitle, hideSeries, colors, height, normalized = false, units = "respondents") {
        hideSeries.forEach(index => {
            if (data.series[index]) {
                data.series[index].hidden = true;
            }
        });
        data.categories = data.categories.map((c) => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                id: chartId,
                type: 'bar',
                height: height,
                stacked: true,
                stackType: '100%',
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize: '12px'
                },
            },
            series: data.series,
            xaxis: {
                categories: data.categories,
                show: false,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center'
            },
            tooltip: {
                y: {
                    formatter: (val, opts) => {
                        if (normalized) {
                            const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                            const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                            return `${pct}% (${val / 10}% of ${data.series[opts.seriesIndex].name})`;
                        }
                        const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                        const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                        return `${val} ${units} (${pct}%)`;
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 3,
                    borderRadiusApplication: 'end',
                    barHeight: '90%'
                }
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: true,
                    left: 0,
                    top: 0,
                    opacity: 0.5
                }
            },
            grid: {
                yaxis: {
                    lines: {
                        show: false
                    }
                }
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            stroke: {
                colors: ['transparent'],
                width: 3,
            },
            colors: colors
        };
        const start = performance.now();
        new ApexCharts($id(chartId), options).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: subtitle,
            type: "ratio-bar",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
    static createBarChart(chartId, data, title, subtitle, hideSeries, colors, height, horizontal, stacked = true, units = "respondents") {
        hideSeries.forEach(index => {
            if (data.series[index]) {
                data.series[index].hidden = true;
            }
        });
        data.categories = data.categories.map((c) => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                id: chartId,
                type: 'bar',
                height: height,
                stacked: stacked,
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize: '12px'
                },
            },
            series: data.series,
            xaxis: {
                categories: data.categories
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center'
            },
            tooltip: {
                y: {
                    formatter: (val, opts) => {
                        if (data.series.length <= 1)
                            return `${val} ${units}`;
                        const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                        const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                        return `${val} ${units} (${pct}%)`;
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: horizontal,
                    borderRadius: 3,
                    borderRadiusApplication: 'end',
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                borderColor: '#e0e0e020',
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            colors: colors
        };
        const start = performance.now();
        new ApexCharts($id(chartId), options).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: subtitle,
            type: "bar",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
    static createPopPyramidChart(chartId, data, title, subtitle, hideSeries, colors, height, bounds, horizontal) {
        data.categories = data.categories.map((c) => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                id: chartId,
                type: 'bar',
                height: height,
                stacked: true,
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize: '12px'
                },
            },
            series: data.series,
            xaxis: {
                categories: data.categories,
                min: -bounds * 10, max: bounds * 10,
                labels: {
                    formatter: function (val) {
                        return Math.abs(Math.round(val / 10)) + "%";
                    }
                }
            },
            grid: {
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                borderColor: '#e0e0e020',
            },
            annotations: {
                xaxis: [
                    {
                        x: 0,
                        borderColor: "#e0e0e0",
                        strokeDashArray: 0,
                        borderWidth: 2,
                    }
                ]
            },
            legend: {
                show: false
            },
            tooltip: {
                y: {
                    formatter: (val) => {
                        return Math.abs(val / 10) + "%";
                    }
                },
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 3,
                    borderRadiusApplication: 'end',
                }
            },
            dataLabels: {
                enabled: false
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            colors: colors
        };
        if (horizontal) {
            options.plotOptions.bar.horizontal = false;
            options.plotOptions.bar.columnWidth = '50%';
            options.xaxis = {
                categories: data.categories,
                min: -bounds * 10, max: bounds * 10,
                labels: {
                    formatter: undefined
                }
            };
            options.yaxis = {
                labels: {
                    showDuplicates: true,
                    formatter: function (val) {
                        return Math.abs(Math.round(val / 10)) + "%";
                    }
                }
            };
        }
        const start = performance.now();
        new ApexCharts($id(chartId), options).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: subtitle,
            type: "pop-pyramid",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
    static createPieChart(chartId, data, title, colors, height) {
        const options = {
            chart: {
                id: chartId,
                type: 'pie',
                height: height,
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            series: data.series,
            labels: data.labels,
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            responsive: [{
                    breakpoint: 480,
                }],
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center'
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: true,
                    left: 0,
                    top: 0,
                    opacity: 0.5
                }
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            colors: colors
        };
        const start = performance.now();
        new ApexCharts($id(chartId), options).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: undefined,
            type: "pie",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
    static createBoxPlot(chartId, data, title, subtitle, height = 300, bounds, vertical = false, change = false, upperColor = '#775DD0', lowerColor = '#6649ca', heightInches = false) {
        const options = {
            chart: {
                id: chartId,
                type: 'boxPlot',
                height: height,
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize: '12px'
                },
            },
            series: [
                {
                    type: 'boxPlot',
                    data: data,
                }
            ],
            responsive: [{
                    breakpoint: 480,
                }],
            plotOptions: {
                bar: {
                    horizontal: !vertical,
                    barHeight: '75%'
                },
                boxPlot: {
                    expandOnClick: false,
                    colors: {
                        upper: upperColor,
                        lower: lowerColor,
                    }
                }
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center'
            },
            grid: {
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                borderColor: '#e0e0e020',
            },
            stroke: {
                colors: ['#ddd'],
                width: 2
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            tooltip: {
                shared: false,
                intersect: true,
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const d = w.config.series[seriesIndex].data[dataPointIndex];
                    let [min, q1, median, q3, max] = d.y;
                    if (heightInches) {
                        min = `${min.toFeetInches(0)} (${min.asCm("imperial").roundTo(0)} cm)`;
                        q1 = `${q1.toFeetInches(0)} (${q1.asCm("imperial").roundTo(0)} cm)`;
                        median = `${median.toFeetInches(0)} (${median.asCm("imperial").roundTo(0)} cm)`;
                        q3 = `${q3.toFeetInches(0)} (${q3.asCm("imperial").roundTo(0)} cm)`;
                        max = `${max.toFeetInches(0)} (${max.asCm("imperial").roundTo(0)} cm)`;
                    }
                    const outliers = d.goals?.map((a) => (a.value - a.jitter).roundTo(2)).sort((a, b) => a - b);
                    if (outliers?.length > 0) {
                        return `
                        <div class="apexcharts-tooltip-title" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">${d.x}</div>
                        <div class="apexcharts-tooltip-box apexcharts-tooltip-boxPlot">
                            <div class="apexcharts-tooltip-text" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">
                                Maximum: <b>${max}</b><br>
                                Q3: <b>${q3}</b><br>
                                Median: <b>${median}</b><br>
                                Q1: <b>${q1}</b><br>
                                Minimum: <b>${min}</b><br>
                                <div style="margin-top: 2px; font-size: 11px; color: #bbb;">
                                    Outliers: <b>${outliers.length}/${d.total}</b>
                                </div>
                            </div>
                        </div>`;
                    }
                    else if (d.total > 0) {
                        return `
                        <div class="apexcharts-tooltip-title" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">${d.x}</div>
                        <div class="apexcharts-tooltip-box apexcharts-tooltip-boxPlot">
                            <div class="apexcharts-tooltip-text" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">
                                Maximum: <b>${max}</b><br>
                                Q3: <b>${q3}</b><br>
                                Median: <b>${median}</b><br>
                                Q1: <b>${q1}</b><br>
                                Minimum: <b>${min}</b><br>
                                <div style="margin-top: 2px; font-size: 11px; color: #bbb;">
                                    Total: <b>${d.total}</b>
                                </div>
                            </div>
                        </div>`;
                    }
                    return `
                    <div class="apexcharts-tooltip-title" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">${d.x}</div>
                    <div class="apexcharts-tooltip-box apexcharts-tooltip-boxPlot">
                        <div class="apexcharts-tooltip-text" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">
                            Maximum: <b>${max}</b><br>
                            Q3: <b>${q3}</b><br>
                            Median: <b>${median}</b><br>
                            Q1: <b>${q1}</b><br>
                            Minimum: <b>${min}</b>
                        </div>
                    </div>`;
                }
            }
        };
        if (vertical) {
            options.yaxis = {
                decimalsInFloat: 0,
                min: 0, max: bounds
            };
        }
        else if (change && bounds) {
            options.xaxis = {
                min: -bounds, max: bounds,
            };
            options.annotations = {
                xaxis: [
                    {
                        x: 0,
                        borderColor: "#e0e0e0",
                        strokeDashArray: 0,
                        borderWidth: 2,
                    }
                ]
            };
        }
        else if (bounds) {
            options.xaxis = {
                min: 0, max: bounds
            };
        }
        const start = performance.now();
        new ApexCharts($id(chartId), options).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: subtitle,
            type: "boxplot",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
    static createScatterPlot(chartId, data, title, subtitle, hideSeries, colors, height, tickAmount = 10, customOptions) {
        hideSeries.forEach(index => {
            if (data[index]) {
                data[index].hidden = true;
            }
        });
        const options = {
            chart: {
                id: chartId,
                type: 'scatter',
                height: height,
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize: '12px'
                },
            },
            series: data,
            xaxis: {
                tickAmount: tickAmount,
                labels: {
                    show: true
                },
                title: {
                    text: data[0]?.xLabel,
                    offsetY: -10,
                },
            },
            yaxis: {
                title: {
                    text: data[0]?.yLabel,
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center'
            },
            tooltip: {
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const point = w.config.series[seriesIndex].data[dataPointIndex];
                    const xLabel = w.config.series[seriesIndex]?.xLabel ?? "X";
                    const yLabel = w.config.series[seriesIndex]?.yLabel ?? "Y";
                    const name = w.config.series[seriesIndex].name;
                    return `
                    <div class="apexcharts-tooltip-title" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">${name}</div>
                    <div class="apexcharts-tooltip-box apexcharts-tooltip-scatter">
                        <div class="apexcharts-tooltip-text" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">
                            ${xLabel}: <b>${point[0]}</b><br>
                            ${yLabel}: <b>${point[1]}</b><br>
                        </div>
                    </div>`;
                },
            },
            grid: {
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                borderColor: '#e0e0e020',
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            stroke: {
                colors: ['transparent'],
                width: 3,
            },
            markers: {
                size: 5,
                strokeWidth: 1,
                strokeColors: '#090909',
            },
            colors: colors,
        };
        const start = performance.now();
        new ApexCharts($id(chartId), { ...options, ...customOptions }).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: subtitle,
            type: "scatter",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
    static createHeatmap(chartId, data, title, subtitle, color, height, customOptions) {
        const options = {
            chart: {
                id: chartId,
                type: 'heatmap',
                height: height,
                toolbar: { show: false },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: Apex.animationEnabled
                },
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize: '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize: '12px'
                },
            },
            series: data,
            xaxis: {
                labels: {
                    show: true
                },
                title: {
                    text: data[0]?.xLabel,
                    offsetY: -10,
                },
            },
            yaxis: {
                title: {
                    text: data[0]?.yLabel,
                },
            },
            tooltip: {
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const xLabel = w.config.series[seriesIndex]?.xLabel ?? "X";
                    const xCoord = w.config.series[seriesIndex].data[dataPointIndex].xAxis;
                    const yLabel = w.config.series[seriesIndex]?.yLabel ?? "Y";
                    const yCoord = w.config.series[seriesIndex].yAxis;
                    const count = w.config.series[seriesIndex].data[dataPointIndex].y;
                    return `
                    <div class="apexcharts-tooltip-title" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">${count} respondents</div>
                    <div class="apexcharts-tooltip-box apexcharts-tooltip-scatter">
                        <div class="apexcharts-tooltip-text" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">
                            ${yLabel}: <b>${yCoord}</b><br>
                            ${xLabel}: <b>${xCoord}</b><br>
                        </div>
                    </div>`;
                },
            },
            grid: {
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                borderColor: '#e0e0e020',
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    }
                }
            },
            theme: {
                mode: 'dark',
                palette: 'palette1',
            },
            stroke: {
                show: false,
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '10px',
                    fontWeight: '600',
                }
            },
            plotOptions: {
                heatmap: {
                    radius: 0
                }
            },
            colors: [color],
        };
        const start = performance.now();
        new ApexCharts($id(chartId), { ...options, ...customOptions }).render();
        Apex.#charts.push({
            id: chartId,
            title: title,
            subtitle: subtitle,
            type: "heatmap",
            loadTime: (performance.now() - start).roundTo(0),
        });
    }
}
function replaceXThanWithSymbol(s) {
    return s
        .replace(/^\s*([^()]+?)(\s*\(.*?\))?\s+or\s+less\s*$/i, '≤$1$2')
        .replace(/^\s*([^()]+?)(\s*\(.*?\))?\s+or\s+more\s*$/i, '≥$1$2')
        .replace(/\s+/g, ' ')
        .trim();
}
//# sourceMappingURL=apex.js.map