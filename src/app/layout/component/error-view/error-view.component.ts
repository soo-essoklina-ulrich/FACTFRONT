import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';

type Props = {
    title?: string;
    subtitle?: string;

    backButton?: boolean;
    buttonText?: string;
    link?: string;
};

@Component({
    selector: 'app-error-view',
    imports: [Button],
    templateUrl: './error-view.component.html',
    styleUrl: './error-view.component.scss',
})
export class ErrorViewComponent {
    @Input('props') props!: Props;
}
