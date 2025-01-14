export interface Projet {
    id: string,
    projet_type: string,
    description: string,
    offre: boolean,
    client: string,
    create_at: Date,
    update_at: Date
}

export interface SaveProjet {
    projet_type: string,
    description: string,
    offre: boolean,
    client_id: string
}

export interface UpdateProjet {
    projet_type: string,
    description: string,
    offre: boolean,
}
