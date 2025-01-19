import {Observable} from "rxjs";

export interface Crud{
    PostData(adta:any):Observable<any>;
    getAll():Observable<any>;
    Updatedata(id:string, data:any):Observable<any>;
    DeleteDAta(id:string):Observable<any>;
}
