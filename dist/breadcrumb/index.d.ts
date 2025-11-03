import * as i0 from '@angular/core';
import { TemplateRef, AfterContentInit, EventEmitter, QueryList } from '@angular/core';
import * as i6 from 'primeng/api';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import * as i1 from '@angular/common';
import * as i2 from '@angular/router';
import * as i3 from 'primeng/tooltip';
import * as i4 from 'primeng/icons/chevronright';
import * as i5 from 'primeng/icons/home';

/**
 * Defines valid templates in Breadcumb.
 * @group Templates
 */
interface BreadcumbTemplates {
    /**
     * Custom template of item.
     */
    item(context: {
        /**
         * Data of the item.
         */
        $implicit: MenuItem;
    }): TemplateRef<{
        $implicit: MenuItem;
    }>;
    /**
     * Custom template of separator.
     */
    separator(): TemplateRef<any>;
}
/**
 * Custom select event.
 * @see {@link Breadcrumb.onItemClick}
 * @group Events
 */
interface BreadcrumbItemClickEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Selected menu item .
     */
    item: MenuItem;
}

/**
 * Breadcrumb provides contextual information about page hierarchy.
 * @group Components
 */
declare class Breadcrumb implements AfterContentInit {
    private router;
    /**
     * An array of menuitems.
     * @group Props
     */
    model: MenuItem[] | undefined;
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
     * MenuItem configuration for the home icon.
     * @group Props
     */
    home: MenuItem | undefined;
    /**
     * Defines a string that labels the home icon for accessibility.
     * @group Props
     */
    homeAriaLabel: string | undefined;
    /**
     * Fired when an item is selected.
     * @param {BreadcrumbItemClickEvent} event - custom click event.
     * @group Emits
     */
    onItemClick: EventEmitter<BreadcrumbItemClickEvent>;
    templates: QueryList<PrimeTemplate> | undefined;
    separatorTemplate: TemplateRef<any> | undefined;
    itemTemplate: TemplateRef<any> | undefined;
    onClick(event: MouseEvent, item: MenuItem): void;
    onHomeClick(event: MouseEvent | any): void;
    ngAfterContentInit(): void;
    isCurrentUrl(item: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<Breadcrumb, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Breadcrumb, "p-breadcrumb", never, { "model": { "alias": "model"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "home": { "alias": "home"; "required": false; }; "homeAriaLabel": { "alias": "homeAriaLabel"; "required": false; }; }, { "onItemClick": "onItemClick"; }, ["templates"], never, false, never>;
}
declare class BreadcrumbModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BreadcrumbModule, [typeof Breadcrumb], [typeof i1.CommonModule, typeof i2.RouterModule, typeof i3.TooltipModule, typeof i4.ChevronRightIcon, typeof i5.HomeIcon, typeof i6.SharedModule], [typeof Breadcrumb, typeof i2.RouterModule, typeof i3.TooltipModule, typeof i6.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BreadcrumbModule>;
}

export { Breadcrumb, BreadcrumbModule };
export type { BreadcrumbItemClickEvent, BreadcumbTemplates };
