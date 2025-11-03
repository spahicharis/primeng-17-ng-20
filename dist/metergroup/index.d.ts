import * as i0 from '@angular/core';
import { TemplateRef, QueryList, AfterContentInit, ElementRef } from '@angular/core';
import * as i2 from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import * as i1 from '@angular/common';

/**
 * Defines valid templates in MeterGroup.
 * @group Templates
 */
interface MeterGroupTemplates {
    /**
     * Custom label template.
     */
    label(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Total percent of the metergroup items.
         */
        totalPercent?: number;
        /**
         * Array of sequential sum of values of metergroup items.
         */
        percentages?: number;
    }): TemplateRef<any>;
    /**
     * Custom meter item template.
     */
    meter(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Current index of the meter item.
         */
        index?: number;
        /**
         * Style class of the meter item
         */
        class?: string;
        /**
         * Current orientation of the component.
         */
        orientation?: string;
        /**
         * Current width of the meter item.
         */
        size?: string;
        /**
         * Total percent of the metergroup items
         */
        totalPercent?: number;
    }): TemplateRef<any>;
    /**
     * Custom start template.
     */
    start(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Total percent of the metergroup items.
         */
        totalPercent?: number;
        /**
         * Array of sequential sum of values of metergroup items.
         */
        percentages?: number;
    }): TemplateRef<any>;
    /**
     * Custom start template.
     */
    end(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Total percent of the metergroup items.
         */
        totalPercent?: number;
        /**
         * Array of sequential sum of values of metergroup items.
         */
        percentages?: number;
    }): TemplateRef<any>;
    /**
     * Custom icon template.
     */
    icon(context: {
        /**
         * Current value of the component.
         */
        $implicit?: MeterItem;
        /**
         * Style class of the icon.
         */
        class?: string;
    }): TemplateRef<any>;
}
/**
 * Represents a meter item configuration.
 * @group Interface
 */
interface MeterItem {
    /**
     * Label of the meter item.
     */
    label?: string;
    /**
     * Value of the meter item.
     */
    value?: number;
    /**
     * Color of the meter item.
     */
    color?: string;
    /**
     * Icon of the meter item.
     */
    icon?: string;
}

declare class MeterGroupLabel {
    value: any[];
    labelPosition: 'start' | 'end';
    labelOrientation: 'horizontal' | 'vertical';
    min: number;
    max: number;
    iconTemplate: TemplateRef<any> | undefined;
    templates: QueryList<PrimeTemplate> | undefined;
    get labelClass(): {
        [key: string]: boolean;
    };
    parentInstance: MeterGroup;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeterGroupLabel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeterGroupLabel, "p-meterGroupLabel", never, { "value": { "alias": "value"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "labelOrientation": { "alias": "labelOrientation"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "iconTemplate": { "alias": "iconTemplate"; "required": false; }; }, {}, ["templates"], never, false, never>;
}
/**
 * MeterGroup displays scalar measurements within a known range.
 * @group Components
 */
declare class MeterGroup implements AfterContentInit {
    /**
     * Current value of the metergroup.
     * @group Props
     */
    value: MeterItem[] | undefined;
    /**
     * Mininum boundary value.
     * @group Props
     */
    min: number;
    /**
     * Maximum boundary value.
     * @group Props
     */
    max: number;
    /**
     * Specifies the layout of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    orientation: 'horizontal' | 'vertical';
    /**
     * Specifies the label position of the component, valid values are 'start' and 'end'.
     * @group Props
     */
    labelPosition: 'start' | 'end';
    /**
     * Specifies the label orientation of the component, valid values are 'horizontal' and 'vertical'.
     * @group Props
     */
    labelOrientation: string;
    /**
     * Inline style of the element.
     * @group Props
     */
    style: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass: string | undefined;
    templates: QueryList<PrimeTemplate> | undefined;
    get vertical(): boolean;
    get containerClass(): {
        'p-metergroup p-component': boolean;
        'p-metergroup-horizontal': boolean;
        'p-metergroup-vertical': boolean;
    };
    labelTemplate: TemplateRef<any> | undefined;
    meterTemplate: TemplateRef<any> | undefined;
    endTemplate: TemplateRef<any> | undefined;
    startTemplate: TemplateRef<any> | undefined;
    iconTemplate: TemplateRef<any> | undefined;
    container: ElementRef;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    percent(meter?: number): number;
    percentValue(meter: any): string;
    meterStyle(val: any): {
        backgroundColor: any;
        width: string;
        height: string;
    };
    totalPercent(): number;
    percentages(): any[];
    trackByFn(index: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeterGroup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeterGroup, "p-meterGroup", never, { "value": { "alias": "value"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "labelPosition": { "alias": "labelPosition"; "required": false; }; "labelOrientation": { "alias": "labelOrientation"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; }, {}, ["templates"], never, false, never>;
}
declare class MeterGroupModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MeterGroupModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MeterGroupModule, [typeof MeterGroup, typeof MeterGroupLabel], [typeof i1.CommonModule, typeof i2.SharedModule], [typeof MeterGroup, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MeterGroupModule>;
}

export { MeterGroup, MeterGroupLabel, MeterGroupModule };
export type { MeterGroupTemplates, MeterItem };
