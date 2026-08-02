---
title: "Extended 4tran Survey (2025.2) Results: Sexuality"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb-sexuality.png
tags:
  - survey
---
<script src="/js/utils/header-title-changer.js" data-title="Page 5 - Sexuality"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">

<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 5 - Sexuality</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

## Sexuality

### Label

<div id="label-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="sexuality_label"
  data-title="Sexuality Label"
  data-colors='["#8AA0B3", "#8E5CF1", "#FF4D88", "#2E294E"]'
  >
</div>

### Current Attraction

Since sexuality labels can be confusing and imprecise, I added a section to rate from 0 to 10 your attraction towards men and/or women.

It's interesting how straight men are more likely to put values around 0 and 10, while with women its a bit more spread out. Women are less straight
than men...many such cases...

With bisexuality, men are perfectly even between being into men and women, while with women, they're a but more into women than men.

With gays/lesbians its pretty even between the men and the women they're in to (obviously flipped).

With asexuals, its interesting how both genders (especially the women) are a bit more into women than they are into men.

<div class="chart-set">
  <input id="attrcurrftm-a" class="vh" type="radio" name="view-attrcurrftm" checked>
  <input id="attrcurrftm-b" class="vh" type="radio" name="view-attrcurrftm">
  <input id="attrcurrftm-c" class="vh" type="radio" name="view-attrcurrftm">
  <input id="attrcurrftm-d" class="vh" type="radio" name="view-attrcurrftm">
  
  <div class="chart-stack" style="min-height: 200px;">
    <div id="attraction-current-ftm-straight-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_ftm_straight_boxplot"
      data-title="Current Attraction"
      data-subtitle="Straight (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
    <div id="attraction-current-ftm-bisexual-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_ftm_bisexual_boxplot"
      data-title="Current Attraction"
      data-subtitle="Bisexual (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
    <div id="attraction-current-ftm-gay-boxplot" 
      class="apexchart chart-layer layer-c"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_ftm_gay_boxplot"
      data-title="Current Attraction"
      data-subtitle="Gay (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
    <div id="attraction-current-ftm-asexual-boxplot" 
      class="apexchart chart-layer layer-d"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_ftm_asexual_boxplot"
      data-title="Current Attraction"
      data-subtitle="Asexual (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="attrcurrftm-a" class="noselect">Straight</label>
    <label for="attrcurrftm-b" class="noselect">Bisexual</label>
    <label for="attrcurrftm-c" class="noselect">Gay</label>
    <label for="attrcurrftm-d" class="noselect">Asexual</label>
  </div>
</div>

<div class="chart-set">
  <input id="attrcurrmtf-a" class="vh" type="radio" name="view-attrcurrmtf" checked>
  <input id="attrcurrmtf-b" class="vh" type="radio" name="view-attrcurrmtf">
  <input id="attrcurrmtf-c" class="vh" type="radio" name="view-attrcurrmtf">
  <input id="attrcurrmtf-d" class="vh" type="radio" name="view-attrcurrmtf">
  
  <div class="chart-stack" style="min-height: 200px;">
    <div id="attraction-current-mtf-straight-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_mtf_straight_boxplot"
      data-title="Current Attraction"
      data-subtitle="Straight (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
    <div id="attraction-current-mtf-bisexual-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_mtf_bisexual_boxplot"
      data-title="Current Attraction"
      data-subtitle="Bisexual (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
    <div id="attraction-current-mtf-lesbian-boxplot"
      class="apexchart chart-layer layer-c"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_mtf_lesbian_boxplot"
      data-title="Current Attraction"
      data-subtitle="Lesbian (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
    <div id="attraction-current-mtf-asexual-boxplot" 
      class="apexchart chart-layer layer-d"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_current_mtf_asexual_boxplot"
      data-title="Current Attraction"
      data-subtitle="Asexual (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="attrcurrmtf-a" class="noselect">Straight</label>
    <label for="attrcurrmtf-b" class="noselect">Bisexual</label>
    <label for="attrcurrmtf-c" class="noselect">Lesbian</label>
    <label for="attrcurrmtf-d" class="noselect">Asexual</label>
  </div>
