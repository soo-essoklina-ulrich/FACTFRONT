import { Component, Input } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CustomResponse } from '../../../models/CustomResponse';

@Component({
    selector:'pagination-manuel',
    standalone:true,
    imports:[PaginatorModule],
    template: `
        <div class="flex justify-end">
            <p-paginator (onPageChange)="onPageChange($event)" [first]="first" [rows]="rows"
                         [totalRecords]="totalRecords" [rowsPerPageOptions]="pagesize" />
        </div>`

})

export class PaginationManuelComponent {
    @Input('first')first: CustomResponse<any>['page'] =0;
    @Input('rows') rows: CustomResponse<any>['size']  = 10;
    @Input('totalRecords') totalRecords: CustomResponse<any>['totalElements']  = 10;
    @Input('pagesize') pagesize = [10,25,40]
    constructor() {
    }


    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
    }
}
