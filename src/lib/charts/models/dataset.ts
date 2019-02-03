import { DataGroup } from './data-group';

export interface Dataset {
  name: string;
  color: string;
  format: string;
  dataset: DataGroup[];
}
