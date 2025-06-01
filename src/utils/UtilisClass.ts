import { ParamRequestion } from '../app/models/pagination/ParamRequestion';
import { HttpParams } from '@angular/common/http';

export class UtilisClass {
    static generateRequestParams=(params?:ParamRequestion) => {
        let httpParams = new HttpParams();
        if (params){
            console.log(params);

            Object.keys(params).forEach((key) => {
                if (params[key] !==undefined && params[key] !==null ){
                    httpParams.set(key, params[key]);
                }
            })
        }

        console.log(httpParams);

        return httpParams;
    }

}
