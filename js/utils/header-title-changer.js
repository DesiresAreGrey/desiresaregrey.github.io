"use strict";
let newTitle = document.currentScript?.dataset.title;
const newMobileTitle = document.currentScript?.dataset.mobileTitle;
if (newMobileTitle && window.innerWidth < 600)
    newTitle = newMobileTitle;
if (newTitle) {
    const headerTitleSpan = document.querySelector('.md-header__inner.md-grid .md-header__title .md-header__topic[data-md-component="header-topic"] > span');
    if (headerTitleSpan)
        headerTitleSpan.textContent = newTitle;
}
//# sourceMappingURL=header-title-changer.js.map