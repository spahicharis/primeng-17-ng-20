import * as rxjs from 'rxjs';
import { Subscription } from 'rxjs';
import * as i0 from '@angular/core';
import { TemplateRef, OnDestroy, ChangeDetectorRef, AfterContentInit, ElementRef, EventEmitter, QueryList } from '@angular/core';
import * as i4 from 'primeng/api';
import { TreeNode, PrimeTemplate } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import * as i1 from '@angular/common';
import * as i2 from 'primeng/icons/chevrondown';
import * as i3 from 'primeng/icons/chevronup';

/**
 * Custom node select event.
 * @see {@link OrganizationChart.onNodeSelect}
 * @group Events
 */
interface OrganizationChartNodeSelectEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Node instance.
     */
    node: TreeNode;
}
/**
 * Custom node unselect event.
 * @see {@link OrganizationChart.onNodeUnSelect}
 * @extends {OrganizationChartNodeSelectEvent}
 * @group Events
 */
interface OrganizationChartNodeUnSelectEvent extends OrganizationChartNodeSelectEvent {
}
/**
 * Custom node expand event.
 * @see {@link OrganizationChart.onNodeExpand}
 * @extends {OrganizationChartNodeSelectEvent}
 * @group Events
 */
interface OrganizationChartNodeExpandEvent extends OrganizationChartNodeSelectEvent {
}
/**
 * Custom node collapse event.
 * @see {@link OrganizationChart.onNodeCollapse}
 * @extends {OrganizationChartNodeSelectEvent}
 * @group Events
 */
interface OrganizationChartNodeCollapseEvent extends OrganizationChartNodeSelectEvent {
}
/**
 * Defines valid templates in OrganizationChart.
 * @group Templates
 */
interface OrganizationChartTemplates {
    /**
     * Custom toggler icon template.
     * @param {Object} context - item data.
     */
    togglericon(context: {
        /**
         * Expanded state of the node.
         */
        $implicit: boolean;
    }): TemplateRef<{
        $implicit: boolean;
    }>;
}

declare class OrganizationChartNode implements OnDestroy {
    cd: ChangeDetectorRef;
    node: TreeNode<any> | undefined;
    root: boolean | undefined;
    first: boolean | undefined;
    last: boolean | undefined;
    collapsible: boolean | undefined;
    chart: OrganizationChart;
    subscription: Subscription;
    constructor();
    get leaf(): boolean | undefined;
    get colspan(): number;
    onNodeClick(event: Event, node: TreeNode): void;
    toggleNode(event: Event, node: TreeNode): void;
    isSelected(): boolean;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationChartNode, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrganizationChartNode, "[pOrganizationChartNode]", never, { "node": { "alias": "node"; "required": false; }; "root": { "alias": "root"; "required": false; }; "first": { "alias": "first"; "required": false; }; "last": { "alias": "last"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; }, {}, never, never, false, never>;
    static ngAcceptInputType_root: unknown;
    static ngAcceptInputType_first: unknown;
    static ngAcceptInputType_last: unknown;
    static ngAcceptInputType_collapsible: unknown;
}
/**
 * OrganizationChart visualizes hierarchical organization data.
 * @group Components
 */
declare class OrganizationChart implements AfterContentInit {
    el: ElementRef<any>;
    cd: ChangeDetectorRef;
    /**
     * An array of nested TreeNodes.
     * @group Props
     */
    value: TreeNode[] | undefined;
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
     * Defines the selection mode.
     * @group Props
     */
    selectionMode: 'single' | 'multiple' | null | undefined;
    /**
     * Whether the nodes can be expanded or toggled.
     * @group Props
     */
    collapsible: boolean | undefined;
    /**
     * Whether the space allocated by a node is preserved when hidden.
     * @group Props
     */
    preserveSpace: boolean;
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    get selection(): any;
    set selection(val: any);
    /**
     * Callback to invoke on selection change.
     * @param {*} any - selected value.
     * @group Emits
     */
    selectionChange: EventEmitter<any>;
    /**
     * Callback to invoke when a node is selected.
     * @param {OrganizationChartNodeSelectEvent} event - custom node select event.
     * @group Emits
     */
    onNodeSelect: EventEmitter<OrganizationChartNodeSelectEvent>;
    /**
     * Callback to invoke when a node is unselected.
     * @param {OrganizationChartNodeUnSelectEvent} event - custom node unselect event.
     * @group Emits
     */
    onNodeUnselect: EventEmitter<OrganizationChartNodeUnSelectEvent>;
    /**
     * Callback to invoke when a node is expanded.
     * @param {OrganizationChartNodeExpandEvent} event - custom node expand event.
     * @group Emits
     */
    onNodeExpand: EventEmitter<OrganizationChartNodeExpandEvent>;
    /**
     * Callback to invoke when a node is collapsed.
     * @param {OrganizationChartNodeCollapseEvent} event - custom node collapse event.
     * @group Emits
     */
    onNodeCollapse: EventEmitter<OrganizationChartNodeCollapseEvent>;
    templates: Nullable<QueryList<PrimeTemplate>>;
    templateMap: any;
    togglerIconTemplate: Nullable<TemplateRef<any>>;
    private selectionSource;
    _selection: any;
    initialized: Nullable<boolean>;
    selectionSource$: rxjs.Observable<any>;
    get root(): TreeNode<any> | null;
    ngAfterContentInit(): void;
    getTemplateForNode(node: TreeNode): TemplateRef<any> | null;
    onNodeClick(event: Event, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    isSelected(node: TreeNode): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationChart, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrganizationChart, "p-organizationChart", never, { "value": { "alias": "value"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "selectionMode": { "alias": "selectionMode"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; "preserveSpace": { "alias": "preserveSpace"; "required": false; }; "selection": { "alias": "selection"; "required": false; }; }, { "selectionChange": "selectionChange"; "onNodeSelect": "onNodeSelect"; "onNodeUnselect": "onNodeUnselect"; "onNodeExpand": "onNodeExpand"; "onNodeCollapse": "onNodeCollapse"; }, ["templates"], never, false, never>;
    static ngAcceptInputType_collapsible: unknown;
    static ngAcceptInputType_preserveSpace: unknown;
}
declare class OrganizationChartModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OrganizationChartModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OrganizationChartModule, [typeof OrganizationChart, typeof OrganizationChartNode], [typeof i1.CommonModule, typeof i2.ChevronDownIcon, typeof i3.ChevronUpIcon, typeof i4.SharedModule], [typeof OrganizationChart, typeof i4.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OrganizationChartModule>;
}

export { OrganizationChart, OrganizationChartModule, OrganizationChartNode };
export type { OrganizationChartNodeCollapseEvent, OrganizationChartNodeExpandEvent, OrganizationChartNodeSelectEvent, OrganizationChartNodeUnSelectEvent, OrganizationChartTemplates };
