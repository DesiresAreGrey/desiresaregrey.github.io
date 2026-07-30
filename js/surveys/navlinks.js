"use strict";
const firstPage = document.currentScript?.dataset.firstpage;
const navLinks = document.querySelector(".nav-links");
navLinks.style.minHeight = "3em";
fetch(document.currentScript?.dataset.toc ?? "").then(response => response.json()).then(data => {
    data.forEach((page, i) => {
        const link = page[0];
        const name = page[1];
        const a = document.createElement("a");
        const path = window.location.href.split("#")[0].split("?")[0];
        a.href = firstPage + link;
        a.textContent = name;
        if (path.endsWith(firstPage + link) || path.endsWith(firstPage + link + "/"))
            a.classList.add("active");
        navLinks.appendChild(a);
        if (i < data.length - 1)
            navLinks.appendChild(document.createTextNode(' - '));
    });
    navLinks.style.minHeight = "";
});
//# sourceMappingURL=navlinks.js.map