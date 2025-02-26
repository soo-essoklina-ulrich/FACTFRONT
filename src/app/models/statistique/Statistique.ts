export interface  Statistique {
    facture:FactStat
    proforma:FactStat
    tableList:TableStat[]
}

export interface FactStat
{
    total:number;
    total_today:number;
}
export interface TableStat{
    numero:number;
    date:Date;
    total:number;
}
