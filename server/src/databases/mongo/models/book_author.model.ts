import Joi from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_BookAuthorModelData,
  Mongo_BookAuthorQuery,
  Mongo_BookAuthorsQuery,
  Mongo_BookAuthorParams
} from "../index.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class BookAuthorModel
  extends Model<MongoDB, Mongo_BookAuthorModelData>
  implements IModel<Mongo_BookAuthorModelData>
{
  private __localUtils!: MongoUtils;
  private __dbInfo!: Mongo_DBInformations; 

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(mongos.SIMPLE_API.db(dbInformations.BOOK.NAME), dbInformations.BOOK.OBJECTS.AUTHOR);
    this.schema = Joi.object<Mongo_BookAuthorModelData>({
      name: Joi.string().default(""),
      desc: Joi.string().default(""),
      img: Joi.string().default(""),
      birthDate: Joi.string().default((new Date()).toISOString().split("T")[0])
    });
    this.__localUtils = localUtils;
    this.__dbInfo = dbInformations;
  }

  private __getCollection() {
    return super.getCollection(this.__localUtils.getCollection<Mongo_BookAuthorModelData>);
  }

  async query(...args: [Mongo_BookAuthorQuery?, Mongo_BookAuthorParams?]) {
    const __collection = this.__getCollection();

    return await this.handleInterchangeError<Mongo_BookAuthorModelData, this>(this, async function(o) {
      const pipeline = [];

      // If request has params
      if(!args[1] || !args[1].id) throw new Error("The [id] of author is required");

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

      if(!result) throw new Error(`The author with ${args[1].id} id isn't found`);

      o.data = result[0] as Mongo_BookAuthorModelData;

      return o;
    });
  }

  async queryMultiply(...args: [Mongo_BookAuthorsQuery, Mongo_BookAuthorParams?]) {
    const __collection = this.__getCollection();

    return await this.handleInterchangeError<Mongo_BookAuthorModelData[], this>(this, async function(o) {
      const pipeline = [];

      // If request has queries
      if(args[0]) {
        const matchStage = {
          "$match": this.__localUtils.Pipeline.and()
        };

        // If match stage is empty
        if(matchStage.$match.$and.length === 0) matchStage.$match = {} as any;

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

      const cursor = __collection.aggregate<Mongo_BookAuthorModelData>(pipeline);
      o.data = await cursor.toArray() as Mongo_BookAuthorModelData[];
      o.message = "Query authors successfully";

      return o;
    });
  }
}