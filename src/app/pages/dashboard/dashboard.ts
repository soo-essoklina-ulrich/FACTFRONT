import { Component, OnInit } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { StatAPIService } from '../../services/statistique/stat-api.service';
import { Statistique } from '../../models/statistique/Statistique';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, RevenueStreamWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget [pro]="stats.proforma" [fa]="stats.facture" class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget [table]="stats.tableList" />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget [chart]="stats.chart" />
            </div>
        </div>
    `,
    providers:[
        MessageService
    ]
})
export class Dashboard implements OnInit {
    protected stats!: Statistique
    constructor(
        private StatAPI:StatAPIService,
        private msg:MessageService
    ) {
    }
    ngOnInit(): void {
        this.StatAPI.getstat().subscribe((data) => {
            this.stats = data;
        },
            error => {
            this.msg.add({
                severity: 'warn',
                summary: 'Statistique',
                detail: 'Erreur de chargement des statistiques'
            })
            }
        );
    }
}
