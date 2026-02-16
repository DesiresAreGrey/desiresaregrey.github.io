---
title: "Extended 4tran Survey (2025.2) Results: Self Describing"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb-selfdescribing.png
---
<script src="/js/utils/header-title-changer.js" data-title="Page 9 - Self Describing"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">

<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 9 - Self Describing</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

## Self Describing

This page goes over the question asking what terms respondents use to describe themselves which a given list of 50 terms. If you don't like /tttt/
terminology, feel free to skip this page.

### Genuine/Serious

This question asked what terms people used in a genuine/serious way to describe themselves.

#### Given Options

Unsurprisingly, Trans is the most common for both men and women, with FtM/Mtf being second. 

What is interesting however is transsexual and transgender being in 3rd then 4th respectively for men, but the reverse for women. The disparity in
counts between the two is also pretty interesting. With men, theres a large gap between transsexual and transgender, while for women the gap between
transgender and transsexual is pretty small.

Personally as a woman, I use Tomboymoder to describe myself (since people don't like when I say I'm a passoid boymoder), so it was interesting to see
here was in 12th place for men but only 30th place for women.

<div class="chart-set">
  <input id="describingserious-a" class="vh" type="radio" name="view-describingserious" checked>
  <input id="describingserious-b" class="vh" type="radio" name="view-describingserious">

  <div class="chart-stack" style="min-height: 800px;">
    <div id="describingserious-ftm-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 800px;"
      data-chart="bar"
      data-datakey="describing_terms_serious_ftm_flipped"
      data-title="Describing Terms - Serious"
      data-subtitle="FtM"
      >
    </div>
    <div id="describingserious-mtf-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 800px;"
      data-chart="bar"
      data-datakey="describing_terms_serious_mtf_flipped"
      data-title="Describing Terms - Serious"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
  </div>
  <div class="toggle">
    <label for="describingserious-a" class="noselect">FtM</label>
    <label for="describingserious-b" class="noselect">MtF</label>
  </div>
</div>

I *really* love how the word clouds turned out for this one. They aren't the best for cold hard data, but the visual representation is so good.

<div class="chart-set">
  <input id="describingseriouscloud-a" class="vh" type="radio" name="view-describingseriouscloud" checked>
  <input id="describingseriouscloud-b" class="vh" type="radio" name="view-describingseriouscloud">

  <div class="chart-stack" style="min-height: 550px;">
    <div id="describingserious-ftm-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 550px;"
      data-datakey="describing_terms_serious_ftm_wordcloud"
      data-min-size="12"
      data-max-size="75"
      data-padding="3"
      data-color="#259efa"
      >
    </div>
    <div id="describingserious-mtf-cloud" 
      class="wordcloud chart-layer layer-b"
      style="height: 550px;"
      data-datakey="describing_terms_serious_mtf_wordcloud"
      data-min-size="10"
      data-max-size="75"
      data-padding="3"
      data-color="#ff4f69"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="describingseriouscloud-a" class="noselect">FtM</label>
    <label for="describingseriouscloud-b" class="noselect">MtF</label>
  </div>
</div>

#### Custom

The "Other" option allowed for people to type in custom terms. The most common overall custom term was luckshit, by 1 man and 3 women.

<div class="chart-set">
  <input id="describingseriouscloudcustom-a" class="vh" type="radio" name="view-describingseriouscloudcustom" checked>
  <input id="describingseriouscloudcustom-b" class="vh" type="radio" name="view-describingseriouscloudcustom">
  <input id="describingseriouscloudcustom-c" class="vh" type="radio" name="view-describingseriouscloudcustom">

  <div class="chart-stack" style="min-height: 550px;">
    <div id="describing-terms-serious-custom-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 550px;"
      data-datakey="describing_terms_serious_custom_wordcloud"
      data-min-size="18"
      data-max-size="80"
      data-padding="2.5"
      data-color="#a46fff"
      data-scale-linear
      >
    </div>
    <div id="describing-terms-serious-ftm-custom-cloud" 
      class="wordcloud chart-layer layer-b"
      style="height: 550px;"
      data-datakey="describing_terms_serious_ftm_custom_wordcloud"
      data-min-size="28"
      data-max-size="80"
      data-padding="2.5"
      data-color="#259efa"
      data-scale-linear
      >
    </div>
    <div id="describing-terms-serious-mtf-custom-cloud" 
      class="wordcloud chart-layer layer-c"
      style="height: 550px;"
      data-datakey="describing_terms_serious_mtf_custom_wordcloud"
      data-min-size="18"
      data-max-size="80"
      data-padding="2.5"
      data-color="#ff4f69"
      data-scale-linear
      >
    </div>
  </div>
  <div class="toggle">
    <label for="describingseriouscloudcustom-a" class="noselect">Overall</label>
    <label for="describingseriouscloudcustom-b" class="noselect">FtM</label>
    <label for="describingseriouscloudcustom-c" class="noselect">MtF</label>
  </div>
