---
title: "Extended 4tran Survey (2025.2) Results: Miscellaneous"
description: The results page for the Extended 4tran Survey (2025.2), a follow up survey to the original 2025 4tran Survey
image: https://desiresaregrey.com/assets/surveys/4tran2025p2/thumb-misc.png
tags:
  - All Surveys
  - 4tran Survey [2025.2]
hide:
  - tags
---
<script src="/js/utils/header-title-changer.js" data-title="Page 10 - Miscellaneous"></script>

<link rel="stylesheet" href="/stylesheets/surveys/4tran2025p2.css">

<script type="module" src="/js/surveys/4tran2025p2/4tran2025p2.js"></script>

# Extended 4tran Survey (2025.2)
<h6 style="margin: 0 0.2rem">Page 10 - Miscellaneous</h6>

<div class="nav-links" style="margin: 0.25rem 1rem;"></div>
<script src="/js/surveys/navlinks.js" data-firstpage="/surveys/4tran2025p2/" data-toc="/assets/surveys/4tran2025p2/toc.json"></script>

## Miscellaneous

### Views On DIY

This question asked people how positively they viewed the concept of DIY HRT from 0 to 10, with 10 being the most positive and vice versa.

At first I thought this boxplot was broken for men and women, but it actually turns out so many men/women voted 10 that every answer other than 10 is counted as an
outlier. 1307/1675 (78%) of respondents voted 10.

I originally wrote that above line before I remembered to include the data for nonbinary people, where this isn't true. 9 is the minimum (excluding
outliers) value for nonbinary people, but the lowest outlier is 0 with 2 respondents picking it (men and women did not pick 0 at all).

<div class="chart-set">
  <input id="viewdiy-a" class="vh" type="radio" name="view-viewdiy" checked>
  <input id="viewdiy-b" class="vh" type="radio" name="view-viewdiy">

  <div class="chart-stack" style="min-height: 300px;">
    <div id="views-on-diy-boxplot" 
      class="apexchart chart-layer layer-a"
      style="height: 300px;"
      data-chart="boxplot"
      data-datakey="views_on_diy_boxplot"
      data-title="Views On DIY"
      data-subtitle="Boxplot"
      >
    </div>
    <div id="views-on-diy-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 300px;"
      data-chart="ratio-bar"
      data-datakey="views_on_diy"
      data-title="Views On DIY"
      data-subtitle="Ratio"
      data-colors='["#02000D","#080025","#13003F","#1F005B","#2C0079","#390099","#470BB6","#5328C8","#5F3DDA","#6D4FEC","#7B61FF"]'
      >
    </div>
  </div>
  <div class="toggle">
    <label for="viewdiy-a" class="noselect">Boxplot</label>
    <label for="viewdiy-b" class="noselect">Ratio</label>
  </div>
</div>

### NEET Status

Men are the least likely to be a NEET (Not in Education, Employment, or Training).

<div id="isneet-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="is_neet"
  data-title="Is NEET"
  data-colors='["#7B61FF", "#00E0B8"]'
  >
</div>

### Malebrained/Fembrained

Interestingly, men are the most likely to believe in the malebrained/fembrained concept. It does make sense that nonbinary people are the least likely
to believe in it, since the concept is more binary in nature.

<div id="xbrained-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="belief_in_xbrained"
  data-title="Believes in Malebrained/Fembrained"
  data-colors='["#7B61FF", "#5642bd", "#2E294E"]'
  >
</div>

### Conformity to Gender Roles

The data for this is a lot more interesting than I expected. 

Almost 50% of men conform to male gender roles, with less than 1% conforming to female gender roles. However, only 23% of women conform to female
gender roles, with about 5% conforming to male gender roles. This is a pretty big difference, and shows that men are much more likely to conform to
their actual gender roles than women. 

Nonbinary people generally conform to male gender roles significantly more than female, however most do not conform to either or are unsure.

Only 14% of men conform to no gender roles, while for women thats almost 31%. Women are also more likely to be unsure about their conformity to gender
roles where 42% are unsure compared to 36% of men.

<div id="conform-gender-roles-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="conform_gender_roles"
  data-title="Conforms to Gender Roles"
  data-colors='["#259efa", "#ff4f69", "#7B61FF", "#2E294E"]'
  >
</div>

### Connection to AGAB

Interestingly, this is the opposite of what you might expect if you are used to mainstream trans communities. Trans men are the least connected to
their AGAB, with trans women being a bit more connected, and nonbinary people being the most connected (relatively).

<div id="connection-to-agab-boxplot" 
  class="apexchart"
  style="height: 300px;"
  data-chart="boxplot"
  data-datakey="connection_to_agab_boxplot"
  data-title="Connection to AGAB"
  data-subtitle="Boxplot"
  >
</div>

### Feelings/Views

#### Feelings on Being Trans

Men are also the least likely to have positive feelings on being trans, with nonbinary people being the most likely to have positive feelings (still
mostly negative or negative though).

<div id="feelings-on-being-trans-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="feelings_on_being_trans"
  data-title="Feelings on Being Trans"
  data-colors='["#7B61FF", "#5642bd", "#2E294E"]'
  >
</div>

