import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import {LoginService} from '../../services/auth/login.service';
import {StockService} from '../../services/stock/stock.service';
import {Message} from "postcss";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator/>
        <div
            class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div
                    style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
                         style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="/identity_redim.ico" class="mb-8 w-16 shrink-0 mx-auto" alt="logo"/>

                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                                Bienvenue
                            </div>
                            <span class="text-muted-color font-medium">
                                Connectez-vous pour continuer
                            </span>
                        </div>

                        <div>
                            <label for="email1"
                                   class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Usernane</label>
                            <input pInputText id="email1" type="text" placeholder="Username"
                                   class="w-full md:w-[30rem] mb-8" [(ngModel)]="username"/>

                            <label for="password1"
                                   class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true"
                                        styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" disabled id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div>
                            <p-button label="Connexion" styleClass="w-full" (click)="login()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    protected message!: Message[];

    username: string = '';

    password: string = '';

    checked: boolean = false;


    constructor(
        private LoginService: LoginService,
        private StockService: StockService,
        private route:Router
    ) {
    }

    protected login() {
        this.LoginService.login({
            username: this.username,
            password: this.password
        }).subscribe(
            (response) => {
                this.StockService.settolocalstore_token(response.bearer)
                this.StockService.settolocalstore_refresh(response.refresh)
                this.route.navigate(['/home']).then(r => r)
            },
            (error) => {

                this.message = [{
                    severity: 'error', detail: error.error.detail,
                   type: 'error'
                }]
                console.log(error)
            }
        )
    }
}
