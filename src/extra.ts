import { Utils } from "./utils/utils.js";

// overview nav item
$$(".md-sidebar--primary .md-nav__list > .md-nav__item:first-child").forEach(item => {
    if (item.$(":scope > .md-nav__link .md-ellipsis")?.textContent.trim() === "Overview")
    item.classList.add("nav-overview");
});

// fix search
const searchDiv = $('script[src*="/assets/javascripts/bundle"] + div[style*="position: fixed"][style*="height: 100%"][style*="top: 0px"]');
if (matchMedia('(max-width: 768px)').matches && searchDiv && searchDiv.shadowRoot) {
    const container = await searchDiv.shadowRoot.waitForSelector('div', 5000) as HTMLElement;
    const p = container.firstElementChild as HTMLElement;
    const input = container.querySelector('input[role="combobox"]') as HTMLInputElement;

    new MutationObserver(() => {
        if (p.classList.length > 1) {
            container.style.height = '100%';
            searchDiv.style.display = 'none';
        }
        else {
            container.style.height = 'calc(100% + 48px)';
            searchDiv.style.display = '';
            
            input.focus({ preventScroll: true });
        }
    }).observe(p, { attributes: true, attributeFilter: ['class'] });
}