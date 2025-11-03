import * as i0 from '@angular/core';
import { AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as rxjs from 'rxjs';
import { Subscription } from 'rxjs';
import * as i1 from '@angular/common';
import * as i2 from '@angular/forms';

declare class TerminalService {
    private commandSource;
    private responseSource;
    commandHandler: rxjs.Observable<string>;
    responseHandler: rxjs.Observable<string>;
    sendCommand(command: string): void;
    sendResponse(response: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TerminalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TerminalService>;
}

/**
 * Terminal is a text based user interface.
 * @group Components
 */
declare class Terminal implements AfterViewInit, AfterViewChecked, OnDestroy {
    el: ElementRef<any>;
    terminalService: TerminalService;
    cd: ChangeDetectorRef;
    /**
     * Initial text to display on terminal.
     * @group Props
     */
    welcomeMessage: string | undefined;
    /**
     * Prompt text for each command.
     * @group Props
     */
    prompt: string | undefined;
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
    commands: any[];
    command: string;
    container: Element;
    commandProcessed: boolean;
    subscription: Subscription;
    constructor();
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    set response(value: string);
    handleCommand(event: KeyboardEvent): void;
    focus(element: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Terminal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Terminal, "p-terminal", never, { "welcomeMessage": { "alias": "welcomeMessage"; "required": false; }; "prompt": { "alias": "prompt"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "response": { "alias": "response"; "required": false; }; }, {}, never, never, false, never>;
}
declare class TerminalModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TerminalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TerminalModule, [typeof Terminal], [typeof i1.CommonModule, typeof i2.FormsModule], [typeof Terminal]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TerminalModule>;
}

export { Terminal, TerminalModule, TerminalService };
