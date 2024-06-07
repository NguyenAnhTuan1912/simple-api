import { ObjectId } from "mongodb";

// Import classes
import { Util } from "src/classes/Util";

export class PipelineUtil extends Util {
  /**
   * __Use in match stage__
   * 
   * Use this method to get array query for match stage.
   * 
   * Note:
   *   - If `values` is a string, each value must be separated by `;`
   * @param field 
   * @param values 
   * @param isExact 
   * @returns 
   */
  getMatchArrayQuery(field: string, values?: Array<any> | string, isExact: boolean = false) {
    if(!values) return {};
    if(typeof values === "string") values = values.split(";");
    if(isExact) return { [field]: { "$all": values } };
    else return { [field]: { "$in": values } };
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to get exact value query for match stage 
   * @param field 
   * @param value 
   */
  getMatchExactQuery(field: string, value: any) {
    return { [field]: value };
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to get element query of an array for match stage
   * @param field 
   * @param matchQueriesArrayObject 
   * @returns 
   */
  getMatchElementArrayQuery(field: string, matchQueriesArrayObject: any) {
    return { [field]: { "$elemMatch": matchQueriesArrayObject } }
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to get _id query
   * @param id 
   */
  getMatchIdQuery(id: string) {
    return { "_id": new ObjectId(id) };
  }

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
   * Use this method to group queries that are required to match any
   * @param matchQueriesArray 
   * @returns 
   */
  or(...matchQueriesArray: Array<any>) {
    return {
      "$or": matchQueriesArray.filter(
        function(matchQuery) { return typeof matchQuery === "object" && Object.keys(matchQuery).length > 0 }
      )
    };
  }

  /**
   * __Use in match stage__
   * 
   * Use this method to group queries that are required to match all
   * @param matchQueriesArray 
   * @returns 
   */
  and(...matchQueriesArray: Array<any>) {
    return {
      "$and": matchQueriesArray.filter(
        function(matchQuery) { return typeof matchQuery === "object" && Object.keys(matchQuery).length > 0 }
      )
    };
  }

  /**
   * Use this method to project fields of a document
   * 
   * Note:
   *   - If `fields` is a string, each value must be separated by `;`
   * 
   * __TODO__:
   * 
   * This method will receive 1 or 2 array of fields' name. The first array contains shown fields,
   * the second one contains hidden fields. There are 3 cases of result:
   *   - If any fields exists in both array, they won't be listed in the result.
   *   - If elements of `shown fields` array is different from elements of `hidden fields` array,
   * the result will contain only elements of `shown fields` array.
   *   - The reuslt will contain only elements of `hidden fields` array, if only `shown fields` array
   * is empty.
   * @param fields 
   */
  getProjectStage(shownfields?: Array<string> | string, hiddenfields?: Array<string> | string) {
    let fields: {[K: string]: any} = {};

    if(shownfields) {
      if(typeof shownfields === "string") shownfields = shownfields.split(";");

      for(let showfield of shownfields) {
        fields[showfield] = 1;
      }
    }

    if(hiddenfields) {
      if(typeof hiddenfields === "string") hiddenfields = hiddenfields.split(";");

      for(let hiddenfield of hiddenfields) {
        if(fields[hiddenfield]) delete fields[hiddenfield];
        if(!shownfields) fields[hiddenfield] = 0;
      }
    }

    if(Object.keys(fields).length === 0) return {};

    return { "$project": fields };
  }

  /**
   * Use this method to get `look up` stage
   * @param from 
   * @param localField 
   * @param foreignField 
   * @param as 
   * @returns 
   */
  getLookupStage(from: string, localField: string, foreignField: string, as: string) {
    return {
      $lookup: {
        from,
        localField,
        foreignField,
        as
      }
    }
  }

  /**
   * Use this method to get `unwind` stage
   * @param field 
   * @returns 
   */
  getUnwindStage(field: string) {
    return { "$unwind": `$${field}` };
  }
}