#### Views on the Trans Flag

The trans flag is generally liked rather than disliked, however men are by far the most neutral on it.

<div id="views-on-trans-flag-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="view_on_trans_flag"
  data-title="Views on the Trans Flag"
  data-colors='["#7B61FF", "#5642bd", "#2E294E"]'
  >
</div>

#### Views on the Trans Community

The common theme seems to be that men have the least connection with the idea of being trans and the things that are associated with it.

<div id="views-on-trans-community-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="view_on_trans_community"
  data-title="Views on the Trans Community"
  data-colors='["#7B61FF", "#5642bd", "#2E294E"]'
  >
</div>

### Tattoos and Piercings

Most people do not have tattoos/piercings, but men are more likely to have them than women or nonbinary people.

<div id="has-tattoos-piercings-ratio" 
  class="apexchart"
  style="height: 250px;"
  data-chart="ratio-bar"
  data-datakey="has_tattoos_piercings"
  data-title="Has Tattoos or Piercings"
  data-colors='["#7B61FF", "#00E0B8"]'
  >
</div>

When it comes to number of tattoos/piercings (of the people who do have them), men tend to have more than women.

<div id="tattoos-piercings-boxplot" 
  class="apexchart"
  style="height: 300px;"
  data-chart="boxplot"
  data-datakey="tattoos_piercings_boxplot"
  data-title="Number of Tattoos and Piercings"
  data-subtitle="Boxplot"
  >
</div>

### Aesthetic

Casual, Emo, and Sporty are the only aesthetics more common among men than with women. The rest are all more common among women, with Preppy and Goth
being the most skewed towards women.

Unsurprisingly, the most common aestheics among both men and women are casual and comfortable.

<div class="chart-set">
  <input id="aesthetic-a" class="vh" type="radio" name="view-aesthetic" checked>
  <input id="aesthetic-b" class="vh" type="radio" name="view-aesthetic">
  <input id="aesthetic-c" class="vh" type="radio" name="view-aesthetic">

  <div class="chart-stack" style="min-height: 400px;">
    <div id="aesthetic-bar" 
      class="apexchart chart-layer layer-a"
      style="height: 400px;"
      data-chart="ratio-bar"
      data-datakey="aesthetic_norm_flipped"
      data-title="Aesthetic"
      data-subtitle="Normalized Ratio"
      data-normalized
      >
    </div>
    <div id="aesthetic-ftm-bar" 
      class="apexchart chart-layer layer-b"
      style="height: 400px;"
      data-chart="bar"
      data-datakey="aesthetic_ftm_flipped"
      data-title="Aesthetic"
      data-subtitle="FtM"
      >
    </div>
    <div id="aesthetic-mtf-bar"
      class="apexchart chart-layer layer-c"
      style="height: 400px;"
      data-chart="bar"
      data-datakey="aesthetic_mtf_flipped"
      data-title="Aesthetic"
      data-subtitle="MtF"
      data-colors='["#ff4f69"]'
      >
    </div>
    
  </div>
  <div class="toggle">
    <label for="aesthetic-a" class="noselect">Normalized Ratio</label>
    <label for="aesthetic-b" class="noselect">FtM</label>
    <label for="aesthetic-c" class="noselect">MtF</label>
  </div>
</div>

This is the word cloud of custom aesthetics that people typed in when they selected "Other" for aesthetic preference. Am I insane if I think these
look beautiful?

<div class="chart-set">
  <input id="aesthetic-custom-a" class="vh" type="radio" name="view-aestheticcustom" checked>
  <input id="aesthetic-custom-b" class="vh" type="radio" name="view-aestheticcustom">
  <input id="aesthetic-custom-c" class="vh" type="radio" name="view-aestheticcustom">

  <div class="chart-stack" style="min-height: 550px;">
    <div id="aesthetic-custom-cloud" 
      class="wordcloud chart-layer layer-a"
      style="height: 550px;"
      data-datakey="aesthetic_custom_wordcloud"
      data-min-size="12"
      data-max-size="90"
      data-padding="2"
      data-color="#a46fff"
      >
    </div>
    <div id="aesthetic-ftm-custom-cloud" 
      class="wordcloud chart-layer layer-b"
      style="height: 550px;"
      data-datakey="aesthetic_ftm_custom_wordcloud"
      data-min-size="20"
      data-max-size="80"
      data-padding="3"
      data-color="#259efa"
      >
    </div>
    <div id="aesthetic-mtf-custom-cloud" 
      class="wordcloud chart-layer layer-c"
      style="height: 550px;"
      data-datakey="aesthetic_mtf_custom_wordcloud"
      data-min-size="15"
      data-max-size="96"
      data-padding="2.5"
      data-color="#ff4f69"
      >
    </div>
  </div>
  <div class="toggle">
    <label for="aesthetic-custom-a" class="noselect">Overall</label>
    <label for="aesthetic-custom-b" class="noselect">FtM</label>
    <label for="aesthetic-custom-c" class="noselect">MtF</label>
  </div>
</div>

___

<div class="button-container">
  <a class="big-button" href="../selfdescribing">Previous Page</a>
  <a class="big-button" href="../nsfw">Next Page</a>
</div>