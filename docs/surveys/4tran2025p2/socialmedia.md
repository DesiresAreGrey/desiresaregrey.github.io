---
title: "Extended 4tran Survey (2025.2) Results: Social Media"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb-socialmedia.png
---
<script src="/js/utils/header-title-changer.js" data-title="Page 3 - Social Media"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">

<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 3 - Social Media</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

## Social Media

### 4tran

What about r/Tranistan and r/4trancirclejerk makes them so popular among men? Its interesting to see how ttttrans (a private subreddit) is more
popular than 4Tranistan (a public subreddit).

<div class="chart-set">
  <input id="favsub-a" class="vh" type="radio" name="view-favsub" checked>
  <input id="favsub-b" class="vh" type="radio" name="view-favsub">
  
  <div class="chart-stack">
    <div id="favorite-subreddit-ratio" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="ratio-bar"
      data-datakey="favorite_subreddit"
      data-title="Favorite Subreddit"
      data-subtitle="Ratio"
      >
    </div>
    <div id="favorite-subreddit-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="favorite_subreddit"
      data-title="Favorite Subreddit"
      data-subtitle="Bar"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="favsub-a" class="noselect">Ratio</label>
    <label for="favsub-b" class="noselect">Bar</label>
  </div>
</div>

I dont think you guys know how to count...

<div id="years-on-4t-boxplot" 
  class="apexchart"
  style="height: 300px;"
  data-chart="boxplot"
  data-datakey="years_on_4tran_boxplot"
  data-subtitle="Box Plot"
  data-title="Years on 4tran"
  >
</div>

Microcelebs are rare, especially among men where there are no current microcelebs at all.

<div id="microceleb-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="microceleb"
  data-title="Microceleb Status"
  data-colors='["#FF9800", "#00E0B8", "#7B61FF", "#3c57f1"]'
  >
</div>

### 4Chan

There are more 4chan users than I thought, though maybe "occasionally" is too broad of a category.

<div id="usage-4chan-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="usage_4chan"
  data-title="4Chan Usage"
  data-colors='["#FF9800", "#00E0B8", "#7B61FF", "#3c57f1"]'
  >
</div>

If you selected Frequently/Occasionally, then you were asked when was the last time you visited 4chan was. Pretty expected that women tend to use
4chan the most.

<div id="last-visit-4chan-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="last_visit_4chan"
  data-title="Last Time Visiting 4Chan"
  data-colors='["#FF9800", "#00E0B8", "#3c57f1", "#7B61FF", "#A300D6"]'
  >
</div>

This one is slightly less messed up than the time using 4tran one. Did people think I was asking months instead of years?

<div id="years-on-4c-boxplot" 
  class="apexchart"
  style="height: 300px;"
  data-chart="boxplot"
  data-datakey="years_on_4chan_boxplot"
  data-subtitle="Box Plot"
  data-title="Years on 4Chan"
  >
</div>

### Came From

If you noticed the little `?source=r/4tran4` thing at the end of the survey link, this is what that was used for. I was curious where people found out
about the survey. I made it a bit more granular than last time and added different sources for different discord servers.

<div class="chart-set">
  <input id="camefrom-a" class="vh" type="radio" name="view-camefrom" checked>
  <input id="camefrom-b" class="vh" type="radio" name="view-camefrom">
  
  <div class="chart-stack">
    <div id="camefrom-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="came_from"
      data-title="Came From"
      data-subtitle="Bar"
      >
    </div>
    <div id="camefrom-ratio" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="ratio-bar"
      data-datakey="came_from"
      data-title="Came From"
      data-subtitle="Ratio"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="camefrom-a" class="noselect">Ratio</label>
    <label for="camefrom-b" class="noselect">Bar</label>
  </div>
</div>

___

<div class="button-container">
  <a class="big-button" href="../measurements">Previous Page</a>
  <a class="big-button" href="../transition">Next Page</a>
</div>