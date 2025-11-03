import * as i0 from '@angular/core';
import { TemplateRef, AfterContentInit, EventEmitter, QueryList } from '@angular/core';
import * as i5 from 'primeng/api';
import { BlockableUI, PrimeTemplate } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import * as i1 from '@angular/common';
import * as i2 from 'primeng/ripple';
import * as i3 from 'primeng/icons/minus';
import * as i4 from 'primeng/icons/plus';

/**
 * Custom panel toggle event, emits after toggle.
 * @see {@link Fieldset.onAfterToggle}
 * @group Events
 */
interface FieldsetAfterToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    collapsed: boolean | undefined;
}
/**
 * Custom panel toggle event, emits before toggle.
 * @see {@link Fieldset.onBeforeToggle}
 * @extends {FieldsetAfterToggleEvent}
 * @group Events
 */
interface FieldsetBeforeToggleEvent extends FieldsetAfterToggleEvent {
}
/**
 * Defines valid templates in Fieldset.
 * @group Templates
 */
interface FieldsetTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom content template.
     */
    content(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    expandicon(): TemplateRef<any>;
    /**
     * Custom icons template of the panel toggler.
     */
    collapseicon(): TemplateRef<any>;
}

/**
 * Fieldset is a grouping component with the optional content toggle feature.
 * @group Components
 */
declare class Fieldset implements AfterContentInit, BlockableUI {
    private el;
    /**
     * Header text of the fieldset.
     * @group Props
     */
    legend: string | undefined;
    /**
     * When specified, content can toggled by clicking the legend.
     * @group Props
     * @defaultValue false
     */
    toggleable: boolean | undefined;
    /**
     * Defines the default visibility state of the content.
     * * @group Props
     */
    collapsed: boolean | undefined;
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
     * Transition options of the panel animation.
     * @group Props
     */
    transitionOptions: string;
    /**
     * Emits when the collapsed state changes.
     * @param {boolean} value - New value.
     * @group Emits
     */
    collapsedChange: EventEmitter<boolean>;
    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom toggle event
     * @group Emits
     */
    onBeforeToggle: EventEmitter<FieldsetBeforeToggleEvent>;
    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom toggle event
     * @group Emits
     */
    onAfterToggle: EventEmitter<FieldsetAfterToggleEvent>;
    templates: QueryList<PrimeTemplate>;
    get id(): string;
    get buttonAriaLabel(): string;
    animating: Nullable<boolean>;
    headerTemplate: Nullable<TemplateRef<any>>;
    contentTemplate: Nullable<TemplateRef<any>>;
    collapseIconTemplate: Nullable<TemplateRef<any>>;
    expandIconTemplate: Nullable<TemplateRef<any>>;
    ngAfterContentInit(): void;
    toggle(event: MouseEvent): boolean;
    onKeyDown(event: any): void;
    expand(): void;
    collapse(): void;
    getBlockableElement(): HTMLElement;
    onToggleDone(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Fieldset, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Fieldset, "p-fieldset", never, { "legend": { "alias": "legend"; "required": false; }; "toggleable": { "alias": "toggleable"; "required": false; }; "collapsed": { "alias": "collapsed"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "transitionOptions": { "alias": "transitionOptions"; "required": false; }; }, { "collapsedChange": "collapsedChange"; "onBeforeToggle": "onBeforeToggle"; "onAfterToggle": "onAfterToggle"; }, ["templates"], ["p-header", "p-header", "*"], false, never>;
    static ngAcceptInputType_toggleable: unknown;
    static ngAcceptInputType_collapsed: unknown;
}
declare class FieldsetModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsetModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FieldsetModule, [typeof Fieldset], [typeof i1.CommonModule, typeof i2.RippleModule, typeof i3.MinusIcon, typeof i4.PlusIcon], [typeof Fieldset, typeof i5.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FieldsetModule>;
}

export { Fieldset, FieldsetModule };
export type { FieldsetAfterToggleEvent, FieldsetBeforeToggleEvent, FieldsetTemplates };
