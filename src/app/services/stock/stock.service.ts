import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private token: string = 'token';
    private refresh: string = 'refresh';

    constructor() {}

    public settolocalstore_token(token: string) {
        localStorage.setItem(this.token, token);
    }

    public gettolocalstore_token() {
        const item = localStorage.getItem(this.token);
        return item ? item : '';
    }

    public settolocalstore_refresh(refresh: string) {
        localStorage.setItem(this.refresh, refresh);
    }

    public gettolocalstore_refresh() {
        const item = localStorage.getItem(this.refresh);
        return item ? item : '';
    }

    clear() {
        localStorage.removeItem(this.token);
        localStorage.removeItem(this.refresh);
    }
}
