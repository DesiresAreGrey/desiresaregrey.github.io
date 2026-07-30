import { Apex } from "../../charts/apex.js";
import ApexCharts from 'apexcharts';
import { LoadingBar } from "../../ui/loadingbar.js";
import "../../utils/utils.js";
const unitsSelect = $("#units");
const getUnits = () => unitsSelect.value;
const heightInput = $("#height-input");
const heightFeetInput = $("#height-feet-input");
const weightInput = $("#weight-input");
const infoHeight = $("#info-height");
const infoWeight = $("#info-weight");
const infoBmi = $("#info-bmi");
const scatterplotChartToggle = $("#scatterplot-type-toggle");
const scatterplotChartEnabled = () => !scatterplotChartToggle.checked;
const scatterplotSelfToggle = $("#scatterplot-self-toggle");
const scatterplotSelfEnabled = () => !scatterplotSelfToggle.checked;
let selfEnabledLast = scatterplotSelfEnabled();
let chartLoaded = false;
let scatterChartHeight = $("#height-weight-scatter").style.height.replace("px", "")?.parseFloat() ?? 550;
if (!scatterplotChartEnabled()) {
    $("#height-weight-scatter").style.height = "0";
}
updateUnitUI(getUnits());
const master = await (await fetch("/assets/surveys/4tran2025p2/results/_master.json")).json();
const heightData = master["height_inches_mean_sd"];
const scatterData = master["height_weight_imperial_scatter"];
const heightStats = Object.fromEntries(heightData.map((r) => [r.Gender, { mean: r.Mean, sd: r.SD }]));
unitsSelect.addEventListener("change", (e) => {
    changeUnit(e.target.dataset.oldValue, e.target.value);
    e.target.dataset.oldValue = e.target.value;
    update();
});
unitsSelect.dataset.oldValue = unitsSelect.value;
heightInput.addEventListener("input", update);
heightInput.addEventListener("keydown", exitOnEnter);
heightInput.addEventListener("focus", focusInput);
heightInput.addEventListener("blur", updateScatterPlot);
heightFeetInput.addEventListener("input", update);
heightFeetInput.addEventListener("keydown", exitOnEnter);
heightFeetInput.addEventListener("focus", focusInput);
heightFeetInput.addEventListener("blur", updateScatterPlot);
weightInput.addEventListener("input", update);
weightInput.addEventListener("keydown", exitOnEnter);
weightInput.addEventListener("focus", focusInput);
weightInput.addEventListener("blur", updateScatterPlot);
scatterplotChartToggle.addEventListener("change", toggleChanged);
scatterplotSelfToggle.addEventListener("change", toggleChanged);
update();
function focusInput(e) {
    if (window.innerWidth > 768)
        return;
}
function getTotalHeight(oldUnit) {
    let height = heightInput.value.parseFloat();
    if (oldUnit === "imperial")
        return (height?.asInches(oldUnit) ?? 0) + (heightFeetInput.value.parseFloat()?.mult(12) ?? 0);
    return height ?? 0;
}
function update(e) {
    if (e)
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    let height = getTotalHeight(getUnits());
    let weight = weightInput.value?.parseFloat() ?? 0;
    infoHeight.textContent = `${height?.toFeetInches(1, getUnits())} - ${height.asCm(getUnits()).roundTo(2)} cm`;
    infoWeight.textContent = `${weight.asPounds(getUnits()).roundTo(1)} lbs - ${weight.asKg(getUnits()).roundTo(1)} kg`;
    infoBmi.textContent = `${(weight.asKg(getUnits()) / ((height.asCm(getUnits()) / 100) ** 2)).roundTo(2)} BMI`;
    const units = getUnits() == "imperial" ? "inches" : "cm";
    const ftmZ = (height.asInches(getUnits()) - heightStats["Man (FtM)"].mean) / heightStats["Man (FtM)"].sd;
    const ftmPercentile = Math.max(0, Math.min(100, Phi(ftmZ) * 100));
    $("#ftm-percentile").textContent = `${ftmPercentile.roundTo(1).appendOrdinal()} Percentile`;
    $("#ftm-tallerthan").textContent = `You are taller than ${ftmPercentile.roundTo(1)}% of FtMs`;
    $("#ftm-shorterthan").textContent = `You are shorter than ${(100 - ftmPercentile).roundTo(1)}% of FtMs`;
    const amountAboveBelowFtm = getUnits() == "imperial" ? (height.asInches(getUnits()) - heightStats["Man (FtM)"].mean).roundTo(1) : (height.asCm(getUnits()) - heightStats["Man (FtM)"].mean.asCm("imperial")).roundTo(1);
    const aboveBelowFtm = amountAboveBelowFtm >= 0 ? "taller" : "shorter";
    if (amountAboveBelowFtm != 0)
        $("#ftm-average").textContent = `You are ${amountAboveBelowFtm.abs()} ${units} ${aboveBelowFtm} than the average FtM`;
    else
        $("#ftm-average").textContent = `You are at the average for FtMs`;
    const mtfZ = (height.asInches(getUnits()) - heightStats["Woman (MtF)"].mean) / heightStats["Woman (MtF)"].sd;
    const mtfPercentile = Math.max(0, Math.min(100, Phi(mtfZ) * 100));
    $("#mtf-percentile").textContent = `${mtfPercentile.roundTo(1).appendOrdinal()} Percentile`;
    $("#mtf-tallerthan").textContent = `You are taller than ${mtfPercentile.roundTo(1)}% of MtFs`;
    $("#mtf-shorterthan").textContent = `You are shorter than ${(100 - mtfPercentile).roundTo(1)}% of MtFs`;
    const amountAboveBelowMtf = getUnits() == "imperial" ? (height.asInches(getUnits()) - heightStats["Woman (MtF)"].mean).roundTo(1) : (height.asCm(getUnits()) - heightStats["Woman (MtF)"].mean.asCm("imperial")).roundTo(1);
    const aboveBelowMtf = amountAboveBelowMtf >= 0 ? "taller" : "shorter";
    if (amountAboveBelowMtf != 0)
        $("#mtf-average").textContent = `You are ${amountAboveBelowMtf.abs()} ${units} ${aboveBelowMtf} than the average MtF`;
    else
        $("#mtf-average").textContent = `You are at the average for MtFs`;
}
function changeUnit(oldUnit, newUnit) {
    const num = getTotalHeight(oldUnit);
    if (!isFinite(num) || oldUnit === newUnit)
        return;
    if (newUnit === "imperial") {
        const inches = num.asInches(oldUnit);
        const feet = Math.floor(inches / 12);
        const remainingInches = inches % 12;
        heightFeetInput.value = feet.toString();
        heightInput.value = remainingInches.roundTo(1).toString();
        weightInput.value = weightInput.value?.parseFloat()?.asPounds(oldUnit).roundTo(1).toString() ?? "";
    }
    else {
        heightInput.value = num.asCm(oldUnit).roundTo(1).toString();
        weightInput.value = weightInput.value?.parseFloat()?.asKg(oldUnit).roundTo(1).toString() ?? "";
    }
    updateUnitUI(newUnit);
}
function updateUnitUI(newUnit) {
    const feetSection = $("#height-feet-section");
    const heightUnitsLabel = $("#height-units-label");
    const weightUnitsLabel = $("#weight-units-label");
    if (newUnit === "imperial") {
        feetSection.style.display = "inline-block";
        heightInput.style.width = "2rem";
        heightUnitsLabel.textContent = "Inches";
        weightUnitsLabel.textContent = "Pounds";
    }
    else {
        feetSection.style.display = "none";
        heightInput.style.width = "3rem";
        heightUnitsLabel.textContent = "Centimeters";
        weightUnitsLabel.textContent = "Kilograms";
    }
}
function erf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1 / (1 + p * x);
    const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}
