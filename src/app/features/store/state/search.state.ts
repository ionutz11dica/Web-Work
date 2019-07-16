import { Book } from 'src/app/classes/book';

export interface AppState {
  readonly search: Book[];
  userLogged: boolean;
  userData: string;
  searched: boolean;
}