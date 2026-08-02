---
title: "Extended 4tran Survey (2025.2) Results: Measurements"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb-measurements.png
tags:
  - survey
---
<script src="/js/utils/header-title-changer.js" data-title="Page 2 - Measurements"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">

<script type="module" src="/js/surveys/4tran2025p2/measurements.js"></script>
<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

<style>
.container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.center-container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}
.scatterapexchart {
  min-height: 0 !important;
  margin-bottom: .5rem;
}
.input {
  height: 30px;
  max-height: 30px;
  padding: .15rem;
  background: #252525;
  border: .1rem solid;
  border-radius: 50vw;
  border-color: transparent;
  font-weight: 200;
  font-size: 17px;
  font-family: Inter, sans-serif;
  text-align: center;
  color: #ccc;
  transition: border-color 200ms ease;
  &:hover {
    border-color: var(--md-primary-fg-color);
  }
  &:focus-visible {
    border-color: #9152ff;
  }
}
.toggleContainer {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  border: .1rem solid var(--md-primary-fg-color);
  border-radius: 100vh;
  cursor: pointer;
  height: 40px; 
  font-variation-settings: 'wght' 400;
}
.toggleContainer::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  bottom: 2px;
  width: calc(50% - 2px); 
  border-radius: 100vh;
  background: var(--md-primary-fg-color);
  transition: all 0.3s;
}
.toggleCheckbox:checked + .toggleContainer::before {
  transform: translateX(100%);
}
.toggleContainer div {
  padding: 4px 16px;
  text-align: center;
  z-index: 1;
}
.toggleCheckbox {
  display: none;
}
.toggleCheckbox:checked + .toggleContainer div:first-child {
  color: var(--md-primary-fg-color);
  transition: color 0.3s;
}
.toggleCheckbox:checked + .toggleContainer div:last-child {
  color: white;
  transition: color 0.3s;
}
.toggleCheckbox + .toggleContainer div:first-child {
  color: white;
  transition: color 0.3s;
}
.toggleCheckbox + .toggleContainer div:last-child {
  color: var(--md-primary-fg-color);
  transition: color 0.3s;
}
.label .label-subtitle {
  font-size: 0.5rem;
  opacity: 0.7;
  margin-top: -0.2rem;
  margin-bottom: 0.2rem;
}
.toggle-container{
  margin-bottom: 6px;
  display: flex;
  width: 220px;
  justify-content: right;
}

.panel {
  width: fit-content;
  display: inline-block;
}
.right-panel {
  float: right;
  justify-content: right;
  text-align: right;
}

