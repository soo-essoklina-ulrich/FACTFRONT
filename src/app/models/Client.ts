export interface Client {
    id: string;
    lieu: string;
    nom: string;
    sigle: string;
    telephone: string;
    potentiel: boolean;
}

export interface ClientSave {
    lieu: string;
    nom: string;
    sigle: string;
    telephone: string;
    potentiel: boolean;
}
