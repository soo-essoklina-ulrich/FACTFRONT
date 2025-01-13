export interface UtilisateurDto{
  id:string,
  nom:string,
  prenom:string,
  telephone:number,
  email:string,
  username:string,
  role:string,
  dateCreation:Date,
  actif:boolean
}

export interface UtilisateurUpdate{
  id:string,
  nom:string,
  prenom:string,
  email:string,
  numero:number,
}

export interface Login{
  username: string;
  password: string;
}
export interface Register{
  username: string;
  password: string;
  email: string;
  nom: string;
  prenom: string;
  numero: number;
}
