---
title: "Extended 4tran Survey (2025.2) Results: Demographics"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb.png
tags:
  - survey
hide:
  - tags
---
<script src="/js/utils/header-title-changer.js" data-title="Page 1 - Demographics"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">
<link rel="stylesheet" href="/stylesheets/socialmedia.css">

<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 1 - Demographics</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

This is the results page for the Extended 4tran Survey (2025.2) which is a follow up survey to the original 2025 4tran Survey, and includes questions that were
requested but missing from the original survey. The survey was open from December 5 to December 31, 2025 and got **1,675** (real) responses. Duplicates were
automatically filtered (if you submitted more than once, only your last submission was kept), and spam/etc was manually removed (thanks
[u/ILoveFurnaceGenocide](https://www.reddit.com/user/ILoveFurnaceGenocide/){ target="_blank" } for the help). 
Feel free to check out the [Reddit Post](https://www.reddit.com/r/4tran4/comments/1qte7l0/the_extended_4tran_survey_20252_results/){ target="_blank" .reddit } 
and the [Tweet](https://x.com/DesiresAreGrey/status/2018102946144092559){ target="_blank" .twitter } about the survey results.

Sorry for taking so long to publish the results, I had a lot of stuff going on in December and January including recovery from FFS. I was originally
hoping to post the results way earlier but I just couldn't realistically.

Its heavily recommended you view this site on desktop! The charts are interactive (click on the legend options to show/hide them). 

<p>
  Follow me on:
  <a class="noselect reddit" style="margin-right: 0.15rem;" href="https://www.reddit.com/user/DesiresAreGrey" target="_blank">
    <i class="fa-brands fa-reddit-alien" style="margin-right: -0.1rem;"></i>
    <span>Reddit</span>
  </a>
  <a class="noselect twitter" style="margin-right: 0.15rem;" href="https://twitter.com/DesiresAreGrey" target="_blank">
    <i class="fa-brands fa-twitter" style="margin-right: -0.1rem;"></i>
    <span>Twitter</span>
  </a>
  <a class="noselect youtube" style="margin-right: 0.15rem;" href="https://www.youtube.com/@DesiresAreGrey" target="_blank">
    <i class="fa-brands fa-youtube" style="margin-right: -0.1rem;"></i>
    <span>YouTube</span>
  </a>
</p>

<style>
.center-container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  width: 250px;
}
.toggle-container {
  display: flex;
  width: 220px;
  margin-bottom: 6px;
}
.label .label-subtitle {
  font-size: 0.5rem;
  opacity: 0.7;
  margin: -0.2rem 0;
}
.toggleContainer {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: fit-content; height: 40px;
  border: .1rem solid var(--md-primary-fg-color);
  border-radius: 100vh;
  cursor: pointer; font-variation-settings: 'wght' 400;
}
.toggleContainer::before {
  content: ''; position: absolute;
  inset: 2px 50% 2px 2px;
  background: var(--md-primary-fg-color);
  border-radius: 100vh;
  transition: transform 0.3s;
}
.toggleCheckbox:checked + .toggleContainer::before {
  transform: translateX(100%);
}
.toggleContainer div {
  padding: 4px 16px;
  margin: 0 16px;
  text-align: center;
  z-index: 1;
  transition: color 0.3s;
}
.toggleCheckbox {
  display: none;
}

.toggleCheckbox + .toggleContainer div:first-child,
.toggleCheckbox:checked + .toggleContainer div:last-child {
  color: white;
}
.toggleCheckbox + .toggleContainer div:last-child,
.toggleCheckbox:checked + .toggleContainer div:first-child {
  color: var(--md-primary-fg-color);
}

@media (max-width: 640px) {
  .center-container, .toggle-container {
    width: 100%;
    justify-content: center;
  }
  .label {
    text-align: center !important;
    margin-top: 0.2rem;
  }
}
</style>

<div class="center-container">
  <div class="label">Chart Animations
    <div class="label-subtitle">Turn off to improve performance</div>
    <div class="label-subtitle">Requires reload</div>
  </div>
  <div class="toggle-container">
    <input type="checkbox" id="chart-animations-toggle" class="toggleCheckbox" />
    <label for="chart-animations-toggle" class='toggleContainer'>
      <div class="noselect">On</div>   
      <div class="noselect">Off</div>
    </label>
  </div>
</div>
<script>
  const toggle = document.getElementById('chart-animations-toggle');
  const typeChecked = localStorage.getItem('chart-animations-enabled');
  if (typeChecked != null) {
    toggle.checked = !JSON.parse(typeChecked);
  }
  else if (window.innerWidth <= 768) {
    toggle.checked = true;
  }
  toggle.addEventListener("change", () => localStorage.setItem('chart-animations-enabled', JSON.stringify(!toggle.checked)));
</script>

## Demographics

### Gender

The ratio between men and women is a bit better this time! Last time the binary pie chart had men at 23% and women at 77%, while here men are at 26%.
A 3% increase isn't crazy but it's still pretty cool to see that number go up instead of down.

<div class="charts-grid">
  <div id="gender-binary-pie" 
    class="apexchart"
    style="height: 325px;"
    data-chart="pie"
    data-datakey="gender_binary"
    >
  </div>
  <div id="gender-all-pie" 
    class="apexchart"
    style="height: 325px;"
    data-chart="pie"
    data-datakey="gender_all"
    >
  </div>
</div>

### Age

Just like last time, trans men are younger. Theres also fewer older men with kinda a sharp-ish dropoff after 27, while with women its quite a bit more gradual.

<p style="font-size: 12px; color: #888">You can switch between the population pyramid and box plot with the tabs underneath the chart!</p>

<div class="chart-set">
  <input id="age-a" class="vh" type="radio" name="view-age" checked>
  <input id="age-b" class="vh" type="radio" name="view-age">
  
  <div class="chart-stack">
    <div id="age-pop-pyramid" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="pop-pyramid"
      data-datakey="age_capped_pop_pyramid"
      data-title="Age"
      data-subtitle="Population Pyramid"
      data-bounds="18"
      >
    </div>
    <div id="age-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="boxplot"
      data-datakey="age_boxplot"
      data-subtitle="Box Plot"
      data-title="Age"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="age-a" class="noselect">Population Pyramid</label>
    <label for="age-b" class="noselect">Box Plot</label>
  </div>
</div>

This time for the adult graph I also included a section for those in between 18 and 20, since 21 is kinda "adult 2" especially in the US. Only 36% of
men are legally able to drink in the US, compared to 62% of women. Obviously the number of men who are under 18 is also insane, but we went over that
last time.

<div id="adults-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="adults"
  data-title="Adulthood"
  data-colors='["#7B61FF", "#03a9f4", "#00E0B8"]'
  >
</div>

### Unit System

Thought that this would be kinda interesting since on the subreddits most people use inches/feet/pounds. I guess its not a surprise that on the survey
most people used the imperial system.

If you're wondering where Height and Weight are, I made a dedicated measurements page (the next page) for it. (It has calculators and charts and stuff).

<div id="unit-system-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="unit_systems"
  data-title="Unit System"
  data-colors='["#7B61FF", "#00E0B8"]'
  >
</div>

### Ethnicity

No surprise that everyone is white.

<div class="chart-set">
  <input id="ethnicity-a" class="vh" type="radio" name="view-ethnicity" checked>
  <input id="ethnicity-b" class="vh" type="radio" name="view-ethnicity">
  
  <div class="chart-stack" style="min-height: 450px;">
    <div id="ethnicity-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 450px;"
      data-chart="bar"
      data-datakey="ethnicity_flipped"
      data-title="Ethnicity"
      data-subtitle="Bar"
      >
    </div>
    <div id="ethnicity-ratio" 
      class="apexchart chart-layer layer-b"
      style="height: 450px;"
      data-chart="ratio-bar"
      data-datakey="ethnicity"
      data-title="Ethnicity"
      data-subtitle="Ratio Bar"
      data-colors='["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#3c57f1"]'
      >
    </div>
  </div>
  <div class="toggle">
    <label for="ethnicity-a" class="noselect">Bar</label>
    <label for="ethnicity-b" class="noselect">Ratio</label>
  </div>
</div>

Here is the chart for just the US.

<p style="font-size: 12px; color: #888; margin-top: -12px;">Added 7/29/2026 by request</p>

<div class="chart-set">
  <input id="ethnicity-us-a" class="vh" type="radio" name="view-ethnicity-us" checked>
  <input id="ethnicity-us-b" class="vh" type="radio" name="view-ethnicity-us">
  
  <div class="chart-stack" style="min-height: 450px;">
    <div id="ethnicity-us-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 450px;"
      data-chart="bar"
      data-datakey="ethnicity_us_flipped"
      data-title="Ethnicity (US)"
      data-subtitle="Bar"
      >
    </div>
    <div id="ethnicity-us-ratio" 
      class="apexchart chart-layer layer-b"
      style="height: 450px;"
      data-chart="ratio-bar"
      data-datakey="ethnicity_us"
      data-title="Ethnicity (US)"
      data-subtitle="Ratio Bar"
      data-colors='["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#3c57f1"]'
      >
    </div>
  </div>
  <div class="toggle">
    <label for="ethnicity-us-a" class="noselect">Bar</label>
    <label for="ethnicity-us-b" class="noselect">Ratio</label>
  </div>
</div>

### Sex At Birth

<h4>Cis People</h4>

We can use sex at birth to separate cis people. I didn't include cis man and cis woman as options due to in the first survey a lot of
passoids and self haters picked cis options instead of the proper trans options. Its fine to do that literally anywhere else but cis responses are
generally ignored on here, so you're basically just spending 10 minutes filling out a survey for no reason. If you're a cis lurker or something then
the cis option was meant for you. If you are a cis lurker feel free to dm me on reddit or twitter, I am always interested in hearing from cis lurkers
about why they lurk.

<div id="cisgender-pie" 
  class="apexchart"
  style="height: 325px;"
  data-chart="pie"
  data-datakey="cis_genders"
  data-title="Cisgender Genders"
  >
</div>

<h4>Nonbinary People</h4>

We can also use sex at birth to separate nonbinary people (controversial).

<div id="nb-asab-pie" 
  class="apexchart"
  style="height: 325px;"
  data-chart="pie"
  data-datakey="nb_sab"
  data-title="Nonbinary Sex At Birth"
  >
</div>

___
<div class="button-container">
  <a class="big-button" href="measurements">Next Page</a>
</div>