@media (max-width: 640px) {
  .container {
    justify-content: center;
  }
  .panel {
    width: auto;
    display: block;
  }
  .right-panel {
    width: auto;
    float: none;
    justify-content: center;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .toggle-container {
    margin-bottom: 6px;
    display: flex;
    width: 280px;
    justify-content: center;
    
  }
  .label {
    margin-top: 0.2rem;
    text-align: center !important;
  }
  .label .label-subtitle {
    margin-bottom: -0.2rem;
  }
}
</style>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 2 - Measurements</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

## Measurements

### Height

Even more of a normal distribution than the first survey. Its kinda beautiful visually tbh (when ignoring the brutal dimorphism of height).

<div class="chart-set">
  <input id="height-a" class="vh" type="radio" name="view-height" checked>
  <input id="height-b" class="vh" type="radio" name="view-height">
  
  <div class="chart-stack">
    <div id="height-pop-pyramid" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="pop-pyramid"
      data-datakey="height_pop_pyramid"
      data-title="Height"
      data-subtitle="Population Pyramid"
      data-bounds="15"
      >
    </div>
    <div id="height-inches-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="boxplot"
      data-datakey="height_inches_boxplot"
      data-subtitle="Box Plot"
      data-title="Height"
      data-height-inches
      >
    </div>
  </div>
  <div class="toggle">
    <label for="height-a" class="noselect">Population Pyramid</label>
    <label for="height-b" class="noselect">Box Plot</label>
  </div>
</div>

### Weight

Weight is dependent on height generally, so the dimorphism is due to height differences. Its interesting seeing how many outliers there are though.

<div class="chart-set">
  <input id="weight-a" class="vh" type="radio" name="view-weight" checked>
  <input id="weight-b" class="vh" type="radio" name="view-weight">
  
  <div class="chart-stack" style="min-height: 350px;">
    <div id="weight-inches-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 350px;"
      data-chart="boxplot"
      data-datakey="weight_pounds_boxplot"
      data-subtitle="Box Plot (Pounds)"
      data-title="Weight"
      >
    </div>
    <div id="weight-cm-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 350px;"
      data-chart="boxplot"
      data-datakey="weight_kg_boxplot"
      data-subtitle="Box Plot (Kilograms)"
      data-title="Weight"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="weight-a" class="noselect">Box Plot (Pounds)</label>
    <label for="weight-b" class="noselect">Box Plot (Kilograms)</label>
  </div>
</div>

### BMI

BMI doesn't have that issue with height dimorphism since its divided by height or whatever. The box plots are pretty much the same between men and
women with men having a very slightly higher BMI.

<div id="bmi-boxplot" 
  class="apexchart chart-layer layer-a"
  style="height: 350px;"
  data-chart="boxplot"
  data-datakey="bmi_boxplot"
  data-subtitle="Box Plot"
  data-title="BMI"
  >
</div>

People really wanted me to add a heatmap in addition to the scatter plot thats included with the calculator below. It is a bit easier to see the
distribution on the heatmap tbf, but the scatter plot is still kinda needed for the calculator.

<div class="chart-set">
  <input id="heightweight-a" class="vh" type="radio" name="view-heightweight" checked>
  <input id="heightweight-b" class="vh" type="radio" name="view-heightweight">
  
  <div class="chart-stack">
    <div id="ftm-heightweight-heatmap" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="heatmap"
      data-datakey="height_weight_imperial_ftm_heatmap"
      data-subtitle="Heatmap"
      data-title="Height vs Weight (FtM)"
      data-color="#259efa"
      >
    </div>
    <div id="mtf-heightweight-heatmap" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="heatmap"
      data-datakey="height_weight_imperial_mtf_heatmap"
      data-subtitle="Heatmap"
      data-title="Height vs Weight (MtF)"
      data-color="#ff4f69"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="heightweight-a" class="noselect">Heatmap (FtM)</label>
    <label for="heightweight-b" class="noselect">Heatmap (MtF)</label>
  </div>
</div>



___

## Calculator

<div class="panel">
  <div class="container">
    <select id="units" class="input" style="width: 10rem;">
      <option value="imperial">Imperial</option>
      <option value="metric">Metric</option>
    </select>
  </div>

  <div class="container">
    <div style="margin-top: 6px;" >
      <span id="height-feet-section">
        <input id="height-feet-input" class="input" type="text" inputmode="decimal" step="1" value="5" style="width: 2rem;">
        <span style="min-width: 12ch; margin-top: 4px; margin-right: 4px; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75">Feet</span>
      </span>
      <input id="height-input" class="input" type="text" inputmode="decimal" step="1" value="6" style="width: 2rem;">
      <span id="height-units-label" style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75">Inches</span>
    </div>
  </div>

  <div style="margin-top: 6px;" class="container">
    <div>
      <input id="weight-input" class="input" type="number" inputmode="decimal" step="1" value="170" style="width: 3rem;">
      <span id="weight-units-label" style="min-width: 12ch; margin-top: 4px; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75">Pounds</span>
    </div>
  </div>

  <div style="margin-top: 6px;">
    <div style="border-radius: 1rem;">
      <span id="info-height" class="container" style="min-width: 12ch; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75">0'0" - 0.0 cm</span>
      <span id="info-weight" class="container" style="min-width: 12ch; margin-top: 0; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75">0 lbs - 0 kg</span>
      <span id="info-bmi" class="container" style="min-width: 12ch; margin-top: 0; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75">0 BMI</span>
    </div>
  </div>

</div>

<div class="panel right-panel" >
  <div>
    <h4 style="margin-top: -0.25rem; margin-bottom: -0.325rem; font-size: 20px; font-variation-settings: 'wght' 700; opacity: 0.9;">FtM</h4>
    <p id="ftm-percentile" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 18px; font-variation-settings: 'wght' 500;">0.0th Percentile</p>
    <p id="ftm-tallerthan" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75;">You are taller than 0% of FtMs</p>
    <p id="ftm-shorterthan" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75;">You are shorter than 100% of FtMs</p>
    <p id="ftm-average" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 12px; font-variation-settings: 'wght' 400; opacity: 0.75;">You are X than the average</p>
  </div>
  <div>
    <h4 style="margin-top: 0.5rem; margin-bottom: -0.325rem; font-size: 20px; font-variation-settings: 'wght' 700; opacity: 0.9;">MtF</h4>
    <p id="mtf-percentile" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 18px; font-variation-settings: 'wght' 500;">0.0th Percentile</p>
    <p id="mtf-tallerthan" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75;">You are taller than 0% of MtFs</p>
    <p id="mtf-shorterthan" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 14px; font-variation-settings: 'wght' 400; opacity: 0.75;">You are shorter than 100% of MtFs</p>
    <p id="mtf-average" style="margin-top: 0; margin-bottom: -0.325rem; font-size: 12px; font-variation-settings: 'wght' 400; opacity: 0.75;">You are X than the average</p>
  </div>
</div>

<div id="height-weight-scatter" style="height: 500px; margin-bottom: 0.69rem;" class="scatterapexchart"></div>

<div class="center-container">
  <div class="label" style="width: 7rem;">Scatter Plot
    <div class="label-subtitle">May be heavy on mobile</div>
  </div>
  <div class="toggle-container">
    <input type="checkbox" id="scatterplot-type-toggle" class="toggleCheckbox" />
    <label for="scatterplot-type-toggle" class='toggleContainer'>
      <div class="noselect" style="margin-right: 16px; margin-left: 16px;">Show</div>   
      <div class="noselect" style="margin-right: 16px; margin-left: 16px;">Hide</div>
    </label>
  </div>
</div>
<div class="center-container">
  <div class="label" style="width: 7rem;">Show Self
    <div class="label-subtitle">Shows your height/weight</div>
  </div>
  <div class="toggle-container">
    <input type="checkbox" id="scatterplot-self-toggle" class="toggleCheckbox" />
    <label for="scatterplot-self-toggle" class='toggleContainer'>
      <div class="noselect" style="margin-right: 16px; margin-left: 16px;">Show</div>   
      <div class="noselect" style="margin-right: 16px; margin-left: 16px;">Hide</div>
    </label>
  </div>
</div>
<script>
  const typeChecked = localStorage.getItem('scatterplot-type-toggle-checked');
  if (typeChecked != null) {
    document.getElementById('scatterplot-type-toggle').checked = JSON.parse(typeChecked);
  }
  else if (window.innerWidth <= 768) {
    document.getElementById('scatterplot-type-toggle').checked = true;
  }
</script>

___

<div class="button-container">
  <a class="big-button" href="../">Previous Page</a>
  <a class="big-button" href="../socialmedia">Next Page</a>
</div>