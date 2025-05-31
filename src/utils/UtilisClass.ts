import { ParamRequestion } from '../app/models/pagination/ParamRequestion';
import { HttpParams } from '@angular/common/http';
import { ColumnDef } from '../app/models/Table';

export class UtilisClass {
    static generateRequestParams=(params?:ParamRequestion) => {
        let httpParams = new HttpParams();
        if (params){

            Object.keys(params).forEach((key) => {
                if (params[key] !==undefined && params[key] !==null ){
                    httpParams.set(key, params[key]);
                }
            })
        }

        return httpParams;
    }

    static generateColunmnDef<T = any>(
        data?: T,
        cellTemplates?: Partial<Record<keyof T, (item: T) => string | number | HTMLElement>>
    ): ColumnDef<T>[] {
        if (!data) return [];
        const keys = Object.keys(data) as (keyof T)[];
        return keys.map((key) => ({
            header: key.toLocaleString().charAt(0).toUpperCase() + key.toLocaleString().slice(1),
            field: key,
            sortable: true,
            cellTemplate: cellTemplates?.[key]
        }));
    }
}
