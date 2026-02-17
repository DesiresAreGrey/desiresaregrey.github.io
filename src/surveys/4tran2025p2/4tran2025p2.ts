import { Apex } from "../../charts/apex.js";
import { JsonFetch } from "../../utils/jsonfetch.js";
import { LoadingBar } from "../../utils/loadingbar.js";
import { WordCloud } from "../../charts/wordcloud.js";
import "../../utils/utils.js";

const charts = [...$$('.apexchart'), ...$$('.wordcloud')];
if (charts.length > 0) {
    LoadingBar.start();

    const master = await JsonFetch.get('/assets/surveys/4tran2025p2/results/_master.json');
    await document.fonts.load("700 1em 'Bitter'");

    let loadedAmount = 0;
    const totalToLoad = charts.length + 1;

    LoadingBar.update(++loadedAmount / totalToLoad, (loadedAmount + 1) / totalToLoad);

    for (const el of charts) {
        const chartId = el.id;
        const dataKey = el.dataset.datakey ?? "";
        const title = el.dataset.title;
        const subtitle = el.dataset.subtitle;
        const hideSeries = el.dataset.hideseries?.parseJson() ?? [];
        const colors = el.dataset.colors?.parseJson() ?? ['#259efa', '#ff4f69', '#00E396', '#FEB019'];
        const color = el.dataset.color ?? '#259efa';
        const height = el.style.height.replace("px", "")?.parseFloat() ?? 300;
        const horizontal = el.dataset.horizontal != undefined;
        const vertical = el.dataset.vertical != undefined;
        const normalized = el.dataset.normalized != undefined;
        const upperColor = el.dataset.upperColor ?? '#775DD0';
        const lowerColor = el.dataset.lowerColor ?? '#6649ca';
        const heightInches = el.dataset.heightInches != undefined;

        switch (el.dataset.chart) {
            case "ratio-bar":
                Apex.createRatioBarChart(chartId, master[dataKey], title, subtitle, hideSeries, colors, height, normalized); break;
            case "bar":
                Apex.createBarChart(chartId, master[dataKey], title, subtitle, hideSeries, colors, height, true); break;
            case "column":
                Apex.createBarChart(chartId, master[dataKey], title, subtitle, hideSeries, colors, height, false); break;
            case "pop-pyramid":
                Apex.createPopPyramidChart(chartId, master[dataKey], title, subtitle, hideSeries, colors, height, el.dataset.bounds?.parseFloat() ?? 15, horizontal); break;
            case "pie":
                Apex.createPieChart(chartId, master[dataKey], title, colors, height); break;
            case "boxplot":
                Apex.createBoxPlot(chartId, master[dataKey], title, subtitle, height, el.dataset.bounds?.parseFloat() ?? undefined, vertical, false, upperColor, lowerColor, heightInches); break;
            case "change-boxplot":
                Apex.createBoxPlot(chartId, master[dataKey], title, subtitle, height, el.dataset.bounds?.parseFloat() ?? 5, vertical, true, upperColor, lowerColor); break;
            case "scatter":
                Apex.createScatterPlot(chartId, master[dataKey], title, subtitle, hideSeries, colors, height); break;
            case "heatmap":
                Apex.createHeatmap(chartId, master[dataKey], title, subtitle, color, height); break;
        }

        const minSize = el.dataset.minSize?.parseFloat() ?? 10;
        const maxSize = el.dataset.maxSize?.parseFloat() ?? 150;
        const padding = el.dataset.padding?.parseFloat() ?? 4;
        const scaleLinear = el.dataset.scaleLinear != undefined;

        if (el.classList.contains('wordcloud')) {
            WordCloud.createWordCloud(el.id, master[dataKey], height, color, {
                minSize: minSize,
                maxSize: maxSize,
                padding: padding,
                scaleLinear: scaleLinear,
                unit: "respondent"
            });
        }

        loadedAmount++;
        await LoadingBar.updateAsync(loadedAmount / totalToLoad, (loadedAmount + 1) / totalToLoad);
    }

    LoadingBar.finish();
    showPerformancePopup();
    //console.log(Charts.charts);
}

function showPerformancePopup() {
    const debugLoadTimeDiv = document.createElement('div');
    debugLoadTimeDiv.style.position = 'fixed';
    debugLoadTimeDiv.style.bottom = '4px';
    debugLoadTimeDiv.style.right = '4px';

    if (WordCloud.wordclouds.length > 0) {
        debugLoadTimeDiv.innerHTML = `
            ${Apex.charts.length} Charts (${Apex.charts.map(c => c.loadTime).reduce((a, b) => a + b, 0).roundTo(0)} ms)<br>
            ${WordCloud.wordclouds.length} Clouds (${WordCloud.wordclouds.map(c => c.loadTime).reduce((a, b) => a + b, 0).roundTo(0)} ms)<br>
            Fully loaded in ${(LoadingBar.elapsedTime)?.roundTo(0)} ms
        `;
    }
    else {
        debugLoadTimeDiv.innerHTML = `
            ${Apex.charts.length} Charts (${Apex.charts.map(c => c.loadTime).reduce((a, b) => a + b, 0).roundTo(0)} ms)<br>
            Fully loaded in ${(LoadingBar.elapsedTime)?.roundTo(0)} ms
        `;
    }
    
    debugLoadTimeDiv.style.textShadow = '0 0 4px rgba(0, 0, 0, 0.8)';
    debugLoadTimeDiv.style.transition = 'opacity 250ms ease';
    debugLoadTimeDiv.style.textAlign = 'right';
    setTimeout(() => debugLoadTimeDiv.style.setProperty('opacity', '0'), 4000);
    document.body.appendChild(debugLoadTimeDiv);
}

