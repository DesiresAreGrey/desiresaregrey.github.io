---
title: "Extended 4tran Survey (2025.2) Results: Health"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb-health.png
tags:
  - survey
---
<script src="/js/utils/header-title-changer.js" data-title="Page 8 - Health"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">

<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 8 - Health</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

## Health

### Drugs

I guess it makes sense that men use drugs the most.

<div id="doesdrugs-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="does_recreational_drugs"
  data-title="Does Recreational Drugs"
  data-colors='["#7B61FF", "#00E0B8"]'
  >
</div>

Caffeine being the most popular drug isn't surprising. Whats interesting is that for men, nicotine is more popular than none, while for women, none is
more popular than nicotine. Do men smoke a lot?

<div class="chart-set">
  <input id="drugsused-a" class="vh" type="radio" name="view-drugsused" checked>
  <input id="drugsused-b" class="vh" type="radio" name="view-drugsused">
  <input id="drugsused-c" class="vh" type="radio" name="view-drugsused">
  
  <div class="chart-stack" style="min-height: 500px;">
    <div id="drugsused-ftm-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="recreational_drugs_ftm_flipped"
      data-title="Drugs Used"
      data-subtitle="FtM"
      >
    </div>
    <div id="drugsused-mtf-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="recreational_drugs_mtf_flipped"
      data-title="Drugs Used"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
    <div id="drugsused-total-bar" 
      class="apexchart chart-layer layer-c"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="recreational_drugs_flipped"
      data-title="Drugs Used"
      data-subtitle="Total"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="drugsused-a" class="noselect">FtM</label>
    <label for="drugsused-b" class="noselect">MtF</label>
    <label for="drugsused-c" class="noselect">Total</label>
  </div>
</div>

Here's a wordcloud of people who selected "Other" for drugs used and then inputted their own drug.

<div class="wordcloud" id="drugs-other-cloud" 
  style="height: 350px;"
  data-datakey="custom_drugs_wordcloud"
  data-min-size="20"
  data-max-size="80"
  data-padding="3"
  data-color="#a46fff"
  >
</div>

### STDs

STDs aren't very common thankfully...

<div id="hasstds-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="has_stds"
  data-title="Has STDs"
  data-colors='["#7B61FF", "#00E0B8"]'
  >
</div>

<div class="chart-set">
  <input id="stds-a" class="vh" type="radio" name="view-stds" checked>
  <input id="stds-b" class="vh" type="radio" name="view-stds">
  <input id="stds-c" class="vh" type="radio" name="view-stds">

  <div class="chart-stack" style="min-height: 400px;">
    <div id="stds-ftm-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 400px;"
      data-chart="bar"
      data-datakey="stds_ftm_flipped"
      data-title="STDs"
      data-subtitle="FtM"
      >
    </div>
    <div id="stds-mtf-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 400px;"
      data-chart="bar"
      data-datakey="stds_mtf_flipped"
      data-title="STDs"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
    <div id="stds-total-bar" 
      class="apexchart chart-layer layer-c"
      style="height: 400px;"
      data-chart="bar"
      data-datakey="stds_flipped"
      data-title="STDs"
      data-subtitle="Total"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="stds-a" class="noselect">FtM</label>
    <label for="stds-b" class="noselect">MtF</label>
    <label for="stds-c" class="noselect">Total</label>
  </div>
</div>

### Disorders

#### Officially Diagnosed

The normalized ratio is a ratio bar graph where the total of men vs women is normalized, which makes it easier to see which disorders are more common
among men vs women regardless of the sample size difference. There are also bar charts to show the actual counts for men and women separately.

Gender dysphoria is pretty much a 50/50 split between men and women, which makes sense. OCD, ARFID, and DID seem to be the most common among men
compared to women, while BPD, BDD, Anorexia, and Binge Eating Disorder seem to be the most common among women compared to men.


<div class="chart-set">
  <input id="disordersofficial-a" class="vh" type="radio" name="view-disordersofficial" checked>
  <input id="disordersofficial-b" class="vh" type="radio" name="view-disordersofficial">
  <input id="disordersofficial-c" class="vh" type="radio" name="view-disordersofficial">

  <div class="chart-stack" style="min-height: 500px;">
    <div id="disordersofficial-types-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="ratio-bar"
      data-datakey="disorders_officially_diagnosed_norm_flipped"
      data-title="Disorders Officially Diagnosed"
      data-subtitle="Normalized Ratio"
      data-normalized
      >
    </div>
    <div id="disordersofficial-ftm-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="disorders_officially_diagnosed_ftm_flipped"
      data-title="Disorders Officially Diagnosed"
      data-subtitle="FtM"
      >
    </div>
    <div id="disordersofficial-mtf-bar"
      class="apexchart chart-layer layer-c"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="disorders_officially_diagnosed_mtf_flipped"
      data-title="Disorders Officially Diagnosed"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
    
  </div>
  <div class="toggle">
    <label for="disordersofficial-a" class="noselect">Normalized Ratio</label>
    <label for="disordersofficial-b" class="noselect">FtM</label>
    <label for="disordersofficial-c" class="noselect">MtF</label>
  </div>
