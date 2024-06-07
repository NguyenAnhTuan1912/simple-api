import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { Db } from "mongodb";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_BookTypeModelData,
  Mongo_BookTypeQuery,
  Mongo_BookTypesQuery,
  Mongo_BookTypeParams
} from "../index.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class BookTypeModel extends Model<Mongo_BookTypeModelData> implements IModel<Mongo_BookTypeModelData> {
  protected db!: Db;
  private __dbInfo!: Mongo_DBInformations;
  private __localUtils!: MongoUtils;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super();
    this.schema = Joi.object<Mongo_BookTypeModelData>({
      name: Joi.string().required(),
      value: Joi.string().required()
    });
    this.__dbInfo = dbInformations;
    this.__localUtils = localUtils;
    this.db = mongos.SIMPLE_API.db(this.__dbInfo.BOOK.NAME);
  }

  private __getCollection() {
    return this.__localUtils.getCollection<Mongo_BookTypeModelData>(this.db, this.__dbInfo.BOOK.OBJECTS.TYPE);
  }

  async query(...args: [Mongo_BookTypeQuery?, Mongo_BookTypeParams?]) {
    const __collection = this.__getCollection();

    return await this.handleErrorWithInterchangeAsResult<Mongo_BookTypeModelData, this>(this, async function(o) {
      const pipeline = [];

      // If request has params
      if(!args[1] || !args[1].id) throw new Error("The [id] of book is required");

      pipeline.push(
        {
          "$match": this.__localUtils.Pipeline.getMatchIdQuery(args[1].id)
        }
      );

      // If args[0] and args[0].fields exist
      if(args[0] && args[0].fields) {
        pipeline.push(
          this.__localUtils.Pipeline.getProjectStage(args[0].fields)
        );
      }

      const cursor = __collection.aggregate(pipeline);
      const result = await cursor.toArray();

      if(!result) throw new Error(`The genre of book with ${args[1].id} id isn't found`);

      o.data = result[0] as Mongo_BookTypeModelData;
      o.message = "Query genre of book successfully";

      return o;
    });
  }

  async queryMultiply(...args: [Mongo_BookTypesQuery, Mongo_BookTypeParams?]) {
    const __collection = this.__getCollection();

    return await this.handleErrorWithInterchangeAsResult<Mongo_BookTypeModelData[], this>(this, async function(o) {
      const pipeline = [];

      // If request has queries
      if(args[0]) {
        const matchStage = {
          "$match": this.__localUtils.Pipeline.and()
        };

        // If match stage is empty
        if(matchStage.$match.$and.length === 0) matchStage.$match = {} as any;
  
        // If query has `types`
        if(args[0].types)
          matchStage.$match.$and.push(
            this.__localUtils.Pipeline.getMatchElementArrayQuery(
              "types", this.__localUtils.Pipeline.getMatchArrayQuery("value", args[0].types)
            )
          );

        // If args[0].fields is defined
        if(args[0].fields) pipeline.push(this.__localUtils.Pipeline.getProjectStage(args[0].fields));

        pipeline.push(
          // Match
          // Depend on
          matchStage
        );
      }

      pipeline.push(
        ...this.__localUtils.Pipeline.getLimitnSkipStage(parseInt(args[0].limit || "10"), parseInt(args[0].skip || "0"))
      );

      const cursor = __collection.aggregate<Mongo_BookTypeModelData>(pipeline);
      o.data = await cursor.toArray();
      o.message = "Query genre of books successfully";
      
      return o;
    });
  }
}