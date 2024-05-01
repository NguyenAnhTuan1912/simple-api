import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import { type Db, type Document, type AggregationCursor, ObjectId } from "mongodb";
import type { IModel } from "src/types/database.types";
import type { Mongo_BookModelData, Mongo_BookQuery, Mongo_BookParams } from "../index.types";
import type { Utils } from "src/utils";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class BookModel extends Model<Mongo_BookModelData> implements IModel<Mongo_BookModelData> {
  protected db!: Db;
  private __dbInfo!: Mongo_DBInformations;
  private __localUtils!: MongoUtils;

  constructor(
    mongos: Mongo_Instances,
    utils: Utils,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(utils);
    this.schema = Joi.object<Mongo_BookModelData>({
      typeIds: Joi.array().items(Joi.string()).default([]),
      authorId: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      imgs: Joi.array().items(Joi.string()).default([])
    });
    this.__dbInfo = dbInformations;
    this.__localUtils = localUtils;
    this.db = mongos.SIMPLE_API.db(this.__dbInfo.BOOK.NAME);
  }

  async query(...args: [Mongo_BookQuery?, Mongo_BookParams?]) {
    let code = 1;
    let message: string = "";
    let data: Mongo_BookModelData | null = [] as any;
    const __collection = this.db.collection<Mongo_BookModelData>(this.__dbInfo.BOOK.OBJECTS.BOOK);
    
    try {
      const pipeline = [];

      // If request has params
      if(!args[1] || !args[1].id) throw new Error("The [id] of book is required");

      const result = await __collection.findOne({ "_id": new ObjectId(args[1].id) });

      if(!result) throw new Error(`The book with ${args[1].id} id isn't found`);

      data = result as Mongo_BookModelData;
      message = "Query books successfully";
    } catch (error: any) {
      code = 0;
      message = error.message;
      data = null;
    } finally {
      return this.utils.Http.generateInterchange(code, message, data);
    }
  }

  async queryMultiply(...args: [Mongo_BookQuery, Mongo_BookParams?]) {
    let code = 1;
    let message: string = "";
    let data: Array<Mongo_BookModelData> | null = [] as any;
    const __collection = this.db.collection<Mongo_BookModelData>(this.__dbInfo.BOOK.OBJECTS.BOOK);
    
    try {
      const pipeline = [];

      // If request has queries
      if(args[0]) {
        let [projectStage] = this.__localUtils.Pipeline.getProjectStage(args[0].fields, ["typeIds", "authorId"]);

        // `author` is an array and I dont want it, so I want to get the first element of author
        // by using `$unwind`
        let unwindStage = { "$unwind": "$author" };

        pipeline.push(
          // Look up for types
          {
            $lookup: {
              from: "type",
              localField: "typeIds",
              foreignField: "_id",
              as: "types"
            }
          },
          // Look up for author
          {
            $lookup: {
              from: "author",
              localField: "authorId",
              foreignField: "_id",
              as: "author"
            }
          },
          projectStage,
          unwindStage,
          ...this.__localUtils.Pipeline.getLimitnSkipStage(parseInt(args[0].limit || "10"), parseInt(args[0].skip || "0"))
        );
      }

      const cursor = __collection.aggregate<Mongo_BookModelData>(pipeline);
      data = await cursor.toArray();
      message = "Query books successfully";
    } catch (error: any) {
      code = 0;
      message = error.message;
      data = null;
    } finally {
      return this.utils.Http.generateInterchange(code, message, data);
    }
  }
}