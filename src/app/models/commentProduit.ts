import { Utilisateur } from './Utilisateur.model';
import { Produit } from "./Produit.model";

export class CommentProduit {
  id: number;
  produit: Produit;
  utilisateur: Utilisateur;
  description: string;
  date: string;
}
