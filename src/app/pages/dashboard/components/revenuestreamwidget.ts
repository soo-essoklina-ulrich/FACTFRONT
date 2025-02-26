import { ChangeDetectorRef, Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';
import { ChartStat } from '../../../models/statistique/Statistique';

@Component({
    standalone: true,
    selector: 'app-revenue-stream-widget',
    imports: [ChartModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Pie Graph</div>
        <p-chart type="pie" [data]="chartData" [options]="chartOptions" class="h-80" />
    </div>`
})
export class RevenueStreamWidget implements OnInit{
    @Input('chart') chart!:ChartStat[]

    chartData: any;

    chartOptions: any;

    subscription: Subscription;

    constructor(public layoutService: LayoutService,private cd: ChangeDetectorRef) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.chartData = {
            labels: this.chart.map(
                item => item.label
            ),
            datasets: [
                {

                    backgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'),documentStyle.getPropertyValue('--p-green-400'),documentStyle.getPropertyValue('--p-yellow-400')],
                    data: this.chart.map(
                        value => value.value
                    ),
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-green-500'), documentStyle.getPropertyValue('--p-yellow-500')]
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            },

        };
        this.cd.markForCheck()
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
