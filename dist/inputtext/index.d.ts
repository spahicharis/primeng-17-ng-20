import * as i0 from '@angular/core';
import { DoCheck, AfterViewInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Nullable } from 'primeng/ts-helpers';
import { PrimeNGConfig } from 'primeng/api';
import * as i1 from '@angular/common';

/**
 * InputText directive is an extension to standard input element with theming.
 * @group Components
 */
declare class InputText implements DoCheck, AfterViewInit {
    el: ElementRef<any>;
    ngModel: NgModel;
    private cd;
    config: PrimeNGConfig;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant: 'filled' | 'outlined';
    filled: Nullable<boolean>;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    onInput(): void;
    updateFilledState(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputText, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InputText, "[pInputText]", never, { "variant": { "alias": "variant"; "required": false; }; }, {}, never, never, false, never>;
}
declare class InputTextModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<InputTextModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<InputTextModule, [typeof InputText], [typeof i1.CommonModule], [typeof InputText]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<InputTextModule>;
}

export { InputText, InputTextModule };
