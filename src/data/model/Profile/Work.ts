import { Periodical } from './Periodical';

export default interface Work extends Periodical {
  createdAt: string;
  updatedAt: string;
  corporationName: string;
  workDescription: string;
  workId?: number;
}
