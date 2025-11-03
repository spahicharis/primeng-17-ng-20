import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef, QueryList, TemplateRef } from '@angular/core';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import * as i1 from '@angular/common';

/**
 * BlockUI can either block other components or the whole page.
 * @group Components
 */
declare class BlockUI implements AfterViewInit, OnDestroy {
    private document;
    el: ElementRef<any>;
    cd: ChangeDetectorRef;
    config: PrimeNGConfig;
    private renderer;
    platformId: Object;
    /**
     * Name of the local ng-template variable referring to another component.
     * @group Props
     */
    target: any;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex: boolean;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex: number;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Current blocked state as a boolean.
     * @group Props
     */
    get blocked(): boolean;
    set blocked(val: boolean);
    templates: QueryList<PrimeTemplate> | undefined;
    mask: ElementRef | undefined;
    _blocked: boolean;
    animationEndListener: VoidFunction | null | undefined;
    contentTemplate: TemplateRef<any> | undefined;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    block(): void;
    unblock(): void;
    destroyModal(): void;
    unbindAnimationEndListener(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUI, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlockUI, "p-blockUI", never, { "target": { "alias": "target"; "required": false; }; "autoZIndex": { "alias": "autoZIndex"; "required": false; }; "baseZIndex": { "alias": "baseZIndex"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "blocked": { "alias": "blocked"; "required": false; }; }, {}, ["templates"], ["*"], false, never>;
    static ngAcceptInputType_autoZIndex: unknown;
    static ngAcceptInputType_baseZIndex: unknown;
}
declare class BlockUIModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUIModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BlockUIModule, [typeof BlockUI], [typeof i1.CommonModule], [typeof BlockUI]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BlockUIModule>;
}

/**
 * Defines valid templates in BlockUI.
 * @group Templates
 */
interface BlockUITemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
}

export { BlockUI, BlockUIModule };
export type { BlockUITemplates };
