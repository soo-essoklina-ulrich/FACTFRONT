import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ColumnDef, createAngularTable, FlexRenderDirective, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getPaginationRowModel, getSortedRowModel, Header } from '@tanstack/angular-table';
import { LoaderComponent } from '../loader/loader.component';
import { Error } from '../../../pages/auth/error';
import { ErrorViewComponent } from '../error-view/error-view.component';
import { Paginator, PaginatorState } from 'primeng/paginator';

type TableProps<T> = {
    title?: string;
    tabledata: T[] | undefined;
    columns: ColumnDef<T, any>[];
    count?: number;
    page?: number;
    pageSize?: number;
    renderHeaderCell?: (header: Header<T, unknown>) => string | HTMLElement | null;
    isLoading?: boolean;
    isError?: boolean;
    searchInput?: boolean;
    pagination?: boolean;
    globalfilter?: string;
};

@Component({
    selector: 'app-table-generic',
    imports: [FlexRenderDirective, CardModule, LoaderComponent, Error, ErrorViewComponent, Paginator],
    templateUrl: './table-generic.component.html',
})
export class TableGenericComponent<T = any> {
    @Input('props')
    props!: TableProps<T>;

    protected table = createAngularTable(() => ({
        data: this.props?.tabledata ?? [],
        columns: this.props?.columns as ColumnDef<unknown, any>[],
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },

        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    }));

    onPageChange($event: PaginatorState) {}
}