function Phi(z) {
    return 0.5 * (1 + erf(z / Math.SQRT2));
}
let sizeRatio = 1;
updateScatterPlot();
function createScatterPlot() {
    const [origWidth, origHeight] = [907, 550];
    const aspectRatio = origWidth / origHeight;
    const width = $("#height-weight-scatter").offsetWidth;
    sizeRatio = width / origWidth;
    sizeRatio = (1 - (1 - sizeRatio) * 0.75);
    scatterChartHeight = (sizeRatio * origHeight).roundTo(1);
    $("#height-weight-scatter").style.width = width + "px";
    $("#height-weight-scatter").style.height = scatterChartHeight + "px";
    const customOptions = {
        chart: {
            id: "height-weight-scatter",
            type: 'scatter',
            height: scatterChartHeight,
            toolbar: { show: false },
            background: 'transparent',
            fontFamily: 'Inter, Arial, sans-serif',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: false
            },
        },
        tooltip: {
            custom: ({ seriesIndex, dataPointIndex, w }) => {
                const point = w.config.series[seriesIndex].data[dataPointIndex] ?? [0, 0];
                const height = point[1];
                const weight = point[0];
                const bmi = (weight.asKg("imperial") / ((height.asCm("imperial") / 100) ** 2)).roundTo(2);
                const name = w.config.series[seriesIndex].name;
                return `
                <div class="apexcharts-tooltip-title" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">${name}</div>
                <div class="apexcharts-tooltip-box apexcharts-tooltip-scatter">
                    <div class="apexcharts-tooltip-text" style="font-family: Inter, Arial, sans-serif; font-size: 12px;">
                        Height: <b>${point[1].toFeetInches()} - ${point[1].asCm("imperial").roundTo(2)} cm</b><br>
                        Weight: <b>${point[0]} lbs - ${point[0]?.asKg("imperial").roundTo(1)} kg</b><br>
                        BMI: <b>${bmi}</b>
                    </div>
                </div>`;
            },
        },
        xaxis: {
            tickAmount: 11,
            min: 75, max: 350,
            decimalsInFloat: 0,
            labels: {
                show: true
            },
            title: {
                text: scatterData[0]?.xLabel,
                offsetY: -10,
            },
        },
        yaxis: {
            tickAmount: 5,
            min: 55, max: 80,
            decimalsInFloat: 0,
            title: {
                text: scatterData[0]?.yLabel,
            },
        },
        markers: {
            size: [5 * sizeRatio, 5 * sizeRatio, 5 * sizeRatio, 6 * sizeRatio],
            strokeWidth: 1,
            strokeColors: '#090909',
        },
    };
    Apex.createScatterPlot("height-weight-scatter", scatterData, "Height and Weight", "Scatter Plot", [2], ['#259efa', '#ff4f69', '#00E396', '#fff'], scatterChartHeight, 10, customOptions);
    chartLoaded = true;
}
function updateScatterPlot() {
    if (scatterplotChartEnabled() && !chartLoaded) {
        createScatterPlot();
        $("#height-weight-scatter").style.height = scatterChartHeight + "px";
    }
    else if (!scatterplotChartEnabled() && chartLoaded) {
        ApexCharts.exec("height-weight-scatter", "destroy");
        chartLoaded = false;
        $("#height-weight-scatter").style.height = "0";
        return;
    }
    else if (!scatterplotSelfEnabled() && !selfEnabledLast && chartLoaded) {
        return;
    }
    selfEnabledLast = scatterplotSelfEnabled();
    if (!chartLoaded)
        return;
    const usingLoadingBar = !LoadingBar.isActive;
    if (usingLoadingBar)
        LoadingBar.start();
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const xy = [weightInput.value?.parseFloat()?.asPounds(getUnits()).roundTo(1) ?? 0, getTotalHeight(getUnits()).asInches(getUnits()).roundTo(1) ?? 0];
            let data = scatterData;
            let colors = ['#259efa', '#ff4f69', '#00E396', '#fff'];
            let annotations = { xaxis: [{}], yaxis: [{}] };
            if (scatterplotSelfEnabled()) {
                data = [...data, {
                        name: "You",
                        data: [xy],
                        xLabel: "Weight (Pounds)",
                        yLabel: "Height (Inches)"
                    }];
                annotations = {
                    xaxis: [{
                            x: xy[0],
                        }],
                    yaxis: [{
                            y: xy[1],
                        }]
                };
            }
            else {
                data = [...data, {
                        name: "You",
                        data: [[0, 0]],
                        xLabel: "Weight (Pounds)",
                        yLabel: "Height (Inches)"
                    }];
            }
            ApexCharts.exec("height-weight-scatter", "resetSeries");
            ApexCharts.exec("height-weight-scatter", "updateOptions", {
                series: data,
                annotations: annotations,
                xaxis: {
                    tickAmount: 11,
                    min: 75, max: 350,
                    decimalsInFloat: 0,
                    labels: {
                        show: true
                    },
                    title: {
                        text: data[0]?.xLabel,
                        offsetY: -10,
                    },
                },
                yaxis: {
                    tickAmount: 5,
                    min: 55, max: 80,
                    decimalsInFloat: 0,
                    title: {
                        text: data[0]?.yLabel,
                    },
                },
                legend: {
                    show: true,
                    showForSingleSeries: true,
                    showForNullSeries: true,
                    showForZeroSeries: true,
                },
                colors: colors,
            });
            if (usingLoadingBar)
                LoadingBar.finish();
        });
    });
}
function toggleChanged() {
    updateScatterPlot();
    localStorage.setItem('scatterplot-type-toggle-checked', scatterplotChartToggle.checked.toJson());
}
function exitOnEnter(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        e.target?.blur();
    }
}
//# sourceMappingURL=measurements.js.map