</div>

These are the custom answers that people typed in when they selected "Other" for disorders officially diagnosed. The bar chart only shows the ones
that have more than 1 person typing it in. I also combined custom answers that were the same, but spelled differently (C-PTSD includes people who
typed C-PTSD, CPTSD, cptsd, etc).

I guess a lot of people have PTSD.

<div class="chart-set">
  <input id="disordersofficialcustom-a" class="vh" type="radio" name="view-disordersofficialcustom" checked>
  <input id="disordersofficialcustom-b" class="vh" type="radio" name="view-disordersofficialcustom">

  <div class="chart-stack" style="min-height: 500px;">
    <div id="disorders-officially-diagnosed-custom-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 500px;"
      data-datakey="disorders_officially_diagnosed_custom_wordcloud"
      data-min-size="18"
      data-max-size="130"
      data-padding="3"
      data-color="#a46fff"
      >
    </div>
    <div id="disordersofficialcustom-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="disorders_officially_diagnosed_custom_flipped"
      data-title="Disorders Officially Diagnosed (Custom)"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="disordersofficialcustom-a" class="noselect">Word Cloud</label>
    <label for="disordersofficialcustom-b" class="noselect">Bar</label>
  </div>
</div>

#### Self Diagnosed

Seems pretty similar to the previous one.

<div class="chart-set">
  <input id="disordersselfdiagnosed-a" class="vh" type="radio" name="view-disordersselfdiagnosed" checked>
  <input id="disordersselfdiagnosed-b" class="vh" type="radio" name="view-disordersselfdiagnosed">
  <input id="disordersselfdiagnosed-c" class="vh" type="radio" name="view-disordersselfdiagnosed">

  <div class="chart-stack" style="min-height: 500px;">
    <div id="disordersselfdiagnosed-types-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 500px;"
      data-chart="ratio-bar"
      data-datakey="disorders_self_diagnosed_norm_flipped"
      data-title="Disorders Self Diagnosed"
      data-subtitle="Normalized Ratio"
      data-normalized
      >
    </div>
    <div id="disordersselfdiagnosed-ftm-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="disorders_self_diagnosed_ftm_flipped"
      data-title="Disorders Self Diagnosed"
      data-subtitle="FtM"
      >
    </div>
    <div id="disordersselfdiagnosed-mtf-bar"
      class="apexchart chart-layer layer-c"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="disorders_self_diagnosed_mtf_flipped"
      data-title="Disorders Self Diagnosed"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
    
  </div>
  <div class="toggle">
    <label for="disordersselfdiagnosed-a" class="noselect">Normalized Ratio</label>
    <label for="disordersselfdiagnosed-b" class="noselect">FtM</label>
    <label for="disordersselfdiagnosed-c" class="noselect">MtF</label>
  </div>
</div>

CPTSD at the top with AvPD at second. I wish I had included PTSD and CPTSD in the available options.

<div class="chart-set">
  <input id="disordersselfcustom-a" class="vh" type="radio" name="view-disordersselfcustom" checked>
  <input id="disordersselfcustom-b" class="vh" type="radio" name="view-disordersselfcustom">

  <div class="chart-stack" style="min-height: 500px;">
    <div id="disorders-self-diagnosed-custom-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 500px;"
      data-datakey="disorders_self_diagnosed_custom_wordcloud"
      data-min-size="16"
      data-max-size="130"
      data-padding="4"
      data-color="#a46fff"
      >
    </div>
    <div id="disordersselfcustom-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 500px;"
      data-chart="bar"
      data-datakey="disorders_self_diagnosed_custom_flipped"
      data-title="Disorders Self Diagnosed (Custom)"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="disordersselfcustom-a" class="noselect">Word Cloud</label>
    <label for="disordersselfcustom-b" class="noselect">Bar</label>
  </div>
</div>

### In Therapy

Men seem to currently be in therapy the least, but women are slightly more likely to have never been in therapy.

<div id="intherapy-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="in_therapy"
  data-title="In Therapy"
  data-colors='["#7B61FF", "#5642bd", "#2E294E"]'
  >
</div>

___

<div class="button-container">
  <a class="big-button" href="../heightpreferences">Previous Page</a>
  <a class="big-button" href="../selfdescribing">Next Page</a>
</div>