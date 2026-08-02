
// overview nav item
$$(".md-sidebar--primary .md-nav__list > .md-nav__item:first-child").forEach(item => {
    if (item.$(":scope > .md-nav__link .md-ellipsis")?.textContent.trim() === "Overview")
    item.classList.add("nav-overview");
});