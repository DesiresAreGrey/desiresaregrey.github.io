import { Popup } from "../ui/popup.js";

const settingsButton = $id('settings-button');
if (settingsButton) {
    settingsButton.addEventListener('click', openSettingsPopup);
    settingsButton.style.visibility = 'visible';
}

type Settings = {
    [key: string]: {
        name: string;
        settings: {
            [key: string]: {
                value: any;
                name: string;
                info?: string;
                type: string;
            }
        }
    }
}

export function getSettings() {
    const settings = {
        apexCharts: {
            name: "ApexCharts",
            settings: {
                canvasRendering: {value: window.innerWidth < 768, name: "Canvas Rendering", info: "Use canvas rendering for ApexCharts instead of SVG, improving performance.\nAffects all charts except for pie charts.\n\nRequires reloading the page", type: "toggle"},
                chartAnimations: {value: true, name: "Chart Animations", info: "Use chart animations for ApexCharts.\nTurn off to improve performance\n\nRequires reloading the page", type: "toggle"}
            }
        }
    } as Settings;

    const savedSettings = localStorage.getItem("site-settings");
    if (savedSettings) {
        console.log(savedSettings);
        const saved = JSON.parse(savedSettings);
        for (const group of Object.keys(settings)) {
            for (const key of Object.keys(settings[group].settings)) {
                const value = saved?.[group]?.[key];
                if (typeof value === typeof settings[group].settings[key].value)
                    settings[group].settings[key].value = value;
            }
        }
    }
    return settings;
}
export function saveSettings(settings: Settings) {
    const json = JSON.stringify(settings, (key, value) => {
        if (value && typeof value === "object")
            if ("value" in value)
                return value.value;
            if ("settings" in value)
                return value.settings;
        return value;
    });
    console.log(json);
    localStorage.setItem("site-settings", json);
}

export async function openSettingsPopup() {
    const settingGroups = $('script[data-setting-groups]')?.dataset.settingGroups?.split(",").map(s => s.trim()) ?? ["all"];
    const settings = getSettings();
    const shownSettings = settingGroups.includes("all") ? settings : Object.fromEntries(
        Object.entries(settings).filter(([group, values]) => settingGroups.includes(values.name))
    );

    const popup = await Popup.show( /* html */ `
        <!-- <div class="title" style="text-align: center;">Settings</div> -->
        ${
            Object.keys(shownSettings).map(group => /* html */ `
                <div class="title" style="text-align: center;">${settings[group].name}</div>
                <setting-group>
                    ${
                        Object.entries(settings[group].settings).map(([key, value]) => /* html */ `
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
    for (const group of Object.keys(shownSettings)) {
        for (const key of Object.keys(settings[group].settings)) {
            const settingItem = document.getElementById('setting-' + key) as SimpleSettingItem;
            settingItem.input.addEventListener('change', () => {
                settings[group].settings[key].value = settingItem.value;
                saveSettings(settings);
            });
        }
    }
    return popup;
}