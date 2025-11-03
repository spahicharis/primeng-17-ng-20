import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, EventEmitter, ContentChildren, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { HomeIcon } from 'primeng/icons/home';
import * as i3 from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';

/**
 * Breadcrumb provides contextual information about page hierarchy.
 * @group Components
 */
class Breadcrumb {
    router = inject(Router);
    /**
     * An array of menuitems.
     * @group Props
     */
    model;
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
     * MenuItem configuration for the home icon.
     * @group Props
     */
    home;
    /**
     * Defines a string that labels the home icon for accessibility.
     * @group Props
     */
    homeAriaLabel;
    /**
     * Fired when an item is selected.
     * @param {BreadcrumbItemClickEvent} event - custom click event.
     * @group Emits
     */
    onItemClick = new EventEmitter();
    templates;
    separatorTemplate;
    itemTemplate;
    onClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }
    onHomeClick(event) {
        if (this.home) {
            this.onClick(event, this.home);
        }
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'separator':
                    this.separatorTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    isCurrentUrl(item) {
        const { routerLink } = item;
        const lastPath = this.router ? this.router.url : '';
        return routerLink === lastPath ? 'page' : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Breadcrumb, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: Breadcrumb, isStandalone: false, selector: "p-breadcrumb", inputs: { model: "model", style: "style", styleClass: "styleClass", home: "home", homeAriaLabel: "homeAriaLabel" }, outputs: { onItemClick: "onItemClick" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <nav [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
          <ol [attr.data-pc-section]="'menu'" class="p-breadcrumb-list">
            @if (home) {
              <li
                [class]="home.styleClass"
                [attr.id]="home.id"
                [ngClass]="{ 'p-breadcrumb-home': true, 'p-disabled': home.disabled }"
                [ngStyle]="home.style"
                pTooltip
                [tooltipOptions]="home.tooltipOptions"
                [attr.data-pc-section]="'home'"
                [attr.aria-disabled]="home.disabled"
                >
                @if (!home.routerLink) {
                  <a
                    [href]="home.url ? home.url : null"
                    [attr.aria-label]="homeAriaLabel"
                    class="p-menuitem-link"
                    (click)="onClick($event, home)"
                    [target]="home.target"
                    [attr.title]="home.title"
                    [attr.tabindex]="home.disabled ? '-1' : home.tabindex || '0'"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(home)"
                    >
                    @if (home.icon) {
                      <span class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iprivateyle"></span>
                    }
                    @if (!home.icon) {
                      <HomeIcon [styleClass]="'p-menuitem-icon'" />
                    }
                    @if (home.label) {
                      @if (home.escape !== false) {
                        <span class="p-menuitem-text">{{ home.label }}</span>
                      } @else {
                        <span class="p-menuitem-text" [innerHTML]="home.label"></span>
                      }
                    }
                  </a>
                }
                @if (home.routerLink) {
                  <a
                    [routerLink]="home.routerLink"
                    [attr.aria-label]="homeAriaLabel"
                    [queryParams]="home.queryParams"
                    [routerLinkActive]="'p-menuitem-link-active'"
                    [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                    class="p-menuitem-link"
                    (click)="onClick($event, home)"
                    [target]="home.target"
                    [attr.title]="home.title"
                    [attr.tabindex]="home.disabled ? '-1' : home.tabindex || '0'"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(home)"
                    [fragment]="home.fragment"
                    [queryParamsHandling]="home.queryParamsHandling"
                    [preserveFragment]="home.preserveFragment"
                    [skipLocationChange]="home.skipLocationChange"
                    [replaceUrl]="home.replaceUrl"
                    [state]="home.state"
                    >
                    @if (home.icon) {
                      <span class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iconStyle"></span>
                    }
                    @if (!home.icon) {
                      <HomeIcon [styleClass]="'p-menuitem-icon'" />
                    }
                    @if (home.label) {
                      @if (home.escape !== false) {
                        <span class="p-menuitem-text">{{ home.label }}</span>
                      } @else {
                        <span class="p-menuitem-text" [innerHTML]="home.label"></span>
                      }
                    }
                  </a>
                }
              </li>
            }
            @if (model && home) {
              <li class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                @if (!separatorTemplate) {
                  <ChevronRightIcon />
                }
                <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
              </li>
            }
            @for (item of model; track item; let end = $last) {
              <li
                [class]="item.styleClass"
                [attr.id]="item.id"
                [attr.aria-disabled]="item.disabled"
                [ngStyle]="item.style"
                [ngClass]="{ 'p-disabled': item.disabled }"
                pTooltip
                [tooltipOptions]="item.tooltipOptions"
                [attr.data-pc-section]="'menuitem'"
                >
                @if (!item.routerLink) {
                  <a
                    [attr.href]="item.url ? item.url : null"
                    class="p-menuitem-link"
                    (click)="onClick($event, item)"
                    [target]="item.target"
                    [attr.title]="item.title"
                    [attr.tabindex]="item.disabled ? '-1' : item.tabindex || '0'"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(item)"
                    >
                    @if (!itemTemplate) {
                      @if (item.icon) {
                        <span class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                      }
                      @if (item.label) {
                        @if (item.escape !== false) {
                          <span class="p-menuitem-text">{{ item.label }}</span>
                        } @else {
                          <span class="p-menuitem-text" [innerHTML]="item.label"></span>
                        }
                      }
                    }
                    @if (itemTemplate) {
                      <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
                    }
                  </a>
                }
                @if (item.routerLink) {
                  <a
                    [routerLink]="item.routerLink"
                    [queryParams]="item.queryParams"
                    [routerLinkActive]="'p-menuitem-link-active'"
                    [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                    class="p-menuitem-link"
                    (click)="onClick($event, item)"
                    [target]="item.target"
                    [attr.title]="item.title"
                    [attr.tabindex]="item.disabled ? '-1' : item.tabindex || '0'"
                    [fragment]="item.fragment"
                    [queryParamsHandling]="item.queryParamsHandling"
                    [preserveFragment]="item.preserveFragment"
                    [skipLocationChange]="item.skipLocationChange"
                    [replaceUrl]="item.replaceUrl"
                    [state]="item.state"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(item)"
                    >
                    @if (!itemTemplate) {
                      @if (item.icon) {
                        <span class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                      }
                      @if (item.label) {
                        @if (item.escape !== false) {
                          <span class="p-menuitem-text">{{ item.label }}</span>
                        } @else {
                          <span class="p-menuitem-text" [innerHTML]="item.label"></span>
                        }
                      }
                    }
                    @if (itemTemplate) {
                      <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
                    }
                  </a>
                }
              </li>
              @if (!end) {
                <li class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                  @if (!separatorTemplate) {
                    <ChevronRightIcon />
                  }
                  <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
                </li>
              }
            }
          </ol>
        </nav>
        `, isInline: true, styles: ["@layer primeng{.p-breadcrumb{overflow-x:auto}.p-breadcrumb .p-breadcrumb-list{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none;display:flex;align-items:center}.p-breadcrumb .p-menuitem-separator{display:flex;align-items:center}.p-breadcrumb::-webkit-scrollbar{display:none}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => HomeIcon), selector: "HomeIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Breadcrumb, decorators: [{
            type: Component,
            args: [{ selector: 'p-breadcrumb', template: `
        <nav [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'" [attr.data-pc-name]="'breadcrumb'" [attr.data-pc-section]="'root'">
          <ol [attr.data-pc-section]="'menu'" class="p-breadcrumb-list">
            @if (home) {
              <li
                [class]="home.styleClass"
                [attr.id]="home.id"
                [ngClass]="{ 'p-breadcrumb-home': true, 'p-disabled': home.disabled }"
                [ngStyle]="home.style"
                pTooltip
                [tooltipOptions]="home.tooltipOptions"
                [attr.data-pc-section]="'home'"
                [attr.aria-disabled]="home.disabled"
                >
                @if (!home.routerLink) {
                  <a
                    [href]="home.url ? home.url : null"
                    [attr.aria-label]="homeAriaLabel"
                    class="p-menuitem-link"
                    (click)="onClick($event, home)"
                    [target]="home.target"
                    [attr.title]="home.title"
                    [attr.tabindex]="home.disabled ? '-1' : home.tabindex || '0'"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(home)"
                    >
                    @if (home.icon) {
                      <span class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iprivateyle"></span>
                    }
                    @if (!home.icon) {
                      <HomeIcon [styleClass]="'p-menuitem-icon'" />
                    }
                    @if (home.label) {
                      @if (home.escape !== false) {
                        <span class="p-menuitem-text">{{ home.label }}</span>
                      } @else {
                        <span class="p-menuitem-text" [innerHTML]="home.label"></span>
                      }
                    }
                  </a>
                }
                @if (home.routerLink) {
                  <a
                    [routerLink]="home.routerLink"
                    [attr.aria-label]="homeAriaLabel"
                    [queryParams]="home.queryParams"
                    [routerLinkActive]="'p-menuitem-link-active'"
                    [routerLinkActiveOptions]="home.routerLinkActiveOptions || { exact: false }"
                    class="p-menuitem-link"
                    (click)="onClick($event, home)"
                    [target]="home.target"
                    [attr.title]="home.title"
                    [attr.tabindex]="home.disabled ? '-1' : home.tabindex || '0'"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(home)"
                    [fragment]="home.fragment"
                    [queryParamsHandling]="home.queryParamsHandling"
                    [preserveFragment]="home.preserveFragment"
                    [skipLocationChange]="home.skipLocationChange"
                    [replaceUrl]="home.replaceUrl"
                    [state]="home.state"
                    >
                    @if (home.icon) {
                      <span class="p-menuitem-icon" [ngClass]="home.icon" [ngStyle]="home.iconStyle"></span>
                    }
                    @if (!home.icon) {
                      <HomeIcon [styleClass]="'p-menuitem-icon'" />
                    }
                    @if (home.label) {
                      @if (home.escape !== false) {
                        <span class="p-menuitem-text">{{ home.label }}</span>
                      } @else {
                        <span class="p-menuitem-text" [innerHTML]="home.label"></span>
                      }
                    }
                  </a>
                }
              </li>
            }
            @if (model && home) {
              <li class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                @if (!separatorTemplate) {
                  <ChevronRightIcon />
                }
                <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
              </li>
            }
            @for (item of model; track item; let end = $last) {
              <li
                [class]="item.styleClass"
                [attr.id]="item.id"
                [attr.aria-disabled]="item.disabled"
                [ngStyle]="item.style"
                [ngClass]="{ 'p-disabled': item.disabled }"
                pTooltip
                [tooltipOptions]="item.tooltipOptions"
                [attr.data-pc-section]="'menuitem'"
                >
                @if (!item.routerLink) {
                  <a
                    [attr.href]="item.url ? item.url : null"
                    class="p-menuitem-link"
                    (click)="onClick($event, item)"
                    [target]="item.target"
                    [attr.title]="item.title"
                    [attr.tabindex]="item.disabled ? '-1' : item.tabindex || '0'"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(item)"
                    >
                    @if (!itemTemplate) {
                      @if (item.icon) {
                        <span class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                      }
                      @if (item.label) {
                        @if (item.escape !== false) {
                          <span class="p-menuitem-text">{{ item.label }}</span>
                        } @else {
                          <span class="p-menuitem-text" [innerHTML]="item.label"></span>
                        }
                      }
                    }
                    @if (itemTemplate) {
                      <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
                    }
                  </a>
                }
                @if (item.routerLink) {
                  <a
                    [routerLink]="item.routerLink"
                    [queryParams]="item.queryParams"
                    [routerLinkActive]="'p-menuitem-link-active'"
                    [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                    class="p-menuitem-link"
                    (click)="onClick($event, item)"
                    [target]="item.target"
                    [attr.title]="item.title"
                    [attr.tabindex]="item.disabled ? '-1' : item.tabindex || '0'"
                    [fragment]="item.fragment"
                    [queryParamsHandling]="item.queryParamsHandling"
                    [preserveFragment]="item.preserveFragment"
                    [skipLocationChange]="item.skipLocationChange"
                    [replaceUrl]="item.replaceUrl"
                    [state]="item.state"
                    [attr.ariaCurrentWhenActive]="isCurrentUrl(item)"
                    >
                    @if (!itemTemplate) {
                      @if (item.icon) {
                        <span class="p-menuitem-icon" [ngClass]="item.icon" [ngStyle]="item.iconStyle"></span>
                      }
                      @if (item.label) {
                        @if (item.escape !== false) {
                          <span class="p-menuitem-text">{{ item.label }}</span>
                        } @else {
                          <span class="p-menuitem-text" [innerHTML]="item.label"></span>
                        }
                      }
                    }
                    @if (itemTemplate) {
                      <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-template>
                    }
                  </a>
                }
              </li>
              @if (!end) {
                <li class="p-menuitem-separator" [attr.data-pc-section]="'separator'">
                  @if (!separatorTemplate) {
                    <ChevronRightIcon />
                  }
                  <ng-template *ngTemplateOutlet="separatorTemplate"></ng-template>
                </li>
              }
            }
          </ol>
        </nav>
        `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, standalone: false, styles: ["@layer primeng{.p-breadcrumb{overflow-x:auto}.p-breadcrumb .p-breadcrumb-list{margin:0;padding:0;list-style-type:none;display:flex;align-items:center;flex-wrap:nowrap}.p-breadcrumb .p-menuitem-text{line-height:1}.p-breadcrumb .p-menuitem-link{text-decoration:none;display:flex;align-items:center}.p-breadcrumb .p-menuitem-separator{display:flex;align-items:center}.p-breadcrumb::-webkit-scrollbar{display:none}}\n"] }]
        }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], home: [{
                type: Input
            }], homeAriaLabel: [{
                type: Input
            }], onItemClick: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class BreadcrumbModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: BreadcrumbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: BreadcrumbModule, declarations: [Breadcrumb], imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule], exports: [Breadcrumb, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: BreadcrumbModule, imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: BreadcrumbModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule, ChevronRightIcon, HomeIcon, SharedModule],
                    exports: [Breadcrumb, RouterModule, TooltipModule, SharedModule],
                    declarations: [Breadcrumb]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Breadcrumb, BreadcrumbModule };
//# sourceMappingURL=primeng-breadcrumb.mjs.map
