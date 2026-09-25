
// overview nav item
$$(".md-sidebar--primary .md-nav__list > .md-nav__item:first-child").forEach(item => {
    if (item.$(":scope > .md-nav__link .md-ellipsis")?.textContent.trim() === "Overview")
    item.classList.add("nav-overview");
});

// fix search
const searchDiv = $('script[src*="/assets/javascripts/bundle"] + div[style*="position: fixed"][style*="height: 100%"][style*="top: 0px"]');
if (matchMedia('(max-width: 768px)').matches && searchDiv && searchDiv.shadowRoot) {
    const a = searchDiv.shadowRoot.querySelector('.a') as HTMLElement;
    const p = a.querySelector('.p') as HTMLElement;
    const input = a.querySelector('input[role="combobox"]') as HTMLInputElement;

    new MutationObserver(() => {
        if (p.classList.contains('v')) {
            a.style.height = '100%';
            searchDiv.style.display = 'none';
        }
        else {
            a.style.height = 'calc(100% + 48px)';
            searchDiv.style.display = '';
            
            input.focus({ preventScroll: true });
        }
    }).observe(p, { attributes: true, attributeFilter: ['class'] });
}