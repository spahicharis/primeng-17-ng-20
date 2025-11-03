import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { VoidListener } from 'primeng/ts-helpers';

/**
 * Ripple directive adds ripple effect to the host element.
 * @group Components
 */
declare class Ripple implements AfterViewInit, OnDestroy {
    private document;
    private platformId;
    private renderer;
    el: ElementRef<any>;
    zone: NgZone;
    config: PrimeNGConfig;
    animationListener: VoidListener;
    mouseDownListener: VoidListener;
    timeout: any;
    ngAfterViewInit(): void;
    onMouseDown(event: MouseEvent): void;
    getInk(): any;
    resetInk(): void;
    onAnimationEnd(event: Event): void;
    create(): void;
    remove(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Ripple, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<Ripple, "[pRipple]", never, {}, {}, never, never, true, never>;
}
declare class RippleModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<RippleModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<RippleModule, never, [typeof Ripple], [typeof Ripple]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<RippleModule>;
}

export { Ripple, RippleModule };
