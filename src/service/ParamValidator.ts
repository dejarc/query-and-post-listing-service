import { get, isEqual } from 'lodash';
import { Validator } from '../types/data-definitions';

export class ParamValidator implements Validator {
  query_path: string;
  target_path: string;
  query_val: any;
  constructor(query_loc: string, target_loc: string) {
    this.query_path = query_loc;
    this.target_path = target_loc;
  }

  setQueryValue(src_obj: any): void {
    this.query_val = get(src_obj, this.query_path);
  }
  hasValue(target_obj: any): boolean {
    const targetValue = get(target_obj, this.target_path);
    return isEqual(this.query_val || targetValue, targetValue);
  }
}
