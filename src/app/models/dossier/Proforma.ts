import { Article_Quantite, Article_QuantiteSave } from './Article_Quantite';

export interface Proforma {
    id: string;
    reference: string;
    numero: string;
    articleQuantiteslist: Article_Quantite[];
    total_ht: number;
    total_ttc: number;
    total_tva: number;
    client: string;
    date: Date;
    signby: string;
    adopted: boolean;
}

export interface ProformaSave {
    projet_id?: string;
    client_id?: string;
    reference: string;
    articleQuantiteslist: Article_QuantiteSave[];
}
