import { Observable } from 'rxjs';
import { ParamRequestion } from '../../models/pagination/ParamRequestion';

export interface Crud {
    PostData(adta: any): Observable<any>;
    getAll(pagination?: ParamRequestion): Observable<any>;
    Updatedata(id: string, data: any): Observable<any>;
    DeleteDAta(id: string): Observable<any>;
}
