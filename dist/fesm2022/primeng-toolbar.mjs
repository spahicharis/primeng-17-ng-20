import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, ElementRef, ContentChildren, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';

/**
 * Toolbar is a grouping component for buttons and other content.
 * @group Components
 */
class Toolbar {
    el = inject(ElementRef);
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabelledBy;
    templates;
    startTemplate;
    endTemplate;
    centerTemplate;
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                case 'left':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                case 'right':
                    this.endTemplate = item.template;
                    break;
                case 'center':
                    this.centerTemplate = item.template;
                    break;
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Toolbar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: Toolbar, isStandalone: false, selector: "p-toolbar", inputs: { style: "style", styleClass: "styleClass", ariaLabelledBy: "ariaLabelledBy" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div [ngClass]="'p-toolbar p-component'" [attr.aria-labelledby]="ariaLabelledBy" [ngStyle]="style" [class]="styleClass" role="toolbar" [attr.data-pc-name]="'toolbar'">
          <ng-content></ng-content>
          @if (startTemplate) {
            <div class="p-toolbar-group-left p-toolbar-group-start" [attr.data-pc-section]="'start'">
              <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
          }
          @if (centerTemplate) {
            <div class="p-toolbar-group-center" [attr.data-pc-section]="'center'">
              <ng-container *ngTemplateOutlet="centerTemplate"></ng-container>
            </div>
          }
          @if (endTemplate) {
            <div class="p-toolbar-group-right p-toolbar-group-end" [attr.data-pc-section]="'end'">
              <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
          }
        </div>
        `, isInline: true, styles: ["@layer primeng{.p-toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.p-toolbar-group-start,.p-toolbar-group-center,.p-toolbar-group-end,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Toolbar, decorators: [{
            type: Component,
            args: [{ selector: 'p-toolbar', template: `
        <div [ngClass]="'p-toolbar p-component'" [attr.aria-labelledby]="ariaLabelledBy" [ngStyle]="style" [class]="styleClass" role="toolbar" [attr.data-pc-name]="'toolbar'">
          <ng-content></ng-content>
          @if (startTemplate) {
            <div class="p-toolbar-group-left p-toolbar-group-start" [attr.data-pc-section]="'start'">
              <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
          }
          @if (centerTemplate) {
            <div class="p-toolbar-group-center" [attr.data-pc-section]="'center'">
              <ng-container *ngTemplateOutlet="centerTemplate"></ng-container>
            </div>
          }
          @if (endTemplate) {
            <div class="p-toolbar-group-right p-toolbar-group-end" [attr.data-pc-section]="'end'">
              <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
          }
        </div>
        `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, standalone: false, styles: ["@layer primeng{.p-toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap}.p-toolbar-group-start,.p-toolbar-group-center,.p-toolbar-group-end,.p-toolbar-group-left,.p-toolbar-group-right{display:flex;align-items:center}}\n"] }]
        }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class ToolbarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToolbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: ToolbarModule, declarations: [Toolbar], imports: [CommonModule, SharedModule], exports: [Toolbar, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToolbarModule, imports: [CommonModule, SharedModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: ToolbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule],
                    exports: [Toolbar, SharedModule],
                    declarations: [Toolbar]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Toolbar, ToolbarModule };
//# sourceMappingURL=primeng-toolbar.mjs.map
