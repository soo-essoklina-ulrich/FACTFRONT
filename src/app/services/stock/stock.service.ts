import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private token: string = 'token';
    private refresh: string = 'refresh';

    constructor() {}

    public settolocalstore_token(token: string) {
        sessionStorage.setItem(this.token, token);

    }

    public gettolocalstore_token() {
        const item = sessionStorage.getItem(this.token);
        return item ? item : '';
    }

    public settolocalstore_refresh(refresh: string) {
        sessionStorage.setItem(this.refresh, refresh);
    }

    public gettolocalstore_refresh() {
        const item = sessionStorage.getItem(this.refresh);
        return item ? item : '';
    }

    clear() {
        sessionStorage.removeItem(this.token);
        sessionStorage.removeItem(this.refresh);
    }
}
