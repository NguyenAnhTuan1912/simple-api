import Joi from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_BookResponseData,
  Mongo_BookModelData,
  Mongo_BookQuery,
  Mongo_BooksQuery,
  Mongo_BookParams
} from "../index.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class BookModel
  extends Model<MongoDB, Mongo_BookModelData>
  implements IModel<Mongo_BookResponseData>
{
  private __localUtils!: MongoUtils;
  private __dbInfo!: Mongo_DBInformations;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(mongos.SIMPLE_API.db(dbInformations.BOOK.NAME), dbInformations.BOOK.NAME);
    this.schema = Joi.object<Mongo_BookModelData>({
      typeIds: Joi.array().items(Joi.string()).default([]),
      authorId: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      imgs: Joi.array().items(Joi.string()).default([])
    });
    this.__localUtils = localUtils;
    this.__dbInfo = dbInformations;
  }

  private __getCollection() {
    return super.getCollection(this.__localUtils.getCollection<Mongo_BookResponseData>);
  }

  async query(...args: [Mongo_BookQuery?, Mongo_BookParams?]) {
    const __collection = this.__getCollection();

    return await this.handleInterchangeError<Mongo_BookResponseData, this>(this, async function(o) {
      const pipeline = [];

      // If request has params
      if(!args[1] || !args[1].id) throw new Error("The [id] of book is required");

      pipeline.push(
        {
          "$match": this.__localUtils.Pipeline.getMatchIdQuery(args[1].id)
        }
      );

      // If request has queries
      if(args[0]) {
        pipeline.push(
          // Look-up Stage
          // Get all related documents in `type` collection and merge
          this.__localUtils.Pipeline.getLookupStage(this.__dbInfo.BOOK.OBJECTS.TYPE, "typeIds", "_id", "types"),
          // Look-up Stage
          // Get all related documents in `author` collection and merge
          this.__localUtils.Pipeline.getLookupStage(this.__dbInfo.BOOK.OBJECTS.AUTHOR, "authorId", "_id", "author"),
          this.__localUtils.Pipeline.getProjectStage(args[0].fields, ["typeIds", "authorId"]),
          // Unwind Stage
          // Extract the first element of `author` to get single value.
          this.__localUtils.Pipeline.getUnwindStage(this.__dbInfo.BOOK.OBJECTS.AUTHOR)
        );
      }

      const cursor = __collection.aggregate(pipeline);
      const result = await cursor.toArray();

      if(!result) throw new Error(`The book with ${args[1].id} id isn't found`);

      o.data = result[0] as Mongo_BookResponseData;
      o.message = "Query book successfully";

      return o;
    });
  }

  async queryMultiply(...args: [Mongo_BooksQuery, Mongo_BookParams?]) {
    const __collection = this.__getCollection();
    
    return await this.handleInterchangeError<Mongo_BookResponseData[], this>(this, async function(o) {
      const pipeline = [];

      // If request has queries
      if(args[0]) {
        const matchStage = {
          "$match": this.__localUtils.Pipeline.and()
        };
  
        // If query has `author`
        if(args[0].author)
          matchStage.$match.$and.push(this.__localUtils.Pipeline.getMatchExactQuery("author.name", args[0].author));
  
        // If query has `types`
        if(args[0].types)
          matchStage.$match.$and.push(
            this.__localUtils.Pipeline.getMatchElementArrayQuery(
              "types", this.__localUtils.Pipeline.getMatchArrayQuery("value", args[0].types)
            )
          );

        // If match stage is empty
        if(matchStage.$match.$and.length === 0) matchStage.$match = {} as any;

        pipeline.push(
          // Look-up Stage
          // Get all related documents in `type` collection and merge
          this.__localUtils.Pipeline.getLookupStage(this.__dbInfo.BOOK.OBJECTS.TYPE, "typeIds", "_id", "types"),
          // Look-up Stage
          // Get all related documents in `author` collection and merge
          this.__localUtils.Pipeline.getLookupStage(this.__dbInfo.BOOK.OBJECTS.AUTHOR, "authorId", "_id", "author"),
          this.__localUtils.Pipeline.getProjectStage(args[0].fields, ["typeIds", "authorId"]),
          // Unwind Stage
          // Extract the first element of `author` to get single value.
          this.__localUtils.Pipeline.getUnwindStage(this.__dbInfo.BOOK.OBJECTS.AUTHOR),
          // Match
          // Depend on
          matchStage
        );
      }

      pipeline.push(
        ...this.__localUtils.Pipeline.getLimitnSkipStage(parseInt(args[0].limit || "10"), parseInt(args[0].skip || "0"))
      );

      const cursor = __collection.aggregate<Mongo_BookResponseData>(pipeline);
      o.data = await cursor.toArray();
      o.message = "Query books successfully";

      return o;
    });
  }
}