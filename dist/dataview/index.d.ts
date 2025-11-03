import * as i0 from '@angular/core';
import { TemplateRef, OnInit, AfterContentInit, OnDestroy, OnChanges, ElementRef, ChangeDetectorRef, EventEmitter, QueryList, SimpleChanges } from '@angular/core';
import * as i2 from 'primeng/api';
import { BlockableUI, FilterService, PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Nullable } from 'primeng/ts-helpers';
import * as i1 from '@angular/common';
import * as i3 from 'primeng/paginator';
import * as i4 from 'primeng/icons/spinner';
import * as i5 from 'primeng/icons/bars';
import * as i6 from 'primeng/icons/thlarge';

/**
 * State of the paginator.
 * @group Interface
 */
interface DataViewPaginatorState {
    /**
     * Current page.
     */
    page?: number;
    /**
     * First item in the current page.
     */
    first?: number;
    /**
     * Row count.
     */
    rows?: number;
    /**
     * Page count.
     */
    pageCount?: number;
}
/**
 * Custom lazy load event.
 * @see {@link DataView.onLazyLoad}
 * @group Events
 */
interface DataViewLazyLoadEvent {
    /**
     * Index of the first element.
     */
    first: number;
    /**
     * Row count.
     */
    rows: number;
    /**
     * Property name of data to use in sorting by default.
     */
    sortField: string;
    /**
     * Order to sort the data by default.
     */
    sortOrder: number;
}
/**
 * Custom page event.
 * @see {@link DataView.onPage}
 * @group Events
 */
interface DataViewPageEvent {
    /**
     * Index of the first element.
     */
    first: number;
    /**
     * Row count.
     */
    rows: number;
}
/**
 * Custom sort event.
 * @see {@link DataView.onSort}
 * @group Events
 */
interface DataViewSortEvent {
    /**
     * Sort field.
     */
    sortField: string;
    /**
     * Sort order.
     */
    sortOrder: number;
}
/**
 * Custom layout change.
 * @see {@link DataView.onChangeLayout}
 * @group Events
 */
interface DataViewLayoutChangeEvent {
    /**
     * Layout of the component.
     */
    layout: 'list' | 'grid';
}
/**
 * Defines valid templates in DataView.
 * @group Templates
 */
interface DataViewTemplates {
    /**
     * Custom list item template.
     * @param {Object} context - data of the item.
     */
    listItem(context: {
        /**
         * Row data.
         */
        $implicit: any;
        /**
         * Row index.
         */
        rowIndex: number;
    }): TemplateRef<{
        $implicit: any;
        rowIndex: number;
    }>;
    /**
     * Custom grid item template.
     * @param {Object} context - data of the item.
     */
    gridItem(context: {
        /**
         * Row data.
         */
        $implicit: any;
        /**
         * Row index.
         */
        rowIndex: number;
    }): TemplateRef<{
        $implicit: any;
        rowIndex: number;
    }>;
    /**
     * Custom paginator left template.
     * @param {Object} context - paginator state.
     */
    paginatorleft(context: {
        /**
         * State of the paginator.
         */
        $implicit: DataViewPaginatorState;
    }): TemplateRef<DataViewPaginatorState>;
    /**
     * Custom paginator right template.
     * @param {Object} context - paginator state.
     */
    paginatorright(context: {
        /**
         * State of the paginator.
         */
        $implicit: DataViewPaginatorState;
    }): TemplateRef<DataViewPaginatorState>;
    /**
     * Custom paginator dropdown template.
     * @param {Object} context - dropdown item.
     */
    paginatordropdownitem(context: {
        /**
         * Dropdown item instance.
         */
        $implicit: any;
    }): TemplateRef<{
        $implicit: any;
    }>;
    /**
     * Custom empty message template.
     */
    empty(): TemplateRef<any>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom loading icon template.
     */
    loadingicon(): TemplateRef<any>;
    /**
     * Custom list icon template.
     */
    listicon(): TemplateRef<any>;
    /**
     * Custom grid icon template.
     */
    gridicon(): TemplateRef<any>;
}

/**
 * DataView displays data in grid or list layout with pagination and sorting features.
 * @group Components
 */
