import { Utilisateur } from './Utilisateur.model';
import { Massage } from './massage.model';

export class CommentMassage {

  id: number;
  massage: Massage;
  utilisateur: Utilisateur;
  description: string;
  date: string;
}
