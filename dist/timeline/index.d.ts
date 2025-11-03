import * as i0 from '@angular/core';
import { AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import * as i2 from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import * as i1 from '@angular/common';

/**
 * Timeline visualizes a series of chained events.
 * @group Components
 */
declare class Timeline implements AfterContentInit, BlockableUI {
    private el;
    /**
     * An array of events to display.
     * @group Props
     */
    value: any[] | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    style: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Position of the timeline bar relative to the content. Valid values are "left", "right" for vertical layout and "top", "bottom" for horizontal layout.
     * @group Props
     */
    align: string;
    /**
     * Orientation of the timeline.
     * @group Props
     */
    layout: 'vertical' | 'horizontal';
    templates: Nullable<QueryList<any>>;
    contentTemplate: Nullable<TemplateRef<any>>;
    oppositeTemplate: Nullable<TemplateRef<any>>;
    markerTemplate: Nullable<TemplateRef<any>>;
    getBlockableElement(): HTMLElement;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Timeline, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Timeline, "p-timeline", never, { "value": { "alias": "value"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "align": { "alias": "align"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; }, {}, ["templates"], never, false, never>;
}
declare class TimelineModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TimelineModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TimelineModule, [typeof Timeline], [typeof i1.CommonModule], [typeof Timeline, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TimelineModule>;
}

/**
 * Defines valid templates in Timeline.
 * @group Templates
 */
interface TimelineTemplates {
    /**
     * Custom content template.
     * @param {Object} context - item data.
     */
    content(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{
        $implicit: any;
    }>;
    /**
     * Custom opposite item template.
     * @param {Object} context - item data.
     */
    opposite(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{
        $implicit: any;
    }>;
    /**
     * Custom marker template.
     * @param {Object} context - item data.
     */
    marker(context: {
        /**
         * Item instance.
         */
        $implicit: any;
    }): TemplateRef<{
        $implicit: any;
    }>;
}

export { Timeline, TimelineModule };
export type { TimelineTemplates };
