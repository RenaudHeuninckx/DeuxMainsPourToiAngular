import { CommentMassage } from './commentMassage';

export class Massage {
  id: number;
  nom: string;
  type: string;
  description: string;
  duree: string;
  prix: number;
  plannings: any;
  commentMassages: CommentMassage[];
}
