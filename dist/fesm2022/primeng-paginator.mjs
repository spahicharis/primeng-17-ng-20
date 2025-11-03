import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, ChangeDetectorRef, EventEmitter, booleanAttribute, numberAttribute, ContentChildren, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as i5 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i3 from 'primeng/api';
import { PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import * as i2 from 'primeng/dropdown';
import { DropdownModule } from 'primeng/dropdown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import * as i4 from 'primeng/inputnumber';
import { InputNumberModule } from 'primeng/inputnumber';
import * as i6 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';

/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
class Paginator {
    cd = inject(ChangeDetectorRef);
    config = inject(PrimeNGConfig);
    /**
     * Number of page links to display.
     * @group Props
     */
    pageLinkSize = 5;
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
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShow = true;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    dropdownAppendTo;
    /**
     * Template instance to inject into the left side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    templateLeft;
    /**
     * Template instance to inject into the right side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    templateRight;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    dropdownScrollHeight = '200px';
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate = '{currentPage} of {totalPages}';
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = true;
    /**
     * Number of total records.
     * @group Props
     */
    totalRecords = 0;
    /**
     * Data count to display per page.
     * @group Props
     */
    rows = 0;
    /**
     * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
     * @group Props
     */
    rowsPerPageOptions;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown;
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    showJumpToPageInput;
    /**
     * Template instance to inject into the jump to page dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    jumpToPageItemTemplate;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = true;
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    locale;
    /**
     * Template instance to inject into the rows per page dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    dropdownItemTemplate;
    /**
     * Zero-relative number of the first row to be displayed.
     * @group Props
     */
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorState} event - Paginator state.
     * @group Emits
     */
    onPageChange = new EventEmitter();
    templates;
    dropdownIconTemplate;
    firstPageLinkIconTemplate;
    previousPageLinkIconTemplate;
    lastPageLinkIconTemplate;
    nextPageLinkIconTemplate;
    pageLinks;
    pageItems;
    rowsPerPageItems;
    paginatorState;
    _first = 0;
    _page = 0;
    ngOnInit() {
        this.updatePaginatorState();
    }
    getAriaLabel(labelType) {
        return this.config.translation.aria ? this.config.translation.aria[labelType] : undefined;
    }
    getPageAriaLabel(value) {
        return this.config.translation.aria ? this.config.translation.aria.pageLabel.replace(/{page}/g, `${value}`) : undefined;
    }
    getLocalization(digit) {
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [i, d]));
        if (digit > 9) {
            const numbers = String(digit).split('');
            return numbers.map((number) => index.get(Number(number))).join('');
        }
        else {
            return index.get(digit);
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                case 'firstpagelinkicon':
                    this.firstPageLinkIconTemplate = item.template;
                    break;
                case 'previouspagelinkicon':
                    this.previousPageLinkIconTemplate = item.template;
                    break;
                case 'lastpagelinkicon':
                    this.lastPageLinkIconTemplate = item.template;
                    break;
                case 'nextpagelinkicon':
                    this.nextPageLinkIconTemplate = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.pageLinkSize) {
            this.updatePageLinks();
        }
    }
    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                }
                else {
                    this.rowsPerPageItems.push({ label: String(this.getLocalization(opt)), value: opt });
                }
            }
        }
    }
    isFirstPage() {
        return this.getPage() === 0;
    }
    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }
    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows);
    }
    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2)), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    }
    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
        if (this.showJumpToPageDropdown) {
            this.pageItems = [];
            for (let i = 0; i < this.getPageCount(); i++) {
                this.pageItems.push({ label: String(i + 1), value: i });
            }
        }
    }
    changePage(p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }
    updateFirst() {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }
    getPage() {
        return Math.floor(this.first / this.rows);
    }
    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    }
    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }
    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }
    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    }
    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }
    onRppChange(event) {
        this.changePage(this.getPage());
    }
    onPageDropdownChange(event) {
        this.changePage(event.value);
    }
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
    empty() {
        return this.getPageCount() === 0;
    }
    currentPage() {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }
    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace('{currentPage}', String(this.currentPage()))
            .replace('{totalPages}', String(this.getPageCount()))
            .replace('{first}', String(this.totalRecords > 0 ? this._first + 1 : 0))
            .replace('{last}', String(Math.min(this._first + this.rows, this.totalRecords)))
            .replace('{rows}', String(this.rows))
            .replace('{totalRecords}', String(this.totalRecords));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Paginator, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: Paginator, isStandalone: false, selector: "p-paginator", inputs: { pageLinkSize: ["pageLinkSize", "pageLinkSize", numberAttribute], style: "style", styleClass: "styleClass", alwaysShow: ["alwaysShow", "alwaysShow", booleanAttribute], dropdownAppendTo: "dropdownAppendTo", templateLeft: "templateLeft", templateRight: "templateRight", appendTo: "appendTo", dropdownScrollHeight: "dropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: ["showCurrentPageReport", "showCurrentPageReport", booleanAttribute], showFirstLastIcon: ["showFirstLastIcon", "showFirstLastIcon", booleanAttribute], totalRecords: ["totalRecords", "totalRecords", numberAttribute], rows: ["rows", "rows", numberAttribute], rowsPerPageOptions: "rowsPerPageOptions", showJumpToPageDropdown: ["showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute], showJumpToPageInput: ["showJumpToPageInput", "showJumpToPageInput", booleanAttribute], jumpToPageItemTemplate: "jumpToPageItemTemplate", showPageLinks: ["showPageLinks", "showPageLinks", booleanAttribute], locale: "locale", dropdownItemTemplate: "dropdownItemTemplate", first: "first" }, outputs: { onPageChange: "onPageChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], usesOnChanges: true, ngImport: i0, template: `
        @if (alwaysShow ? true : pageLinks && pageLinks.length > 1) {
          <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" [attr.data-pc-section]="'paginator'" [attr.data-pc-section]="'root'">
            @if (templateLeft) {
              <div class="p-paginator-left-content" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
              </div>
            }
            @if (showCurrentPageReport) {
              <span class="p-paginator-current">{{ currentPageReport }}</span>
            }
            @if (showFirstLastIcon) {
              <button
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToFirst($event)"
                pRipple
                class="p-paginator-first p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('firstPageLabel')"
                >
                @if (!firstPageLinkIconTemplate) {
                  <AngleDoubleLeftIcon [styleClass]="'p-paginator-icon'" />
                }
                @if (firstPageLinkIconTemplate) {
                  <span class="p-paginator-icon">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                  </span>
                }
              </button>
            }
            <button
              type="button"
              [disabled]="isFirstPage() || empty()"
              (click)="changePageToPrev($event)"
              pRipple
              class="p-paginator-prev p-paginator-element p-link"
              [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
              [attr.aria-label]="getAriaLabel('prevPageLabel')"
              >
              @if (!previousPageLinkIconTemplate) {
                <AngleLeftIcon [styleClass]="'p-paginator-icon'" />
              }
              @if (previousPageLinkIconTemplate) {
                <span class="p-paginator-icon">
                  <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
              }
            </button>
            @if (showPageLinks) {
              <span class="p-paginator-pages">
                @for (pageLink of pageLinks; track pageLink) {
                  <button
                    type="button"
                    class="p-paginator-page p-paginator-element p-link"
                    [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }"
                    [attr.aria-label]="getPageAriaLabel(pageLink)"
                    [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                    (click)="onPageLinkClick($event, pageLink - 1)"
                    pRipple
                    >
                    {{ getLocalization(pageLink) }}
                  </button>
                }
              </span>
            }
            @if (showJumpToPageDropdown) {
              <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
                @if (jumpToPageItemTemplate) {
                  <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }"> </ng-container>
                  </ng-template>
                }
                @if (dropdownIconTemplate) {
                  <ng-template pTemplate="dropdownicon">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                  </ng-template>
                }
              </p-dropdown>
            }
            <button
              type="button"
              [disabled]="isLastPage() || empty()"
              (click)="changePageToNext($event)"
              pRipple
              class="p-paginator-next p-paginator-element p-link"
              [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
              [attr.aria-label]="getAriaLabel('nextPageLabel')"
              >
              @if (!nextPageLinkIconTemplate) {
                <AngleRightIcon [styleClass]="'p-paginator-icon'" />
              }
              @if (nextPageLinkIconTemplate) {
                <span class="p-paginator-icon">
                  <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
              }
            </button>
            @if (showFirstLastIcon) {
              <button
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToLast($event)"
                pRipple
                class="p-paginator-last p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('lastPageLabel')"
                >
                @if (!lastPageLinkIconTemplate) {
                  <AngleDoubleRightIcon [styleClass]="'p-paginator-icon'" />
                }
                @if (lastPageLinkIconTemplate) {
                  <span class="p-paginator-icon">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                  </span>
                }
              </button>
            }
            @if (showJumpToPageInput) {
              <p-inputNumber [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            }
            @if (rowsPerPageOptions) {
              <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
                >
                @if (dropdownItemTemplate) {
                  <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                  </ng-template>
                }
                @if (dropdownIconTemplate) {
                  <ng-template pTemplate="dropdownicon">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                  </ng-template>
                }
              </p-dropdown>
            }
            @if (templateRight) {
              <div class="p-paginator-right-content" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
              </div>
            }
          </div>
        }
        `, isInline: true, styles: ["@layer primeng{.p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i2.Dropdown), selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "loadingIcon", "filterPlaceholder", "filterLocale", "variant", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "checkmark", "dropdownIcon", "loading", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "autoShowPanelOnPrintableCharacterKeyDown", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i0.forwardRef(() => i3.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.InputNumber), selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabelledBy", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "variant", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "autofocus", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }, { kind: "directive", type: i0.forwardRef(() => i5.NgControlStatus), selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i0.forwardRef(() => i5.NgModel), selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i0.forwardRef(() => i6.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleLeftIcon), selector: "AngleDoubleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleRightIcon), selector: "AngleDoubleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleLeftIcon), selector: "AngleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: Paginator, decorators: [{
            type: Component,
            args: [{ selector: 'p-paginator', template: `
        @if (alwaysShow ? true : pageLinks && pageLinks.length > 1) {
          <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" [attr.data-pc-section]="'paginator'" [attr.data-pc-section]="'root'">
            @if (templateLeft) {
              <div class="p-paginator-left-content" [attr.data-pc-section]="'start'">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
              </div>
            }
            @if (showCurrentPageReport) {
              <span class="p-paginator-current">{{ currentPageReport }}</span>
            }
            @if (showFirstLastIcon) {
              <button
                type="button"
                [disabled]="isFirstPage() || empty()"
                (click)="changePageToFirst($event)"
                pRipple
                class="p-paginator-first p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
                [attr.aria-label]="getAriaLabel('firstPageLabel')"
                >
                @if (!firstPageLinkIconTemplate) {
                  <AngleDoubleLeftIcon [styleClass]="'p-paginator-icon'" />
                }
                @if (firstPageLinkIconTemplate) {
                  <span class="p-paginator-icon">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                  </span>
                }
              </button>
            }
            <button
              type="button"
              [disabled]="isFirstPage() || empty()"
              (click)="changePageToPrev($event)"
              pRipple
              class="p-paginator-prev p-paginator-element p-link"
              [ngClass]="{ 'p-disabled': isFirstPage() || empty() }"
              [attr.aria-label]="getAriaLabel('prevPageLabel')"
              >
              @if (!previousPageLinkIconTemplate) {
                <AngleLeftIcon [styleClass]="'p-paginator-icon'" />
              }
              @if (previousPageLinkIconTemplate) {
                <span class="p-paginator-icon">
                  <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
              }
            </button>
            @if (showPageLinks) {
              <span class="p-paginator-pages">
                @for (pageLink of pageLinks; track pageLink) {
                  <button
                    type="button"
                    class="p-paginator-page p-paginator-element p-link"
                    [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }"
                    [attr.aria-label]="getPageAriaLabel(pageLink)"
                    [attr.aria-current]="pageLink - 1 == getPage() ? 'page' : undefined"
                    (click)="onPageLinkClick($event, pageLink - 1)"
                    pRipple
                    >
                    {{ getLocalization(pageLink) }}
                  </button>
                }
              </span>
            }
            @if (showJumpToPageDropdown) {
              <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
                @if (jumpToPageItemTemplate) {
                  <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="jumpToPageItemTemplate; context: { $implicit: item }"> </ng-container>
                  </ng-template>
                }
                @if (dropdownIconTemplate) {
                  <ng-template pTemplate="dropdownicon">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                  </ng-template>
                }
              </p-dropdown>
            }
            <button
              type="button"
              [disabled]="isLastPage() || empty()"
              (click)="changePageToNext($event)"
              pRipple
              class="p-paginator-next p-paginator-element p-link"
              [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
              [attr.aria-label]="getAriaLabel('nextPageLabel')"
              >
              @if (!nextPageLinkIconTemplate) {
                <AngleRightIcon [styleClass]="'p-paginator-icon'" />
              }
              @if (nextPageLinkIconTemplate) {
                <span class="p-paginator-icon">
                  <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
              }
            </button>
            @if (showFirstLastIcon) {
              <button
                type="button"
                [disabled]="isLastPage() || empty()"
                (click)="changePageToLast($event)"
                pRipple
                class="p-paginator-last p-paginator-element p-link"
                [ngClass]="{ 'p-disabled': isLastPage() || empty() }"
                [attr.aria-label]="getAriaLabel('lastPageLabel')"
                >
                @if (!lastPageLinkIconTemplate) {
                  <AngleDoubleRightIcon [styleClass]="'p-paginator-icon'" />
                }
                @if (lastPageLinkIconTemplate) {
                  <span class="p-paginator-icon">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                  </span>
                }
              </button>
            }
            @if (showJumpToPageInput) {
              <p-inputNumber [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            }
            @if (rowsPerPageOptions) {
              <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
                >
                @if (dropdownItemTemplate) {
                  <ng-template let-item pTemplate="item">
                    <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                  </ng-template>
                }
                @if (dropdownIconTemplate) {
                  <ng-template pTemplate="dropdownicon">
                    <ng-container *ngTemplateOutlet="dropdownIconTemplate"></ng-container>
                  </ng-template>
                }
              </p-dropdown>
            }
            @if (templateRight) {
              <div class="p-paginator-right-content" [attr.data-pc-section]="'end'">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
              </div>
            }
          </div>
        }
        `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, standalone: false, styles: ["@layer primeng{.p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}}\n"] }]
        }], propDecorators: { pageLinkSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], alwaysShow: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropdownAppendTo: [{
                type: Input
            }], templateLeft: [{
                type: Input
            }], templateRight: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showFirstLastIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], totalRecords: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rows: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rowsPerPageOptions: [{
                type: Input
            }], showJumpToPageDropdown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showJumpToPageInput: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], jumpToPageItemTemplate: [{
                type: Input
            }], showPageLinks: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], locale: [{
                type: Input
            }], dropdownItemTemplate: [{
                type: Input
            }], first: [{
                type: Input
            }], onPageChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class PaginatorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: PaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: PaginatorModule, declarations: [Paginator], imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon], exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: PaginatorModule, imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: PaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
                    exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule],
                    declarations: [Paginator]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { Paginator, PaginatorModule };
//# sourceMappingURL=primeng-paginator.mjs.map
