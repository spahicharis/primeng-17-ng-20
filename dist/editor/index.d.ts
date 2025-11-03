import * as i0 from '@angular/core';
import { TemplateRef, AfterContentInit, ElementRef, EventEmitter, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i2 from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import * as i1 from '@angular/common';

/**
 * Custom text change event.
 * @see {@link Editor.onTextChange}
 * @group Events
 */
interface EditorTextChangeEvent {
    /**
     * Current value as html.
     */
    htmlValue: string;
    /**
     * Current value as text.
     */
    textValue: string;
    /**
     * Representation of the change.
     */
    delta: string;
    /**
     * Source of change. Will be either 'user' or 'api'.
     */
    source: string;
}
/**
 * Custom selection change event.
 * @see {@link Editor.onSelectionChange}
 * @group Events
 */
interface EditorSelectionChangeEvent {
    /**
     * Representation of the selection boundaries.
     */
    range: string;
    /**
     * Representation of the previous selection boundaries.
     */
    oldRange: string;
    /**
     * Source of change. Will be either 'user' or 'api'.
     */
    source: string;
}
/**
 * Custom load event.
 * @see {@link Editor.onInit}
 * @group Events
 */
interface EditorInitEvent {
    /**
     * Text editor instance.
     */
    editor: any;
}
/**
 * Defines valid templates in Editor.
 * @group Templates
 */
interface EditorTemplates {
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
}

declare const EDITOR_VALUE_ACCESSOR: any;
/**
 * Editor groups a collection of contents in tabs.
 * @group Components
 */
declare class Editor implements AfterContentInit, ControlValueAccessor {
    el: ElementRef<any>;
    private platformId;
    /**
     * Inline style of the container.
     * @group Props
     */
    style: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Style class of the container.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Placeholder text to show when editor is empty.
     * @group Props
     */
    placeholder: string | undefined;
    /**
     * Whitelist of formats to display, see here for available options.
     * @group Props
     */
    formats: string[] | undefined;
    /**
     * Modules configuration of Editor, see here for available options.
     * @group Props
     */
    modules: object | undefined;
    /**
     * DOM Element or a CSS selector for a DOM Element, within which the editor’s p elements (i.e. tooltips, etc.) should be confined. Currently, it only considers left and right boundaries.
     * @group Props
     */
    bounds: HTMLElement | string | undefined;
    /**
     * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars (i.e. overflow-y: auto), if is has been changed from the default ql-editor with custom CSS. Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container is responsible from the scrolling..
     * @group Props
     */
    scrollingContainer: HTMLElement | string | undefined;
    /**
     * Shortcut for debug. Note debug is a static method and will affect other instances of Quill editors on the page. Only warning and error messages are enabled by default.
     * @group Props
     */
    debug: string | undefined;
    /**
     * Whether to instantiate the editor to read-only mode.
     * @group Props
     */
    get readonly(): boolean;
    set readonly(val: boolean);
    /**
     * Callback to invoke when the quill modules are loaded.
     * @param {EditorInitEvent} event - custom event.
     * @group Emits
     */
    onInit: EventEmitter<EditorInitEvent>;
    /**
     * Callback to invoke when text of editor changes.
     * @param {EditorTextChangeEvent} event - custom event.
     * @group Emits
     */
    onTextChange: EventEmitter<EditorTextChangeEvent>;
    /**
     * Callback to invoke when selection of the text changes.
     * @param {EditorSelectionChangeEvent} event - custom event.
     * @group Emits
     */
    onSelectionChange: EventEmitter<EditorSelectionChangeEvent>;
    templates: QueryList<PrimeTemplate>;
    toolbar: any;
    value: Nullable<string>;
    _readonly: boolean;
    onModelChange: Function;
    onModelTouched: Function;
    quill: any;
    dynamicQuill: any;
    headerTemplate: Nullable<TemplateRef<any>>;
    private quillElements;
    constructor();
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    getQuill(): any;
    private initQuillEditor;
    private createQuillEditor;
    private initQuillElements;
    static ɵfac: i0.ɵɵFactoryDeclaration<Editor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Editor, "p-editor", never, { "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "formats": { "alias": "formats"; "required": false; }; "modules": { "alias": "modules"; "required": false; }; "bounds": { "alias": "bounds"; "required": false; }; "scrollingContainer": { "alias": "scrollingContainer"; "required": false; }; "debug": { "alias": "debug"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; }, { "onInit": "onInit"; "onTextChange": "onTextChange"; "onSelectionChange": "onSelectionChange"; }, ["toolbar", "templates"], ["p-header"], false, never>;
}
declare class EditorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<EditorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<EditorModule, [typeof Editor], [typeof i1.CommonModule], [typeof Editor, typeof i2.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<EditorModule>;
}

export { EDITOR_VALUE_ACCESSOR, Editor, EditorModule };
export type { EditorInitEvent, EditorSelectionChangeEvent, EditorTemplates, EditorTextChangeEvent };
