// Import classes
import { Util } from "src/classes/util";

export class PipelineUtil extends Util {
  /**
   * Use this method to get limit and skip stage for aggregation pipeline
   * @param limit 
   * @param skip 
   * @returns 
   */
  getLimitnSkipStage(limit: number, skip: number) {
    if(limit === undefined || limit === null) throw new Error("PipelineUtil - Fn: getLimitnSkipStage - '[limit] is required'");
    if(skip === undefined || skip === null) throw new Error("PipelineUtil - Fn: getLimitnSkipStage - '[skip] is required'");

    return [
      { "$skip": skip },
      { "$limit": limit }
    ]
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to get array query for match stage.
   * 
   * Note:
   *   - If `values` is a string, each value must be separated by `;`
   * @param fieldName 
   * @param values 
   * @param isExact 
   * @returns 
   */
  getMatchArrayQuery(fieldName: string, values?: Array<any> | string, isExact: boolean = false) {
    if(!values) return [];
    if(typeof values === "string") values = values.split(";");
    if(isExact) return { [fieldName]: { "$all": values } };
    else return { [fieldName]: { "$in": values } };
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to get exact value query for match stage 
   * @param fieldName 
   * @param value 
   */
  getMatchExactQuery(fieldName: string, value: any) {
    return { [fieldName]: value };
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to group queries that are required to match any
   * @param matchQueries 
   * @returns 
   */
  or(...matchQueries: Array<any>) {
    return { "$or": matchQueries };
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to group queries that are required to match all
   * @param matchQueries 
   * @returns 
   */
  and(...matchQueries: Array<any>) {
    return { "$and": matchQueries };
  }

  /**
   * Use this method to project fields of a document
   * 
   * Note:
   *   - If `fieldNames` is a string, each value must be separated by `;`
   * @param fieldNames 
   */
  getProjectStage(showFieldNames?: Array<string> | string, hiddenFieldNames?: Array<string> | string) {
    let fields: {[K: string]: any} = {};

    if(showFieldNames) {
      if(typeof showFieldNames === "string") showFieldNames = showFieldNames.split(";");

      for(let showFieldName of showFieldNames) {
        fields[showFieldName] = 1;
      }
    }

    if(hiddenFieldNames) {
      if(typeof hiddenFieldNames === "string") hiddenFieldNames = hiddenFieldNames.split(";");

      for(let hiddenFieldName of hiddenFieldNames) {
        fields[hiddenFieldName] = 0;
      }
    }

    if(Object.keys(fields).length === 0) return [];

    return [{ "$project": fields }];
  }
}