import { TimeSpan } from "../utils/timespan.js";
import "../utils/utils.js";
export class LoadingBar {
    static instance = null;
    static get isActive() {
        return this.instance?.element?.style.opacity === '1';
    }
    ;
    element;
    _progress = 0;
    get progress() {
        return this._progress;
    }
    ;
    lastUpdateTime = performance.now();
    startTime = performance.now();
    animation = null;
    animationTime = 100;
    constructor() {
        document.getElementById('loading-bar')?.remove();
        const header = document.querySelector('header');
        this.element = document.createElement('div');
        this.element.id = 'loading-bar';
        this.element.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            opacity: 0;
            height: 2px;
            z-index: 9999;
            pointer-events: none;

            background-color: var(--md-primary-fg-color);
            box-shadow: 0 0 8px var(--md-primary-glow-color);

            transition: width 250ms ease-out;
        `;
        if (!header || header.offsetHeight < 5) {
            this.element.style.top = '0';
            document.body?.prepend(this.element);
        }
        else {
            header.appendChild(this.element);
        }
    }
    static start() {
        this.instance ??= new LoadingBar();
        const bar = this.instance;
        bar.element.style.transition = 'opacity 250ms ease';
        bar.element.style.opacity = '0';
        bar.element.style.width = '5%';
        bar.animation?.cancel();
        bar.animation = null;
        void bar.element.offsetWidth;
        bar.element.style.opacity = '1';
        bar.element.style.transition = 'width 500ms ease-out, opacity 250ms ease';
        bar._progress = 0;
        bar.lastUpdateTime = performance.now();
    }
    static startTrickle(animationTime = 100) {
        this.instance ??= new LoadingBar();
        const bar = this.instance;
        bar.animationTime = animationTime;
        bar.element.style.transition = 'opacity 250ms ease';
        bar.element.style.opacity = '0';
        bar.element.style.width = '5%';
        bar.animation?.cancel();
        bar.animation = bar.element.animate([{ width: '0%' }, { width: '5%' }], { duration: animationTime * 5, fill: 'forwards' });
        void bar.element.offsetWidth;
        bar.element.style.opacity = '1';
        bar.element.style.transition = 'width 500ms ease-out, opacity 250ms ease';
        bar._progress = 0;
        bar.lastUpdateTime = performance.now();
    }
    static startFullTrickle(trickleDuration = TimeSpan.fromSeconds(10)) {
        this.startTrickle();
        const bar = this.instance;
        if (!bar)
            return;
        void bar.element.offsetWidth;
        bar.animation?.cancel();
        bar.animation = bar.element.animate([{ width: `5%` }, { width: `95%` }], { duration: trickleDuration instanceof TimeSpan ? trickleDuration.ms : trickleDuration * 1000, fill: 'forwards' });
    }
    static update(progress, trickleTo) {
        if (progress === 0)
            this.start();
        const bar = this.instance;
        if (!bar)
            return;
        if (bar.animation && trickleTo) {
            const newWidth = (progress * 90 + 5).roundTo(0).clamp(0, 100);
            const nextWidth = (trickleTo * 90 + 5).roundTo(0).clamp(0, 100);
            const tickSize = nextWidth - newWidth;
            const trickleDuration = bar.animationTime * tickSize;
            bar._progress = progress.clamp();
            bar.animation?.cancel();
            bar.animation = bar.element.animate([{ width: `${newWidth}%` }, { width: `${nextWidth}%` }], { duration: trickleDuration, fill: 'forwards' });
        }
        else {
            bar._progress = progress.clamp();
            bar.element.style.width = `${progress * 90 + 5}%`;
        }
        if (progress >= 1)
            this.finish();
    }
    static async updateAsync(progress, nextProgress, minUpdateInterval = 750) {
        const bar = this.instance;
        if (!bar || performance.now() - bar.lastUpdateTime < minUpdateInterval)
            return;
        this.update(progress, nextProgress);
        await new Promise(resolve => requestAnimationFrame(resolve));
        bar.lastUpdateTime = performance.now();
    }
    static finish() {
        const bar = this.instance;
        if (!bar)
            return;
        if (bar.animation) {
            const currentWidth = `${bar.element.getBoundingClientRect().width}px`;
            bar.animation.cancel();
            bar.animation = bar.element.animate([{ width: currentWidth }, { width: "100%" }], { duration: 200, fill: 'forwards' });
        }
        else {
            bar.element.style.transition = 'width 500ms ease-out, opacity 500ms ease';
            void bar.element.offsetWidth;
        }
        bar._progress = 1;
        bar.element.style.width = `100%`;
        setTimeout(() => bar.element.style.setProperty('opacity', '0'), 250);
    }
    static get startTime() {
        return this.instance?.startTime ?? null;
    }
    static get elapsedTime() {
        return this.instance ? performance.now() - this.instance.startTime : null;
    }
}
//# sourceMappingURL=loadingbar.js.map