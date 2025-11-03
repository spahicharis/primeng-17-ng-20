import * as i0 from '@angular/core';
import { QueryList, TemplateRef } from '@angular/core';
import * as i2 from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import * as i1 from '@angular/common';

/**
 * Tag component is used to categorize content.
 * @group Components
 */
declare class Tag {
    private cd;
    /**
     * Inline style of the component.
     * @group Props
     */
    get style(): {
        [klass: string]: any;
    } | null | undefined;
    set style(value: {
        [klass: string]: any;
    } | null | undefined);
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Severity type of the tag.
     * @group Props
     */
    severity: 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined;
    /**
     * Value to display inside the tag.
     * @group Props
     */
    value: string | undefined;
    /**
     * Icon of the tag to display next to the value.
     * @group Props
     */
    icon: string | undefined;
    /**
     * Whether the corners of the tag are rounded.
     * @group Props
     */
    rounded: boolean | undefined;
    templates: QueryList<PrimeTemplate> | undefined;
    iconTemplate: TemplateRef<any> | undefined;
    _style: {
        [klass: string]: any;
    } | null | undefined;
    ngAfterContentInit(): void;
    containerClass(): {
        [x: string]: boolean | "success" | "secondary" | "info" | "warning" | "danger" | "contrast";
        'p-tag p-component': boolean;
        'p-tag-rounded': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<Tag, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Tag, "p-tag", never, { "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "severity": { "alias": "severity"; "required": false; }; "value": { "alias": "value"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "rounded": { "alias": "rounded"; "required": false; }; }, {}, ["templates"], ["*"], false, never>;
    static ngAcceptInputType_rounded: unknown;
}
declare class TagModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TagModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TagModule, [typeof Tag], [typeof i1.CommonModule, typeof i2.SharedModule], [typeof Tag, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TagModule>;
}

/**
 * Defines valid templates in Tag.
 * @group Templates
 */
interface TagTemplates {
    /**
     * Custom icon template
     */
    icon(): TemplateRef<any>;
}

export { Tag, TagModule };
export type { TagTemplates };
