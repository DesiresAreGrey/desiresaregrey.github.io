const colors = ['#259efa', '#ff4f69', '#00E396', '#3f51b5', '#D7263D'];
const path = document.currentScript.dataset.path || "/assets/surveys/4tran2025/results/";

function createBarChart(chartId, dataUrl, title = undefined, subtitle = undefined, hideSeries = [], customColors = undefined, height = 500) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        hideSeries.forEach(index => {
            if (data.series[index]) {
                data.series[index].hidden = true;
            }
        });
        data.categories = data.categories.map(c => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                type: 'bar',
                height: height,
                stacked: true,
                toolbar: { show: true },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                        const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                        const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                        return `${val} respondents (${pct}%)`;
                    }
                }
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
            colors: customColors ?? colors
        };
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createRatioBarChart(chartId, dataUrl, title = undefined, subtitle = undefined, hideSeries = [], customColors = undefined, height = 300) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        hideSeries.forEach(index => {
            if (data.series[index]) {
                data.series[index].hidden = true;
            }
        });
        data.categories = data.categories.map(c => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                type: 'bar',
                height: height,
                stacked: true,
                stackType: '100%',
                toolbar: { show: true },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                        const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                        const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                        return `${val} respondents (${pct}%)`;
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
            colors: customColors ?? colors
        };
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createPopPyramidChart(chartId, dataUrl, title = undefined, subtitle = undefined, bounds = 15.0, height = 500) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        data.categories = data.categories.map(c => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                type: 'bar',
                height: height,
                stacked: true,
                toolbar: { show: true },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            series: data.series,
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
                },
            },
            xaxis: {
                categories: data.categories,
                min: -bounds * 10, max: bounds * 10,
                labels: {
                    formatter: function (val) {
                        return Math.abs(Math.round(val/10)) + "%"
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
                    formatter: (val, opts) => {
                        const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                        const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                        return Math.abs(val/10) + "%";
                    }
                }
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
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createColumnChart(chartId, dataUrl, title = undefined, subtitle = undefined, hideSeries = [], customColors = undefined, height = 500) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        hideSeries.forEach(index => {
            if (data.series[index]) {
                data.series[index].hidden = true;
            }
        });
        data.categories = data.categories.map(c => replaceXThanWithSymbol(c));
        const options = {
            chart: {
                type: 'bar',
                height: height,
                stacked: true,
                toolbar: { show: true },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                        const total = opts.w.globals.stackedSeriesTotals[opts.dataPointIndex];
                        const pct = total ? ((val / total) * 100).toFixed(1) : 0;
                        return `${val} respondents (${pct}%)`;
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
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
            colors: customColors ?? colors
        };
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createPieChart(chartId, dataUrl, title = undefined, hideToolbar = false, customColors = undefined) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        const options = {
            chart: {
                type: 'pie',
                height: 325,
                toolbar: { show: !hideToolbar },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            series: data.series,
            labels: data.labels,
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
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
            colors: customColors ?? colors
        };
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createBoxPlot(chartId, dataUrl, title = undefined, subtitle = undefined, hideToolbar = false, height = 300) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        const options = {
            chart: {
                type: 'boxPlot',
                height: height,
                toolbar: { show: !hideToolbar },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                    horizontal: true,
                    barHeight: '75%'
                },
                boxPlot: {
                    expandOnClick: false,
                    colors: {
                        upper: '#775DD0',
                        lower: '#6649ca',
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
                    const [min, q1, median, q3, max] = d.y;
                    const outliers = d.goals?.map(a => (a.value - a.jitter).toFixed(2) / 1).sort((a, b) => a - b);
                    console.log(outliers);
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
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createVertBoxPlot(chartId, dataUrl, title = undefined, subtitle = undefined, hideToolbar = false, height = 300) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        const options = {
            chart: {
                type: 'boxPlot',
                height: height,
                toolbar: { show: !hideToolbar },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                    horizontal: false,
                    barHeight: '75%'
                },
                boxPlot: {
                    expandOnClick: false,
                    colors: {
                        upper: '#775DD0',
                        lower: '#6649ca',
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
                    const [min, q1, median, q3, max] = d.y;
                    const outliers = d.goals?.map(a => (a.value - a.jitter).toFixed(2) / 1).sort((a, b) => a - b);
                    console.log(outliers);
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
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createChangeBoxPlot(chartId, dataUrl, title = undefined, subtitle = undefined, hideToolbar = false, bounds = 5.0, height = 300) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        const options = {
            chart: {
                type: 'boxPlot',
                height: height,
                toolbar: { show: !hideToolbar },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                    horizontal: true,
                    barHeight: '75%'
                },
                boxPlot: {
                    expandOnClick: false,
                    colors: {
                        upper: '#775DD0',
                        lower: '#6649ca',
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
            xaxis: {
                min: -bounds, max: bounds,
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
            tooltip: {
                shared: false,
                intersect: true,
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const d = w.config.series[seriesIndex].data[dataPointIndex];
                    const [min, q1, median, q3, max] = d.y;
                    const outliers = d.goals?.map(a => (a.value - a.jitter).toFixed(2) / 1).sort((a, b) => a - b);
                    console.log(outliers);
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
            },
            colors: ['#546E7A', '#A5978B']
        };
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createPoliticsBoxPlot(chartId, dataUrl, title = undefined, subtitle = undefined, hideToolbar = false, height = 300) {
    fetch(path + dataUrl).then(response => response.json()).then(data => {
        const options = {
            chart: {
                type: 'boxPlot',
                height: height,
                toolbar: { show: !hideToolbar },
                background: '#090909',
                fontFamily: 'Inter, Arial, sans-serif',
                events: {
                    mounted: (chartCtx) => apexMountedFix(chartCtx)
                }
            },
            title: {
                text: title,
                align: 'center',
                style: {
                    fontSize:  '20px'
                },
            },
            subtitle: {
                text: subtitle,
                align: 'center',
                floating: true,
                style: {
                    fontSize:  '12px'
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
                    horizontal: true,
                    barHeight: '75%'
                },
                boxPlot: {
                    expandOnClick: false,
                    colors: {
                        upper: '#775DD0',
                        lower: '#6649ca',
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
                        show: false 
                    },
                    axisBorder: {
                        show: false,
                    },
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
            xaxis: {
                min: 0, max: 10,
                maxWidth: 160,
                labels: {
                    formatter: function (val) {
                        if (val == 0) 
                            return "Left [0]";
                        else if (val == 5) 
                            return "Center [5]";
                        else if (val == 10) 
                            return "Right [10]";
                        else
                            return "";
                    },
                    offsetX: -2
                },
                tickAmount: 10,
            },
            yaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                }
            },
            theme: {
                mode: 'dark', 
                palette: 'palette1',
            },
            annotations: {
                xaxis: [
                    {
                        x: 5,
                        borderColor: "#e0e0e0",
                        strokeDashArray: 0,
                        borderWidth: 1,
                    }
                ]
            },
            tooltip: {
                shared: false,
                intersect: true,
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const d = w.config.series[seriesIndex].data[dataPointIndex];
                    const [min, q1, median, q3, max] = d.y;
                    const outliers = d.goals?.map(a => (a.value - a.jitter).toFixed(2) / 1).sort((a, b) => a - b);
                    console.log(outliers);
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
        new ApexCharts(document.querySelector("#" + chartId), options).render();
    });
}

function createUSMap(chartId, dataUrl) {
    am5.ready(function() {
        var root = am5.Root.new(chartId);
        root._logo.dispose();

        var chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "none", 
            panY: "none",
            wheelX: "none", 
            wheelY: "none",
            projection: am5map.geoAlbersUsa()
        }));

        chart.panEventsEnabled = false;
        chart.tapToActivate = true;
        chart.tapTimeout = 500;

        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_usaLow,
            valueField: "value",
            calculateAggregates: true
        }));

        polygonSeries.mapPolygons.template.setAll({
            tooltipHTML: `<div class="am5-tooltip-new"><b>{name}</b><br>Respondents: {value}</div>`,
            fill: "#262f33", 
            strokeWidth: 1,
            stroke: "#090909"
        });

        polygonSeries.set("heatRules", [{
            target: polygonSeries.mapPolygons.template,
            key: "fill",
            min: am5.color(0x333f44),
            max: am5.color(0x00E396),
            dataField: "value",
            logarithmic: true
        }]);
        
        polygonSeries.mapPolygons.template.states.create("hover", {
            fill:  am5.color(0x61ba9c),
        });
        
        fetch(path + dataUrl).then(response => response.json()).then(data => {
            polygonSeries.data.setAll(data);
        });
    });
}

function createWorldMap(chartId, dataUrl) {
    am5.ready(function() {
        var root = am5.Root.new(chartId);
        root._logo.dispose();

        var chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "none", 
            panY: "none",
            wheelX: "none", 
            wheelY: "none",
            projection: am5map.geoMercator()
        }));

        chart.panEventsEnabled = false;
        chart.tapToActivate = true;
        chart.tapTimeout = 500;

        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            valueField: "value",
            calculateAggregates: true,
            exclude: ["AQ"]
        }));

        polygonSeries.mapPolygons.template.setAll({
            tooltipHTML: `<div class="am5-tooltip-new"><b>{name}</b><br>Respondents: {value}</div>`,
            fill: "#262f33", 
            strokeWidth: 0.5,
            stroke: "#090909"
        });

        polygonSeries.set("heatRules", [{
            target: polygonSeries.mapPolygons.template,
            key: "fill",
            min: am5.color(0x333f44),
            max: am5.color(0x00E396),
            dataField: "value",
            logarithmic: true
        }]);
        
        polygonSeries.mapPolygons.template.states.create("hover", {
            fill:  am5.color(0x61ba9c),
        });

        fetch(path + dataUrl).then(response => response.json()).then(data => {
            polygonSeries.data.setAll(data);
        });
    });
}

function replaceXThanWithSymbol(s) {
  return String(s)
    .replace(/^\s*([^()]+?)(\s*\(.*?\))?\s+or\s+less\s*$/i, '≤$1$2')
    .replace(/^\s*([^()]+?)(\s*\(.*?\))?\s+or\s+more\s*$/i, '≥$1$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function apexMountedFix(chartCtx) {
    chartCtx.el.querySelectorAll('.apexcharts-menu-icon').forEach(el => el.removeAttribute('title'));
    chartCtx.el.querySelectorAll('.exportCSV').forEach(el => {
        el.removeAttribute('title');
        el.textContent = "CSV";
    });
}

