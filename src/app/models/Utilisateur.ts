export interface UtilisateurDto{
  id:string,
  nom:string,
  prenom:string,
  telephone:number,
  email:string,
  username:string,
  roles:string,
  dateCreation:Date,
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
