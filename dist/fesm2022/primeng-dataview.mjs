import * as i0 from '@angular/core';
import { inject, ElementRef, ChangeDetectorRef, EventEmitter, numberAttribute, booleanAttribute, ContentChildren, ContentChild, Output, Input, ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { FilterService, PrimeNGConfig, TranslationKeys, Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import * as i2 from 'primeng/paginator';
import { PaginatorModule } from 'primeng/paginator';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { ThLargeIcon } from 'primeng/icons/thlarge';
import { BarsIcon } from 'primeng/icons/bars';

/**
 * DataView displays data in grid or list layout with pagination and sorting features.
 * @group Components
 */
class DataView {
    el = inject(ElementRef);
    cd = inject(ChangeDetectorRef);
    filterService = inject(FilterService);
    config = inject(PrimeNGConfig);
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator;
    /**
     * Number of rows to display per page.
     * @group Props
     */
    rows;
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    totalRecords;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    pageLinks = 5;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    rowsPerPageOptions;
    /**
     * Position of the paginator.
     * @group Props
     */
    paginatorPosition = 'bottom';
    /**
     * Custom style class for paginator
     * @group Props
     */
    paginatorStyleClass;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShowPaginator = true;
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    paginatorDropdownAppendTo;
    /**
     * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    paginatorDropdownScrollHeight = '200px';
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
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = true;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = true;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    lazyLoadOnInit = true;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = '';
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
     * Style class of the grid.
     * @group Props
     */
    gridStyleClass = '';
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    trackBy = (index, item) => item;
    /**
     * Comma separated list of fields in the object graph to search against.
     * @group Props
     */
    filterBy;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon;
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    first = 0;
    /**
     * Property name of data to use in sorting by default.
     * @group Props
     */
    sortField;
    /**
     * Order to sort the data by default.
     * @group Props
     */
    sortOrder;
    /**
     * An array of objects to display.
     * @group Props
     */
    value;
    /**
     * Defines the layout mode.
     * @group Props
     */
    get layout() {
        return this._layout;
    }
    set layout(layout) {
        this._layout = layout;
        if (this.initialized) {
            this.changeLayout(layout);
        }
    }
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {DataViewLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke when pagination occurs.
     * @param {DataViewPageEvent} event - Custom page event.
     * @group Emits
     */
    onPage = new EventEmitter();
    /**
     * Callback to invoke when sorting occurs.
     * @param {DataViewSortEvent} event - Custom sort event.
     * @group Emits
     */
    onSort = new EventEmitter();
    /**
     * Callback to invoke when changing layout.
     * @param {DataViewLayoutChangeEvent} event - Custom layout change event.
     * @group Emits
     */
    onChangeLayout = new EventEmitter();
    header;
    footer;
    templates;
    _value;
    listTemplate;
    gridTemplate;
    itemTemplate;
    headerTemplate;
    emptyMessageTemplate;
    footerTemplate;
    paginatorLeftTemplate;
    paginatorRightTemplate;
    paginatorDropdownItemTemplate;
    loadingIconTemplate;
    listIconTemplate;
    gridIconTemplate;
    filteredValue;
    filterValue;
    initialized;
    _layout = 'list';
    translationSubscription;
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
        this.initialized = true;
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.value) {
            this._value = simpleChanges.value.currentValue;
            this.updateTotalRecords();
            if (!this.lazy && this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        if (simpleChanges.sortField || simpleChanges.sortOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'listItem':
                case 'list':
                    this.listTemplate = item.template;
                    break;
                case 'gridItem':
                case 'grid':
                    this.gridTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'listicon':
                    this.listIconTemplate = item.template;
                    break;
                case 'gridicon':
                    this.gridIconTemplate = item.template;
                    break;
            }
        });
        this.updateItemTemplate();
    }
    updateItemTemplate() {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listTemplate;
                break;
            case 'grid':
                this.itemTemplate = this.gridTemplate;
                break;
        }
    }
    changeLayout(layout) {
        this._layout = layout;
        this.onChangeLayout.emit({
            layout: this.layout
        });
        this.updateItemTemplate();
        this.cd.markForCheck();
    }
    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : this._value ? this._value.length : 0;
    }
    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }
    sort() {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort((data1, data2) => {
                let value1 = ObjectUtils.resolveFieldData(data1, this.sortField);
                let value2 = ObjectUtils.resolveFieldData(data2, this.sortField);
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2);
                else
                    result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                return this.sortOrder * result;
            });
            if (this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    }
    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder
        };
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    filter(filter, filterMatchMode = 'contains') {
        this.filterValue = filter;
        if (this.value && this.value.length) {
            let searchFields = this.filterBy.split(',');
            this.filteredValue = this.filterService.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
            this.cd.markForCheck();
        }
    }
    hasFilter() {
        return this.filterValue && this.filterValue.trim().length > 0;
    }
    ngOnDestroy() {
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataView, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: DataView, isStandalone: false, selector: "p-dataView", inputs: { paginator: ["paginator", "paginator", booleanAttribute], rows: ["rows", "rows", numberAttribute], totalRecords: ["totalRecords", "totalRecords", numberAttribute], pageLinks: ["pageLinks", "pageLinks", numberAttribute], rowsPerPageOptions: "rowsPerPageOptions", paginatorPosition: "paginatorPosition", paginatorStyleClass: "paginatorStyleClass", alwaysShowPaginator: ["alwaysShowPaginator", "alwaysShowPaginator", booleanAttribute], paginatorDropdownAppendTo: "paginatorDropdownAppendTo", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: ["showCurrentPageReport", "showCurrentPageReport", booleanAttribute], showJumpToPageDropdown: ["showJumpToPageDropdown", "showJumpToPageDropdown", booleanAttribute], showFirstLastIcon: ["showFirstLastIcon", "showFirstLastIcon", booleanAttribute], showPageLinks: ["showPageLinks", "showPageLinks", booleanAttribute], lazy: ["lazy", "lazy", booleanAttribute], lazyLoadOnInit: ["lazyLoadOnInit", "lazyLoadOnInit", booleanAttribute], emptyMessage: "emptyMessage", style: "style", styleClass: "styleClass", gridStyleClass: "gridStyleClass", trackBy: "trackBy", filterBy: "filterBy", filterLocale: "filterLocale", loading: ["loading", "loading", booleanAttribute], loadingIcon: "loadingIcon", first: ["first", "first", numberAttribute], sortField: "sortField", sortOrder: ["sortOrder", "sortOrder", numberAttribute], value: "value", layout: "layout" }, outputs: { onLazyLoad: "onLazyLoad", onPage: "onPage", onSort: "onSort", onChangeLayout: "onChangeLayout" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "header", first: true, predicate: Header, descendants: true }, { propertyName: "footer", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], usesOnChanges: true, ngImport: i0, template: `
        <div [ngClass]="{ 'p-dataview p-component': true, 'p-dataview-list': layout === 'list', 'p-dataview-grid': layout === 'grid' }" [ngStyle]="style" [class]="styleClass">
          @if (loading) {
            <div class="p-dataview-loading">
              <div class="p-dataview-loading-overlay p-component-overlay">
                @if (loadingIcon) {
                  <i [class]="'p-dataview-loading-icon pi-spin ' + loadingIcon"></i>
                }
                @if (!loadingIcon) {
                  @if (!loadingIconTemplate) {
                    <SpinnerIcon [spin]="true" [styleClass]="'p-dataview-loading-icon'" />
                  }
                  <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                }
              </div>
            </div>
          }
          @if (header || headerTemplate) {
            <div class="p-dataview-header">
              <ng-content select="p-header"></ng-content>
              <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
          }
          @if (paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')) {
            <p-paginator
              [rows]="rows"
              [first]="first"
              [totalRecords]="totalRecords"
              [pageLinkSize]="pageLinks"
              [alwaysShow]="alwaysShowPaginator"
              (onPageChange)="paginate($event)"
              styleClass="p-paginator-top"
              [rowsPerPageOptions]="rowsPerPageOptions"
              [dropdownAppendTo]="paginatorDropdownAppendTo"
              [dropdownScrollHeight]="paginatorDropdownScrollHeight"
              [templateLeft]="paginatorLeftTemplate"
              [templateRight]="paginatorRightTemplate"
              [currentPageReportTemplate]="currentPageReportTemplate"
              [showFirstLastIcon]="showFirstLastIcon"
              [dropdownItemTemplate]="paginatorDropdownItemTemplate"
              [showCurrentPageReport]="showCurrentPageReport"
              [showJumpToPageDropdown]="showJumpToPageDropdown"
              [showPageLinks]="showPageLinks"
              [styleClass]="paginatorStyleClass"
            ></p-paginator>
          }
        
          <div class="p-dataview-content">
            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value }"></ng-container>
        
            @if (isEmpty() && !loading) {
              <div>
                <div class="p-dataview-emptymessage">
                  @if (!emptyMessageTemplate) {
                    {{ emptyMessageLabel }}
                  } @else {
                    <ng-template [ngTemplateOutlet]="empty"></ng-template>
                  }
                  <ng-container #empty *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
                </div>
              </div>
            }
          </div>
          @if (paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')) {
            <p-paginator
              [rows]="rows"
              [first]="first"
              [totalRecords]="totalRecords"
              [pageLinkSize]="pageLinks"
              [alwaysShow]="alwaysShowPaginator"
              (onPageChange)="paginate($event)"
              styleClass="p-paginator-bottom"
              [rowsPerPageOptions]="rowsPerPageOptions"
              [dropdownAppendTo]="paginatorDropdownAppendTo"
              [dropdownScrollHeight]="paginatorDropdownScrollHeight"
              [templateLeft]="paginatorLeftTemplate"
              [templateRight]="paginatorRightTemplate"
              [currentPageReportTemplate]="currentPageReportTemplate"
              [showFirstLastIcon]="showFirstLastIcon"
              [dropdownItemTemplate]="paginatorDropdownItemTemplate"
              [showCurrentPageReport]="showCurrentPageReport"
              [showJumpToPageDropdown]="showJumpToPageDropdown"
              [showPageLinks]="showPageLinks"
              [styleClass]="paginatorStyleClass"
            ></p-paginator>
          }
          @if (footer || footerTemplate) {
            <div class="p-dataview-footer">
              <ng-content select="p-footer"></ng-content>
              <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
          }
        </div>
        `, isInline: true, styles: ["@layer primeng{.p-dataview{position:relative}.p-dataview .p-dataview-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i2.Paginator), selector: "p-paginator", inputs: ["pageLinkSize", "style", "styleClass", "alwaysShow", "dropdownAppendTo", "templateLeft", "templateRight", "appendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showFirstLastIcon", "totalRecords", "rows", "rowsPerPageOptions", "showJumpToPageDropdown", "showJumpToPageInput", "jumpToPageItemTemplate", "showPageLinks", "locale", "dropdownItemTemplate", "first"], outputs: ["onPageChange"] }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "pipe", type: i0.forwardRef(() => i1.SlicePipe), name: "slice" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataView, decorators: [{
            type: Component,
            args: [{ selector: 'p-dataView', template: `
        <div [ngClass]="{ 'p-dataview p-component': true, 'p-dataview-list': layout === 'list', 'p-dataview-grid': layout === 'grid' }" [ngStyle]="style" [class]="styleClass">
          @if (loading) {
            <div class="p-dataview-loading">
              <div class="p-dataview-loading-overlay p-component-overlay">
                @if (loadingIcon) {
                  <i [class]="'p-dataview-loading-icon pi-spin ' + loadingIcon"></i>
                }
                @if (!loadingIcon) {
                  @if (!loadingIconTemplate) {
                    <SpinnerIcon [spin]="true" [styleClass]="'p-dataview-loading-icon'" />
                  }
                  <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                }
              </div>
            </div>
          }
          @if (header || headerTemplate) {
            <div class="p-dataview-header">
              <ng-content select="p-header"></ng-content>
              <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
          }
          @if (paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')) {
            <p-paginator
              [rows]="rows"
              [first]="first"
              [totalRecords]="totalRecords"
              [pageLinkSize]="pageLinks"
              [alwaysShow]="alwaysShowPaginator"
              (onPageChange)="paginate($event)"
              styleClass="p-paginator-top"
              [rowsPerPageOptions]="rowsPerPageOptions"
              [dropdownAppendTo]="paginatorDropdownAppendTo"
              [dropdownScrollHeight]="paginatorDropdownScrollHeight"
              [templateLeft]="paginatorLeftTemplate"
              [templateRight]="paginatorRightTemplate"
              [currentPageReportTemplate]="currentPageReportTemplate"
              [showFirstLastIcon]="showFirstLastIcon"
              [dropdownItemTemplate]="paginatorDropdownItemTemplate"
              [showCurrentPageReport]="showCurrentPageReport"
              [showJumpToPageDropdown]="showJumpToPageDropdown"
              [showPageLinks]="showPageLinks"
              [styleClass]="paginatorStyleClass"
            ></p-paginator>
          }
        
          <div class="p-dataview-content">
            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: paginator ? (filteredValue || value | slice: (lazy ? 0 : first) : (lazy ? 0 : first) + rows) : filteredValue || value }"></ng-container>
        
            @if (isEmpty() && !loading) {
              <div>
                <div class="p-dataview-emptymessage">
                  @if (!emptyMessageTemplate) {
                    {{ emptyMessageLabel }}
                  } @else {
                    <ng-template [ngTemplateOutlet]="empty"></ng-template>
                  }
                  <ng-container #empty *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
                </div>
              </div>
            }
          </div>
          @if (paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')) {
            <p-paginator
              [rows]="rows"
              [first]="first"
              [totalRecords]="totalRecords"
              [pageLinkSize]="pageLinks"
              [alwaysShow]="alwaysShowPaginator"
              (onPageChange)="paginate($event)"
              styleClass="p-paginator-bottom"
              [rowsPerPageOptions]="rowsPerPageOptions"
              [dropdownAppendTo]="paginatorDropdownAppendTo"
              [dropdownScrollHeight]="paginatorDropdownScrollHeight"
              [templateLeft]="paginatorLeftTemplate"
              [templateRight]="paginatorRightTemplate"
              [currentPageReportTemplate]="currentPageReportTemplate"
              [showFirstLastIcon]="showFirstLastIcon"
              [dropdownItemTemplate]="paginatorDropdownItemTemplate"
              [showCurrentPageReport]="showCurrentPageReport"
              [showJumpToPageDropdown]="showJumpToPageDropdown"
              [showPageLinks]="showPageLinks"
              [styleClass]="paginatorStyleClass"
            ></p-paginator>
          }
          @if (footer || footerTemplate) {
            <div class="p-dataview-footer">
              <ng-content select="p-footer"></ng-content>
              <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
          }
        </div>
        `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, standalone: false, styles: ["@layer primeng{.p-dataview{position:relative}.p-dataview .p-dataview-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}}\n"] }]
        }], propDecorators: { paginator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rows: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], totalRecords: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], pageLinks: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rowsPerPageOptions: [{
                type: Input
            }], paginatorPosition: [{
                type: Input
            }], paginatorStyleClass: [{
                type: Input
            }], alwaysShowPaginator: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], paginatorDropdownAppendTo: [{
                type: Input
            }], paginatorDropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showJumpToPageDropdown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showFirstLastIcon: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showPageLinks: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], lazy: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], lazyLoadOnInit: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], emptyMessage: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], gridStyleClass: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], filterBy: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loadingIcon: [{
                type: Input
            }], first: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], sortField: [{
                type: Input
            }], sortOrder: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], value: [{
                type: Input
            }], layout: [{
                type: Input
            }], onLazyLoad: [{
                type: Output
            }], onPage: [{
                type: Output
            }], onSort: [{
                type: Output
            }], onChangeLayout: [{
                type: Output
            }], header: [{
                type: ContentChild,
                args: [Header]
            }], footer: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class DataViewLayoutOptions {
    dv = inject(DataView);
    style;
    styleClass;
    changeLayout(event, layout) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataViewLayoutOptions, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: DataViewLayoutOptions, isStandalone: false, selector: "p-dataViewLayoutOptions", inputs: { style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [ngClass]="'p-dataview-layout-options p-selectbutton p-buttonset'" [ngStyle]="style" [class]="styleClass">
          <button type="button" class="p-button p-button-icon-only" [ngClass]="{ 'p-highlight': dv.layout === 'list' }" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')">
            @if (!dv.listIconTemplate) {
              <BarsIcon />
            }
            <ng-template *ngTemplateOutlet="dv.listIconTemplate"></ng-template></button
            ><button type="button" class="p-button p-button-icon-only" [ngClass]="{ 'p-highlight': dv.layout === 'grid' }" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')">
            @if (!dv.gridIconTemplate) {
              <ThLargeIcon />
            }
            <ng-template *ngTemplateOutlet="dv.gridIconTemplate"></ng-template>
          </button>
        </div>
        `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => BarsIcon), selector: "BarsIcon" }, { kind: "component", type: i0.forwardRef(() => ThLargeIcon), selector: "ThLargeIcon" }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataViewLayoutOptions, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-dataViewLayoutOptions',
                    template: `
        <div [ngClass]="'p-dataview-layout-options p-selectbutton p-buttonset'" [ngStyle]="style" [class]="styleClass">
          <button type="button" class="p-button p-button-icon-only" [ngClass]="{ 'p-highlight': dv.layout === 'list' }" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')">
            @if (!dv.listIconTemplate) {
              <BarsIcon />
            }
            <ng-template *ngTemplateOutlet="dv.listIconTemplate"></ng-template></button
            ><button type="button" class="p-button p-button-icon-only" [ngClass]="{ 'p-highlight': dv.layout === 'grid' }" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')">
            @if (!dv.gridIconTemplate) {
              <ThLargeIcon />
            }
            <ng-template *ngTemplateOutlet="dv.gridIconTemplate"></ng-template>
          </button>
        </div>
        `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    },
                    standalone: false
                }]
        }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
class DataViewModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: DataViewModule, declarations: [DataView, DataViewLayoutOptions], imports: [CommonModule, SharedModule, PaginatorModule, SpinnerIcon, BarsIcon, ThLargeIcon], exports: [DataView, SharedModule, DataViewLayoutOptions] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataViewModule, imports: [CommonModule, SharedModule, PaginatorModule, SpinnerIcon, BarsIcon, ThLargeIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DataViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, PaginatorModule, SpinnerIcon, BarsIcon, ThLargeIcon],
                    exports: [DataView, SharedModule, DataViewLayoutOptions],
                    declarations: [DataView, DataViewLayoutOptions]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DataView, DataViewLayoutOptions, DataViewModule };
//# sourceMappingURL=primeng-dataview.mjs.map
