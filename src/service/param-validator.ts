import { get, isEqual } from 'lodash';
import { Validator } from '../types/data-definitions';

export class StringValidator implements Validator {
  private query_path: string;
  private target_path: string;
  private query_val: string;
  constructor(query_loc: string, target_loc: string) {
    this.query_path = query_loc;
    this.target_path = target_loc;
    this.query_val = "";
  }

  setValue(src_obj: any) {
    this.query_val = get(src_obj, this.query_path);
    if (this.query_val && typeof this.query_val !== 'string') {
      throw {
        statusCode: 400,
        message: 'Invalid Query Parameter',
        context: ['Multiple values for the same parameter not supported'],
      };
    }
    return this;
  }
  hasValue(target_obj: any): boolean {
    const targetValue = get(target_obj, this.target_path) as string;
    const queryVal = this.query_val || targetValue;
    return isEqual(queryVal.toLowerCase(), targetValue.toLowerCase());
  }
}