declare class DataView implements OnInit, AfterContentInit, OnDestroy, BlockableUI, OnChanges {
    el: ElementRef<any>;
    cd: ChangeDetectorRef;
    filterService: FilterService;
    config: PrimeNGConfig;
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator: boolean | undefined;
    /**
     * Number of rows to display per page.
     * @group Props
     */
    rows: number | undefined;
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    totalRecords: number | undefined;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    pageLinks: number;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    rowsPerPageOptions: number[] | any[] | undefined;
    /**
     * Position of the paginator.
     * @group Props
     */
    paginatorPosition: 'top' | 'bottom' | 'both';
    /**
     * Custom style class for paginator
     * @group Props
     */
    paginatorStyleClass: string | undefined;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShowPaginator: boolean;
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    paginatorDropdownAppendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    paginatorDropdownScrollHeight: string;
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate: string;
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport: boolean | undefined;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown: boolean | undefined;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon: boolean;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks: boolean;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy: boolean | undefined;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    lazyLoadOnInit: boolean;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage: string;
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
    /**
     * Style class of the grid.
     * @group Props
     */
    gridStyleClass: string;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    trackBy: Function;
    /**
     * Comma separated list of fields in the object graph to search against.
     * @group Props
     */
    filterBy: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale: string | undefined;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading: boolean | undefined;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon: string | undefined;
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    first: number | undefined;
    /**
     * Property name of data to use in sorting by default.
     * @group Props
     */
    sortField: string | undefined;
    /**
     * Order to sort the data by default.
     * @group Props
     */
    sortOrder: number | undefined;
    /**
     * An array of objects to display.
     * @group Props
     */
    value: any[] | undefined;
    /**
     * Defines the layout mode.
     * @group Props
     */
    get layout(): 'list' | 'grid';
    set layout(layout: 'list' | 'grid');
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {DataViewLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad: EventEmitter<DataViewLazyLoadEvent>;
    /**
     * Callback to invoke when pagination occurs.
     * @param {DataViewPageEvent} event - Custom page event.
     * @group Emits
     */
    onPage: EventEmitter<DataViewPageEvent>;
    /**
     * Callback to invoke when sorting occurs.
     * @param {DataViewSortEvent} event - Custom sort event.
     * @group Emits
     */
    onSort: EventEmitter<DataViewSortEvent>;
    /**
     * Callback to invoke when changing layout.
     * @param {DataViewLayoutChangeEvent} event - Custom layout change event.
     * @group Emits
     */
    onChangeLayout: EventEmitter<DataViewLayoutChangeEvent>;
    header: any;
    footer: any;
    templates: Nullable<QueryList<PrimeTemplate>>;
    _value: Nullable<any[]>;
    listTemplate: Nullable<TemplateRef<any>>;
    gridTemplate: Nullable<TemplateRef<any>>;
    itemTemplate: Nullable<TemplateRef<any>>;
    headerTemplate: Nullable<TemplateRef<any>>;
    emptyMessageTemplate: Nullable<TemplateRef<any>>;
    footerTemplate: Nullable<TemplateRef<any>>;
    paginatorLeftTemplate: Nullable<TemplateRef<any>>;
    paginatorRightTemplate: Nullable<TemplateRef<any>>;
    paginatorDropdownItemTemplate: Nullable<TemplateRef<any>>;
    loadingIconTemplate: Nullable<TemplateRef<any>>;
    listIconTemplate: Nullable<TemplateRef<any>>;
    gridIconTemplate: Nullable<TemplateRef<any>>;
    filteredValue: Nullable<any[]>;
    filterValue: Nullable<string>;
    initialized: Nullable<boolean>;
    _layout: 'list' | 'grid';
    translationSubscription: Nullable<Subscription>;
    get emptyMessageLabel(): string;
    ngOnInit(): void;
    ngOnChanges(simpleChanges: SimpleChanges): void;
    ngAfterContentInit(): void;
    updateItemTemplate(): void;
    changeLayout(layout: 'list' | 'grid'): void;
    updateTotalRecords(): void;
    paginate(event: DataViewPaginatorState): void;
    sort(): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): DataViewLazyLoadEvent;
    getBlockableElement(): HTMLElement;
    filter(filter: string, filterMatchMode?: string): void;
    hasFilter(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataView, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataView, "p-dataView", never, { "paginator": { "alias": "paginator"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "totalRecords": { "alias": "totalRecords"; "required": false; }; "pageLinks": { "alias": "pageLinks"; "required": false; }; "rowsPerPageOptions": { "alias": "rowsPerPageOptions"; "required": false; }; "paginatorPosition": { "alias": "paginatorPosition"; "required": false; }; "paginatorStyleClass": { "alias": "paginatorStyleClass"; "required": false; }; "alwaysShowPaginator": { "alias": "alwaysShowPaginator"; "required": false; }; "paginatorDropdownAppendTo": { "alias": "paginatorDropdownAppendTo"; "required": false; }; "paginatorDropdownScrollHeight": { "alias": "paginatorDropdownScrollHeight"; "required": false; }; "currentPageReportTemplate": { "alias": "currentPageReportTemplate"; "required": false; }; "showCurrentPageReport": { "alias": "showCurrentPageReport"; "required": false; }; "showJumpToPageDropdown": { "alias": "showJumpToPageDropdown"; "required": false; }; "showFirstLastIcon": { "alias": "showFirstLastIcon"; "required": false; }; "showPageLinks": { "alias": "showPageLinks"; "required": false; }; "lazy": { "alias": "lazy"; "required": false; }; "lazyLoadOnInit": { "alias": "lazyLoadOnInit"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "gridStyleClass": { "alias": "gridStyleClass"; "required": false; }; "trackBy": { "alias": "trackBy"; "required": false; }; "filterBy": { "alias": "filterBy"; "required": false; }; "filterLocale": { "alias": "filterLocale"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "loadingIcon": { "alias": "loadingIcon"; "required": false; }; "first": { "alias": "first"; "required": false; }; "sortField": { "alias": "sortField"; "required": false; }; "sortOrder": { "alias": "sortOrder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; }, { "onLazyLoad": "onLazyLoad"; "onPage": "onPage"; "onSort": "onSort"; "onChangeLayout": "onChangeLayout"; }, ["header", "footer", "templates"], ["p-header", "p-footer"], false, never>;
    static ngAcceptInputType_paginator: unknown;
    static ngAcceptInputType_rows: unknown;
    static ngAcceptInputType_totalRecords: unknown;
    static ngAcceptInputType_pageLinks: unknown;
    static ngAcceptInputType_alwaysShowPaginator: unknown;
    static ngAcceptInputType_showCurrentPageReport: unknown;
    static ngAcceptInputType_showJumpToPageDropdown: unknown;
    static ngAcceptInputType_showFirstLastIcon: unknown;
    static ngAcceptInputType_showPageLinks: unknown;
    static ngAcceptInputType_lazy: unknown;
    static ngAcceptInputType_lazyLoadOnInit: unknown;
    static ngAcceptInputType_loading: unknown;
    static ngAcceptInputType_first: unknown;
    static ngAcceptInputType_sortOrder: unknown;
}
declare class DataViewLayoutOptions {
    dv: DataView;
    style: {
        [klass: string]: any;
    } | null | undefined;
    styleClass: string | undefined;
    changeLayout(event: Event, layout: 'list' | 'grid'): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataViewLayoutOptions, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DataViewLayoutOptions, "p-dataViewLayoutOptions", never, { "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; }, {}, never, never, false, never>;
}
declare class DataViewModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DataViewModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DataViewModule, [typeof DataView, typeof DataViewLayoutOptions], [typeof i1.CommonModule, typeof i2.SharedModule, typeof i3.PaginatorModule, typeof i4.SpinnerIcon, typeof i5.BarsIcon, typeof i6.ThLargeIcon], [typeof DataView, typeof i2.SharedModule, typeof DataViewLayoutOptions]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DataViewModule>;
}

export { DataView, DataViewLayoutOptions, DataViewModule };
export type { DataViewLayoutChangeEvent, DataViewLazyLoadEvent, DataViewPageEvent, DataViewPaginatorState, DataViewSortEvent, DataViewTemplates };
