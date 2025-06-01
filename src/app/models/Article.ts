export type Article = {
    id: string;
    libelle: string;
    prix_unitaire: number;
};

export interface SaveArticle {
    libelle: string;
    prix_unitaire: number;
}
