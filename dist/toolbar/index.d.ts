import * as i0 from '@angular/core';
import { AfterContentInit, QueryList, TemplateRef } from '@angular/core';
import * as i2 from 'primeng/api';
import { BlockableUI, PrimeTemplate } from 'primeng/api';
import * as i1 from '@angular/common';

/**
 * Toolbar is a grouping component for buttons and other content.
 * @group Components
 */
declare class Toolbar implements AfterContentInit, BlockableUI {
    private el;
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
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabelledBy: string | undefined;
    templates: QueryList<PrimeTemplate> | undefined;
    startTemplate: TemplateRef<any> | undefined;
    endTemplate: TemplateRef<any> | undefined;
    centerTemplate: TemplateRef<any> | undefined;
    getBlockableElement(): HTMLElement;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Toolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Toolbar, "p-toolbar", never, { "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; }, {}, ["templates"], ["*"], false, never>;
}
declare class ToolbarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ToolbarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ToolbarModule, [typeof Toolbar], [typeof i1.CommonModule, typeof i2.SharedModule], [typeof Toolbar, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ToolbarModule>;
}

/**
 * Defines valid templates in Toolbar.
 * @group Templates
 */
interface ToolbarTemplates {
    /**
     * Custom start content.
     */
    start(): TemplateRef<any>;
    /**
     * Custom end content.
     */
    end(): TemplateRef<any>;
    /**
     * Custom center content.
     */
    center(): TemplateRef<any>;
}

export { Toolbar, ToolbarModule };
export type { ToolbarTemplates };
