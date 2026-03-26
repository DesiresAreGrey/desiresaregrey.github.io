export {};

declare global {
    class SimpleSettingItem extends SettingItem {
        readonly inputs: never;

        get duration(): never;
        set duration(value: never);
    }

    class NumberSettingItem extends SimpleSettingItem {
        get input(): HTMLInputElement;
        get value(): number;
        set value(val: number);
    }
    class DropdownSettingItem extends SimpleSettingItem {
        get input(): HTMLSelectElement;
        get value(): string;
        set value(val: string);
    }
    class ToggleSettingItem extends SimpleSettingItem {
        get input(): HTMLSelectElement;
        get value(): boolean;
        set value(val: boolean);
    }

    class ComplexSettingItem extends SettingItem {
        get input(): never;
        get value(): never;
        set value(val: never);

        get duration(): never;
        set duration(value: never);
    }
    class WidthHeightSettingItem extends ComplexSettingItem {}

    class StartEndSettingItem extends SettingItem {
        get input(): never;
        get value(): never;
        set value(val: never);
    }

    interface HTMLElementTagNameMap {
        "setting-item": SettingItem;
        "setting-group": SettingGroup;
    }
}