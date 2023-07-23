import { Periodical } from './Periodical';

export default interface Work extends Periodical {
  corporationName: string;
  createdAt: string;
  updatedAt: string;
  workDescription: string;
  workId?: number;
  new?: boolean;

}
