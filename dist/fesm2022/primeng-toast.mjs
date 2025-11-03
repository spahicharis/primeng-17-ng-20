import { trigger, state, transition, style, animate, query, animateChild } from '@angular/animations';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, NgZone, EventEmitter, numberAttribute, ViewChild, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, Renderer2, ChangeDetectorRef, booleanAttribute, ContentChildren, NgModule } from '@angular/core';
import { PrimeNGConfig, MessageService, PrimeTemplate, SharedModule } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesIcon } from 'primeng/icons/times';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import * as i2 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId, ZIndexUtils, ObjectUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';

class ToastItem {
    zone = inject(NgZone);
    config = inject(PrimeNGConfig);
    message;
    index;
    life;
    template;
    headlessTemplate;
    showTransformOptions;
    hideTransformOptions;
    showTransitionOptions;
    hideTransitionOptions;
    onClose = new EventEmitter();
    containerViewChild;
    timeout;
    ngAfterViewInit() {
        this.initTimeout();
    }
    initTimeout() {
        if (!this.message?.sticky) {
            this.zone.runOutsideAngular(() => {
                this.timeout = setTimeout(() => {
                    this.onClose.emit({
                        index: this.index,
                        message: this.message
                    });
                }, this.message?.life || this.life || 3000);
            });
        }
    }
    clearTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    onMouseEnter() {
        this.clearTimeout();
    }
    onMouseLeave() {
        this.initTimeout();
    }
    onCloseIconClick = (event) => {
        this.clearTimeout();
        this.onClose.emit({
            index: this.index,
            message: this.message
        });
        event.preventDefault();
    };
    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    ngOnDestroy() {
        this.clearTimeout();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToastItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: ToastItem, isStandalone: false, selector: "p-toastItem", inputs: { message: "message", index: ["index", "index", numberAttribute], life: ["life", "life", numberAttribute], template: "template", headlessTemplate: "headlessTemplate", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClose: "onClose" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div
          #container
          [attr.id]="message?.id"
          [class]="message?.styleClass"
          [ngClass]="['p-toast-message-' + message?.severity, 'p-toast-message']"
          [@messageState]="{ value: 'visible', params: { showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
          (mouseenter)="onMouseEnter()"
          (mouseleave)="onMouseLeave()"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          [attr.data-pc-name]="'toast'"
          [attr.data-pc-section]="'root'"
          >
          @if (headlessTemplate) {
            <ng-container *ngTemplateOutlet="headlessTemplate; context: { $implicit: message, closeFn: onCloseIconClick }"></ng-container>
          } @else {
            <div class="p-toast-message-content" [ngClass]="message?.contentStyleClass" [attr.data-pc-section]="'content'">
              @if (!template) {
                @if (message.icon) {
                  <span [class]="'p-toast-message-icon pi ' + message.icon"></span>
                }
                @if (!message.icon) {
                  <span class="p-toast-message-icon" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'">
                    <ng-container>
                      @if (message.severity === 'success') {
                        <CheckIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                      @if (message.severity === 'info') {
                        <InfoCircleIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                      @if (message.severity === 'error') {
                        <TimesCircleIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                      @if (message.severity === 'warn') {
                        <ExclamationTriangleIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                    </ng-container>
                  </span>
                }
                <div class="p-toast-message-text" [attr.data-pc-section]="'text'">
                  <div class="p-toast-summary" [attr.data-pc-section]="'summary'">{{ message.summary }}</div>
                  <div class="p-toast-detail" [attr.data-pc-section]="'detail'">{{ message.detail }}</div>
                </div>
              }
              <ng-container *ngTemplateOutlet="template; context: { $implicit: message }"></ng-container>
              @if (message?.closable !== false) {
                <button
                  type="button"
                  class="p-toast-icon-close p-link"
                  (click)="onCloseIconClick($event)"
                  (keydown.enter)="onCloseIconClick($event)"
                  pRipple
                  [attr.aria-label]="closeAriaLabel"
                  [attr.data-pc-section]="'closebutton'"
                  >
                  @if (message.closeIcon) {
                    <span [class]="'pt-1 text-base p-toast-message-icon pi ' + message.closeIcon"></span>
                  }
                  @if (!message.closeIcon) {
                    <TimesIcon [styleClass]="'p-toast-icon-close-icon'" [attr.aria-hidden]="true" [attr.data-pc-section]="'closeicon'" />
                  }
                </button>
              }
            </div>
          }
        </div>
        `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(() => InfoCircleIcon), selector: "InfoCircleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesCircleIcon), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(() => ExclamationTriangleIcon), selector: "ExclamationTriangleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], animations: [
            trigger('messageState', [
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => *', [
                    style({
                        transform: '{{showTransformParams}}',
                        opacity: 0
                    }),
                    animate('{{showTransitionParams}}')
                ]),
                transition('* => void', [
                    animate('{{hideTransitionParams}}', style({
                        height: 0,
                        opacity: 0,
                        transform: '{{hideTransformParams}}'
                    }))
                ])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToastItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-toastItem',
                    template: `
        <div
          #container
          [attr.id]="message?.id"
          [class]="message?.styleClass"
          [ngClass]="['p-toast-message-' + message?.severity, 'p-toast-message']"
          [@messageState]="{ value: 'visible', params: { showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
          (mouseenter)="onMouseEnter()"
          (mouseleave)="onMouseLeave()"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          [attr.data-pc-name]="'toast'"
          [attr.data-pc-section]="'root'"
          >
          @if (headlessTemplate) {
            <ng-container *ngTemplateOutlet="headlessTemplate; context: { $implicit: message, closeFn: onCloseIconClick }"></ng-container>
          } @else {
            <div class="p-toast-message-content" [ngClass]="message?.contentStyleClass" [attr.data-pc-section]="'content'">
              @if (!template) {
                @if (message.icon) {
                  <span [class]="'p-toast-message-icon pi ' + message.icon"></span>
                }
                @if (!message.icon) {
                  <span class="p-toast-message-icon" [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'">
                    <ng-container>
                      @if (message.severity === 'success') {
                        <CheckIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                      @if (message.severity === 'info') {
                        <InfoCircleIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                      @if (message.severity === 'error') {
                        <TimesCircleIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                      @if (message.severity === 'warn') {
                        <ExclamationTriangleIcon [attr.aria-hidden]="true" [attr.data-pc-section]="'icon'" />
                      }
                    </ng-container>
                  </span>
                }
                <div class="p-toast-message-text" [attr.data-pc-section]="'text'">
                  <div class="p-toast-summary" [attr.data-pc-section]="'summary'">{{ message.summary }}</div>
                  <div class="p-toast-detail" [attr.data-pc-section]="'detail'">{{ message.detail }}</div>
                </div>
              }
              <ng-container *ngTemplateOutlet="template; context: { $implicit: message }"></ng-container>
              @if (message?.closable !== false) {
                <button
                  type="button"
                  class="p-toast-icon-close p-link"
                  (click)="onCloseIconClick($event)"
                  (keydown.enter)="onCloseIconClick($event)"
                  pRipple
                  [attr.aria-label]="closeAriaLabel"
                  [attr.data-pc-section]="'closebutton'"
                  >
                  @if (message.closeIcon) {
                    <span [class]="'pt-1 text-base p-toast-message-icon pi ' + message.closeIcon"></span>
                  }
                  @if (!message.closeIcon) {
                    <TimesIcon [styleClass]="'p-toast-icon-close-icon'" [attr.aria-hidden]="true" [attr.data-pc-section]="'closeicon'" />
                  }
                </button>
              }
            </div>
          }
        </div>
        `,
                    animations: [
                        trigger('messageState', [
                            state('visible', style({
                                transform: 'translateY(0)',
                                opacity: 1
                            })),
                            transition('void => *', [
                                style({
                                    transform: '{{showTransformParams}}',
                                    opacity: 0
                                }),
                                animate('{{showTransitionParams}}')
                            ]),
                            transition('* => void', [
                                animate('{{hideTransitionParams}}', style({
                                    height: 0,
                                    opacity: 0,
                                    transform: '{{hideTransformParams}}'
                                }))
                            ])
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'p-element'
                    },
                    standalone: false
                }]
        }], propDecorators: { message: [{
                type: Input
            }], index: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], life: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], template: [{
                type: Input
            }], headlessTemplate: [{
                type: Input
            }], showTransformOptions: [{
                type: Input
            }], hideTransformOptions: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], onClose: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
/**
 * Toast is used to display messages in an overlay.
 * @group Components
 */
class Toast {
    document = inject(DOCUMENT);
    renderer = inject(Renderer2);
    messageService = inject(MessageService);
    cd = inject(ChangeDetectorRef);
    config = inject(PrimeNGConfig);
    /**
     * Key of the message in case message is targeted to a specific toast component.
     * @group Props
     */
    key;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * The default time to display messages for in milliseconds.
     * @group Props
     */
    life = 3000;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Inline class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Position of the toast in viewport.
     * @group Props
     */
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this.cd.markForCheck();
    }
    /**
     * It does not add the new message if there is already a toast displayed with the same content
     * @group Props
     */
    preventOpenDuplicates = false;
    /**
     * Displays only once a message with the same content.
     * @group Props
     */
    preventDuplicates = false;
    /**
     * Transform options of the show animation.
     * @group Props
     */
    showTransformOptions = 'translateY(100%)';
    /**
     * Transform options of the hide animation.
     * @group Props
     */
    hideTransformOptions = 'translateY(-100%)';
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '300ms ease-out';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '250ms ease-in';
    /**
     * Object literal to define styles per screen size.
     * @group Props
     */
    breakpoints;
    /**
     * Callback to invoke when a message is closed.
     * @param {ToastCloseEvent} event - custom close event.
     * @group Emits
     */
    onClose = new EventEmitter();
    containerViewChild;
    templates;
    messageSubscription;
    clearSubscription;
    messages;
    messagesArchieve;
    template;
    headlessTemplate;
    _position = 'top-right';
    styleElement;
    id = UniqueComponentId();
    ngOnInit() {
        this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
            if (messages) {
                if (Array.isArray(messages)) {
                    const filteredMessages = messages.filter((m) => this.canAdd(m));
                    this.add(filteredMessages);
                }
                else if (this.canAdd(messages)) {
                    this.add([messages]);
                }
            }
        });
        this.clearSubscription = this.messageService.clearObserver.subscribe((key) => {
            if (key) {
                if (this.key === key) {
                    this.messages = null;
                }
            }
            else {
                this.messages = null;
            }
            this.cd.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }
    add(messages) {
        this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
        if (this.preventDuplicates) {
            this.messagesArchieve = this.messagesArchieve ? [...this.messagesArchieve, ...messages] : [...messages];
        }
        this.cd.markForCheck();
    }
    canAdd(message) {
        let allow = this.key === message.key;
        if (allow && this.preventOpenDuplicates) {
            allow = !this.containsMessage(this.messages, message);
        }
        if (allow && this.preventDuplicates) {
            allow = !this.containsMessage(this.messagesArchieve, message);
        }
        return allow;
    }
    containsMessage(collection, message) {
        if (!collection) {
            return false;
        }
        return (collection.find((m) => {
            return m.summary === message.summary && m.detail == message.detail && m.severity === message.severity;
        }) != null);
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'message':
                    this.template = item.template;
                    break;
                case 'headless':
                    this.headlessTemplate = item.template;
                    break;
                default:
                    this.template = item.template;
                    break;
            }
        });
    }
    onMessageClose(event) {
        this.messages?.splice(event.index, 1);
        this.onClose.emit({
            message: event.message
        });
        this.cd.detectChanges();
    }
    onAnimationStart(event) {
        if (event.fromState === 'void') {
            this.renderer.setAttribute(this.containerViewChild?.nativeElement, this.id, '');
            if (this.autoZIndex && this.containerViewChild?.nativeElement.style.zIndex === '') {
                ZIndexUtils.set('modal', this.containerViewChild?.nativeElement, this.baseZIndex || this.config.zIndex.modal);
            }
        }
    }
    onAnimationEnd(event) {
        if (event.toState === 'void') {
            if (this.autoZIndex && ObjectUtils.isEmpty(this.messages)) {
                ZIndexUtils.clear(this.containerViewChild?.nativeElement);
            }
        }
    }
    createStyle() {
        if (!this.styleElement) {
            this.styleElement = this.renderer.createElement('style');
            this.styleElement.type = 'text/css';
            DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
            this.renderer.appendChild(this.document.head, this.styleElement);
            let innerHTML = '';
            for (let breakpoint in this.breakpoints) {
                let breakpointStyle = '';
                for (let styleProp in this.breakpoints[breakpoint]) {
                    breakpointStyle += styleProp + ':' + this.breakpoints[breakpoint][styleProp] + ' !important;';
                }
                innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-toast[${this.id}] {
                           ${breakpointStyle}
                        }
                    }
                `;
            }
            this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
        }
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.containerViewChild && this.autoZIndex) {
            ZIndexUtils.clear(this.containerViewChild.nativeElement);
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
        this.destroyStyle();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Toast, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: Toast, isStandalone: false, selector: "p-toast", inputs: { key: "key", autoZIndex: ["autoZIndex", "autoZIndex", booleanAttribute], baseZIndex: ["baseZIndex", "baseZIndex", numberAttribute], life: ["life", "life", numberAttribute], style: "style", styleClass: "styleClass", position: "position", preventOpenDuplicates: ["preventOpenDuplicates", "preventOpenDuplicates", booleanAttribute], preventDuplicates: ["preventDuplicates", "preventDuplicates", booleanAttribute], showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", breakpoints: "breakpoints" }, outputs: { onClose: "onClose" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div #container class="p-toast p-component" [ngClass]="'p-toast-' + _position" [ngStyle]="style" [class]="styleClass">
          @for (msg of messages; track msg; let i = $index) {
            <p-toastItem
              [message]="msg"
              [index]="i"
              [life]="life"
              (onClose)="onMessageClose($event)"
              [template]="template"
              [headlessTemplate]="headlessTemplate"
              @toastAnimation
              (@toastAnimation.start)="onAnimationStart($event)"
              (@toastAnimation.done)="onAnimationEnd($event)"
              [showTransformOptions]="showTransformOptions"
              [hideTransformOptions]="hideTransformOptions"
              [showTransitionOptions]="showTransitionOptions"
              [hideTransitionOptions]="hideTransitionOptions"
            ></p-toastItem>
          }
        </div>
        `, isInline: true, styles: ["@layer primeng{.p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translate(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex:none}.p-toast-icon-close.p-link{cursor:pointer}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: ToastItem, selector: "p-toastItem", inputs: ["message", "index", "life", "template", "headlessTemplate", "showTransformOptions", "hideTransformOptions", "showTransitionOptions", "hideTransitionOptions"], outputs: ["onClose"] }], animations: [trigger('toastAnimation', [transition(':enter, :leave', [query('@*', animateChild())])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Toast, decorators: [{
            type: Component,
            args: [{ selector: 'p-toast', template: `
        <div #container class="p-toast p-component" [ngClass]="'p-toast-' + _position" [ngStyle]="style" [class]="styleClass">
          @for (msg of messages; track msg; let i = $index) {
            <p-toastItem
              [message]="msg"
              [index]="i"
              [life]="life"
              (onClose)="onMessageClose($event)"
              [template]="template"
              [headlessTemplate]="headlessTemplate"
              @toastAnimation
              (@toastAnimation.start)="onAnimationStart($event)"
              (@toastAnimation.done)="onAnimationEnd($event)"
              [showTransformOptions]="showTransformOptions"
              [hideTransformOptions]="hideTransformOptions"
              [showTransitionOptions]="showTransitionOptions"
              [hideTransitionOptions]="hideTransitionOptions"
            ></p-toastItem>
          }
        </div>
        `, animations: [trigger('toastAnimation', [transition(':enter, :leave', [query('@*', animateChild())])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, standalone: false, styles: ["@layer primeng{.p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translate(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex:none}.p-toast-icon-close.p-link{cursor:pointer}}\n"] }]
        }], propDecorators: { key: [{
                type: Input
            }], autoZIndex: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], baseZIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], life: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], position: [{
                type: Input
            }], preventOpenDuplicates: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], preventDuplicates: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTransformOptions: [{
                type: Input
            }], hideTransformOptions: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], onClose: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class ToastModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: ToastModule, declarations: [Toast, ToastItem], imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon], exports: [Toast, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToastModule, imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon],
                    exports: [Toast, SharedModule],
                    declarations: [Toast, ToastItem]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Toast, ToastItem, ToastModule };
//# sourceMappingURL=primeng-toast.mjs.map