</div>

### Ironic

This question asked what terms people used in a ironic way to describe themselves.

#### Given Options

The distribution for men is kinda interesting with how there are 2 drops, one from Pooner to Tranny, and another from Gigapoon to Theyfab. It's also
pretty interesting how Pooner is by far the most used ironic term, but I guess it makes sense.

The distribution for women doesn't have anything similar/as distinct as the 2 drops with men. Tranny being the first is pretty obvious, though I
didn't expect AGP to be second (same with AAP being third for men, right under Tranny). 

<div class="chart-set">
  <input id="describingironic-a" class="vh" type="radio" name="view-describingironic" checked>
  <input id="describingironic-b" class="vh" type="radio" name="view-describingironic">

  <div class="chart-stack" style="min-height: 800px;">
    <div id="describingironic-ftm-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 800px;"
      data-chart="bar"
      data-datakey="describing_terms_ironic_ftm_flipped"
      data-title="Describing Terms - Ironic"
      data-subtitle="FtM"
      >
    </div>
    <div id="describingironic-mtf-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 800px;"
      data-chart="bar"
      data-datakey="describing_terms_ironic_mtf_flipped"
      data-title="Describing Terms - Ironic"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
  </div>
  <div class="toggle">
    <label for="describingironic-a" class="noselect">FtM</label>
    <label for="describingironic-b" class="noselect">MtF</label>
  </div>
</div>

The word clouds for this one are also really good.

<div class="chart-set">
  <input id="describingironiccloud-a" class="vh" type="radio" name="view-describingironiccloud" checked>
  <input id="describingironiccloud-b" class="vh" type="radio" name="view-describingironiccloud">

  <div class="chart-stack" style="min-height: 550px;">
    <div id="describingironic-ftm-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 550px;"
      data-datakey="describing_terms_ironic_ftm_wordcloud"
      data-min-size="8"
      data-max-size="80"
      data-padding="3"
      data-color="#259efa"
      >
    </div>
    <div id="describingironic-mtf-cloud" 
      class="wordcloud chart-layer layer-b"
      style="height: 550px;"
      data-datakey="describing_terms_ironic_mtf_wordcloud"
      data-min-size="8"
      data-max-size="80"
      data-padding="3"
      data-color="#ff4f69"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="describingironiccloud-a" class="noselect">FtM</label>
    <label for="describingironiccloud-b" class="noselect">MtF</label>
  </div>
</div>

#### Custom

Not many people typed in custom terms for ironic use, but its interesting how Dood (3 men) was the most common overall word when including both
genders. I wish I added a dedicated option for typing in custom terms so that people would be more likely to type them out.

<div class="chart-set">
  <input id="describingironiccloudcustom-a" class="vh" type="radio" name="view-describingironiccloudcustom" checked>
  <input id="describingironiccloudcustom-b" class="vh" type="radio" name="view-describingironiccloudcustom">
  <input id="describingironiccloudcustom-c" class="vh" type="radio" name="view-describingironiccloudcustom">

  <div class="chart-stack" style="min-height: 550px;">
    <div id="describing-terms-ironic-custom-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 550px;"
      data-datakey="describing_terms_ironic_custom_wordcloud"
      data-min-size="18"
      data-max-size="80"
      data-padding="2.5"
      data-color="#a46fff"
      data-scale-linear
      >
    </div>
    <div id="describing-terms-ironic-ftm-custom-cloud" 
      class="wordcloud chart-layer layer-b"
      style="height: 550px;"
      data-datakey="describing_terms_ironic_ftm_custom_wordcloud"
      data-min-size="28"
      data-max-size="80"
      data-padding="2.5"
      data-color="#259efa"
      data-scale-linear
      >
    </div>
    <div id="describing-terms-ironic-mtf-custom-cloud" 
      class="wordcloud chart-layer layer-c"
      style="height: 550px;"
      data-datakey="describing_terms_ironic_mtf_custom_wordcloud"
      data-min-size="20"
      data-max-size="75"
      data-padding="2.5"
      data-color="#ff4f69"
      data-scale-linear
      >
    </div>
  </div>
  <div class="toggle">
    <label for="describingironiccloudcustom-a" class="noselect">Overall</label>
    <label for="describingironiccloudcustom-b" class="noselect">FtM</label>
    <label for="describingironiccloudcustom-c" class="noselect">MtF</label>
  </div>
</div>


___

<div class="button-container">
  <a class="big-button" href="../health">Previous Page</a>
  <a class="big-button" href="../misc">Next Page</a>
</div>