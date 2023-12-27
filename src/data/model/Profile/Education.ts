import { Periodical } from './Periodical';

export default interface Education extends Periodical {
  educationId?: number;
  institutionName?: string;
}
