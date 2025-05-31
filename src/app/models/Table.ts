export interface ColumnDef<T = any> {
    header: string;
    field: keyof T | string;
    sortable?: boolean;
    cellTemplate?: (item: T) => string | number | HTMLElement;
}