</div>

### Pretransition Attraction

Interestingly, the distributions for pretransition attraction are pretty similar to current attraction.

You would expect bi people to be into the "expected" gender they are supposed to be into pretransition, but that only seems to apply to the women
(raised male and therefore expected to be into women). The bi men on the other hand were also more into women than men pretransition (raised female and
therefore expected to be into men). Not sure why thats the case since I'm a straight woman but maybe someone could explain it a bit better.

<div class="chart-set">
  <input id="attrpretransftm-a" class="vh" type="radio" name="view-attrpretransftm" checked>
  <input id="attrpretransftm-b" class="vh" type="radio" name="view-attrpretransftm">
  <input id="attrpretransftm-c" class="vh" type="radio" name="view-attrpretransftm">
  <input id="attrpretransftm-d" class="vh" type="radio" name="view-attrpretransftm">
  
  <div class="chart-stack" style="min-height: 200px;">
    <div id="attraction-pretrans-ftm-straight-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_ftm_straight_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Straight (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
    <div id="attraction-pretrans-ftm-bisexual-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_ftm_bisexual_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Bisexual (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
    <div id="attraction-pretrans-ftm-gay-boxplot"
      class="apexchart chart-layer layer-c"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_ftm_gay_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Gay (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
    <div id="attraction-pretrans-ftm-asexual-boxplot" 
      class="apexchart chart-layer layer-d"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_ftm_asexual_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Asexual (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="attrpretransftm-a" class="noselect">Straight</label>
    <label for="attrpretransftm-b" class="noselect">Bisexual</label>
    <label for="attrpretransftm-c" class="noselect">Gay</label>
    <label for="attrpretransftm-d" class="noselect">Asexual</label>
  </div>
</div>

<div class="chart-set">
  <input id="attrpretransmtf-a" class="vh" type="radio" name="view-attrpretransmtf" checked>
  <input id="attrpretransmtf-b" class="vh" type="radio" name="view-attrpretransmtf">
  <input id="attrpretransmtf-c" class="vh" type="radio" name="view-attrpretransmtf">
  <input id="attrpretransmtf-d" class="vh" type="radio" name="view-attrpretransmtf">

  <div class="chart-stack" style="min-height: 200px;">
    <div id="attraction-pretrans-mtf-straight-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_mtf_straight_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Straight (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
    <div id="attraction-pretrans-mtf-bisexual-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_mtf_bisexual_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Bisexual (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
    <div id="attraction-pretrans-mtf-lesbian-boxplot"
      class="apexchart chart-layer layer-c"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_mtf_lesbian_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Lesbian (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
    <div id="attraction-pretrans-mtf-asexual-boxplot" 
      class="apexchart chart-layer layer-d"
      style="height: 200px;"
      data-chart="boxplot"
      data-datakey="attraction_pretrans_mtf_asexual_boxplot"
      data-title="Pretransition Attraction"
      data-subtitle="Asexual (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="attrpretransmtf-a" class="noselect">Straight</label>
    <label for="attrpretransmtf-b" class="noselect">Bisexual</label>
    <label for="attrpretransmtf-c" class="noselect">Lesbian</label>
    <label for="attrpretransmtf-d" class="noselect">Asexual</label>
  </div>
</div>

### Attraction Change

Change boxplots are pretty interesting to me, we take the difference between current attraction and pretransition attraction of each respondent and
then make a boxplot out of those differences.

Straights had inverses of each other (as expected). Bi people is a bit different though, men generally increased their attraction equally towards men
and women. Women, on the other hand, increased their attraction more towards men but actually lost some attraction towards women. Gays/lesbians are
also interesting as its a general inverse of each other (like with straights), but men gained significantly more attraction towards other men than
women did towards other women.

Asexual people didnt really change much and are mostly full of outliers, not sure why. Maybe small sample size? idk.

<div class="chart-set">
  <input id="attrchangeftm-a" class="vh" type="radio" name="view-attrchangeftm" checked>
  <input id="attrchangeftm-b" class="vh" type="radio" name="view-attrchangeftm">
  <input id="attrchangeftm-c" class="vh" type="radio" name="view-attrchangeftm">
  <input id="attrchangeftm-d" class="vh" type="radio" name="view-attrchangeftm">

  <div class="chart-stack" style="min-height: 200px;">
    <div id="attraction-change-ftm-straight-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_ftm_straight_boxplot"
      data-title="Attraction Change"
      data-subtitle="Straight (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      data-bounds="10"
      >
    </div>
    <div id="attraction-change-ftm-bisexual-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_ftm_bisexual_boxplot"
      data-title="Attraction Change"
      data-subtitle="Bisexual (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      data-bounds="10"
      >
    </div>
    <div id="attraction-change-ftm-gay-boxplot"
      class="apexchart chart-layer layer-c"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_ftm_gay_boxplot"
      data-title="Attraction Change"
      data-subtitle="Gay (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      data-bounds="10"
      >
    </div>
    <div id="attraction-change-ftm-asexual-boxplot" 
      class="apexchart chart-layer layer-d"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_ftm_asexual_boxplot"
      data-title="Attraction Change"
      data-subtitle="Asexual (FtM)"
      data-upper-color="#50b3ff"
      data-lower-color="#259efa"
      data-bounds="10"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="attrchangeftm-a" class="noselect">Straight</label>
    <label for="attrchangeftm-b" class="noselect">Bisexual</label>
    <label for="attrchangeftm-c" class="noselect">Gay</label>
    <label for="attrchangeftm-d" class="noselect">Asexual</label>
  </div>
</div>

<div class="chart-set">
  <input id="attrchangemtf-a" class="vh" type="radio" name="view-attrchangemtf" checked>
  <input id="attrchangemtf-b" class="vh" type="radio" name="view-attrchangemtf">
  <input id="attrchangemtf-c" class="vh" type="radio" name="view-attrchangemtf">
  <input id="attrchangemtf-d" class="vh" type="radio" name="view-attrchangemtf">

  <div class="chart-stack" style="min-height: 200px;">
    <div id="attraction-change-mtf-straight-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_mtf_straight_boxplot"
      data-title="Attraction Change"
      data-subtitle="Straight (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      data-bounds="10"
      >
    </div>
    <div id="attraction-change-mtf-bisexual-boxplot" 
      class="apexchart chart-layer layer-b"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_mtf_bisexual_boxplot"
      data-title="Attraction Change"
      data-subtitle="Bisexual (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      data-bounds="10"
      >
    </div>
    <div id="attraction-change-mtf-lesbian-boxplot"
      class="apexchart chart-layer layer-c"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_mtf_lesbian_boxplot"
      data-title="Attraction Change"
      data-subtitle="Lesbian (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      data-bounds="10"
      >
    </div>
    <div id="attraction-change-mtf-asexual-boxplot" 
      class="apexchart chart-layer layer-d"
      style="height: 200px;"
      data-chart="change-boxplot"
      data-datakey="attraction_change_mtf_asexual_boxplot"
      data-title="Attraction Change"
      data-subtitle="Asexual (MtF)"
      data-upper-color="#ff8295"
      data-lower-color="#ff4f69"
      data-bounds="10"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="attrchangemtf-a" class="noselect">Straight</label>
    <label for="attrchangemtf-b" class="noselect">Bisexual</label>
    <label for="attrchangemtf-c" class="noselect">Lesbian</label>
    <label for="attrchangemtf-d" class="noselect">Asexual</label>
  </div>
</div>

___

<div class="button-container">
  <a class="big-button" href="../transition">Previous Page</a>
  <a class="big-button" href="../relationships">Next Page</a>
</div>