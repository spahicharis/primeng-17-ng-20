import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, OnDestroy, ElementRef, EventEmitter } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import * as i1 from '@angular/common';

/**
 * InputTextarea adds styling and autoResize functionality to standard textarea element.
 * @group Components
 */
declare class InputTextarea implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef<any>;
    ngModel: NgModel;
    control: NgControl;
    private cd;
    config: PrimeNGConfig;
    /**
     * When present, textarea size changes as being typed.
     * @group Props
     */
    autoResize: boolean | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant: 'filled' | 'outlined';
    /**
     * Callback to invoke on textarea resize.
     * @param {(Event | {})} event - Custom resize event.
     * @group Emits
     */
    onResize: EventEmitter<Event | {}>;
    filled: boolean | undefined;
    cachedScrollHeight: number | undefined;
    ngModelSubscription: Subscription | undefined;
    ngControlSubscription: Subscription | undefined;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onInput(e: Event): void;
    updateFilledState(): void;
    resize(event?: Event): void;
    updateState(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputTextarea, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InputTextarea, "[pInputTextarea]", never, { "autoResize": { "alias": "autoResize"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; }, { "onResize": "onResize"; }, never, never, false, never>;
    static ngAcceptInputType_autoResize: unknown;
}
declare class InputTextareaModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InputTextareaModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InputTextareaModule, [typeof InputTextarea], [typeof i1.CommonModule], [typeof InputTextarea]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InputTextareaModule>;
}

export { InputTextarea, InputTextareaModule };
