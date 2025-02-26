import { Component, Input } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { TableStat } from '../../../models/statistique/Statistique';
import { ReportService } from '../../../services/report/report.service';
import { MessageService } from 'primeng/api';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `
        <div class="card !mb-8">
            <div class="font-semibold text-xl mb-4">Dossier Recents</div>
            <p-table [value]="products" [paginator]="true" [rows]="5" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th pSortableColumn="numero" >Numero
                            <p-sortIcon field="numero"></p-sortIcon>
                        </th>
                        <th pSortableColumn="date">Date
                            <p-sortIcon field="date"></p-sortIcon>
                        </th>
                        <th pSortableColumn="total">Total ttc
                            <p-sortIcon field="total"></p-sortIcon>
                        </th>
                        <th>View</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td style="width: 15%; min-width: 5rem;">
                            {{ product.numero }}
                        </td>
                        <td style="width: 35%; min-width: 7rem;">{{ product.date }}</td>
                        <td style="width: 35%; min-width: 8rem;">{{ product.total | currency: 'XOF' }}</td>
                        <td style="width: 15%;">
                            <button pButton pRipple type="button" icon="pi pi-file-pdf" (click)="generate(product.numero)"
                                    class="p-button p-component p-button-text p-button-icon-only"></button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>`,
    providers: [MessageService]
})
export class RecentSalesWidget {
   @Input("table") products!: TableStat[];

    constructor(
        private report:ReportService,
        private msg: MessageService
    ) {}


    generate(numero: string) {
        this.report.genereateReport(numero);
        setTimeout(() => {
            this.report.toastMessage.subscribe((data) => {
                this.msg.add(data);
            });
        }, 2000);
    }

}
