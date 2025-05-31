import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ColumnDef, createAngularTable, FlexRenderDirective, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getPaginationRowModel, getSortedRowModel } from '@tanstack/angular-table';

type TableProps<T> = {
    tabledata: T[] | undefined;
    columns: ColumnDef<T, any>[];
};

@Component({
    selector: 'app-table-generic',
    imports: [FlexRenderDirective],
    templateUrl: './table-generic.component.html'
})
export class TableGenericComponent<T = any> {
    @Input('props') props!: TableProps<T>;
    @Input() data: T[] = [];
    @Input() columns: ColumnDef<T>[] = [];
    @Input() loading = false;
    @Input() enableSearch = false;

    @Input() pageSize = 10;
    @Input() totalItems = 0;
    @Input() currentPage = 1;

    @Output() pageChange = new EventEmitter<number>();
    @Output() searchChange = new EventEmitter<string>();
    @Output() refresh = new EventEmitter<void>();

    searchValue = '';

    onPageChange(event: any) {
        this.pageChange.emit(event.page + 1);
    }

    onSearchInput(event: any) {
        const value = event.target.value;
        this.searchChange.emit(value);
    }

    protected table = createAngularTable(() => ({
        data: this.props?.tabledata ?? [],
        columns: this.props?.columns as ColumnDef<unknown, any>[],
        initialState:{
pagination:{
    pageSize:10
}
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    }));
}
