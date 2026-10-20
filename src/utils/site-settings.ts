import { Popup } from "../ui/popup.js";

const settingsButton = $id('settings-button');
if (settingsButton) {
    settingsButton.addEventListener('click', openSettingsPopup);
    settingsButton.style.visibility = 'visible';
}

type Settings = {
    [key: string]: {
        [key: string]: {
            value: any;
            name: string;
            info?: string;
            type: string;
        }
    }
}

export function getSettings() {
    const settings = {
        ApexCharts: {
            CanvasRendering: {value: false, name: "Canvas Rendering", info: "Use canvas rendering for ApexCharts instead of SVG, improving performance.\nAffects: Bar Charts, Population Pyramids, Scatter Plots, and Heatmaps\n\nRequires reloading the page", type: "toggle"},
            ChartAnimations: {value: true, name: "Chart Animations", info: "Use chart animations for ApexCharts.\nTurn off to improve performance\n\nRequires reloading the page", type: "toggle"}
        }
    } as Settings;

    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
        console.log(savedSettings);
        const saved = JSON.parse(savedSettings);
        for (const group of Object.keys(settings)) {
            for (const key of Object.keys(settings[group])) {
                const value = saved?.[group]?.[key];
                if (typeof value === typeof settings[group][key].value)
                    settings[group][key].value = value;
            }
        }
    }
    return settings;
}
export function saveSettings(settings: Settings) {
    const json = JSON.stringify(settings, (key, value) => {
        if (value && typeof value === "object" && "value" in value)
            return value.value;
        return value;
    });
    console.log(json);
    localStorage.setItem("settings", json);
}

export async function openSettingsPopup() {
    const settingTypes = $('script[data-setting-types]')?.dataset.settingTypes?.split(",").map(s => s.trim()) ?? ["all"];
    const settings = getSettings();
    const visibleSettings = settingTypes.includes("all") ? settings : Object.fromEntries(
        Object.entries(settings).filter(([group, values]) => settingTypes.includes(group))
    );

    const popup = await Popup.show( /* html */ `
        <!-- <div class="title" style="text-align: center;">Settings</div> -->
        ${
            Object.keys(visibleSettings).map(group => /* html */ `
                <div class="title" style="text-align: center;">${group}</div>
                <setting-group>
                    ${
                        Object.entries(settings[group]).map(([key, value]) => /* html */ `
                            <setting-item 
                                id="setting-${key}"
                                type="${value.type}"
                                name="${value.name}"
                                ${value.info ? `tooltip="${value.info}"` : ''}
                                default="${JSON.stringify(value.value)}">
                            </setting-item>
                        `).join('')
                    }
                </setting-group>
            `).join('<br>')
        }
    `, undefined, "640px");
    for (const group of Object.keys(visibleSettings)) {
        for (const key of Object.keys(settings[group])) {
            const settingItem = document.getElementById('setting-' + key) as SimpleSettingItem;
            settingItem.input.addEventListener('change', () => {
                settings[group][key].value = settingItem.value;
                saveSettings(settings);
            });
        }
    }
    return popup;
}