import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { Db, Document, AggregationCursor } from "mongodb";
import type { IModel } from "src/types/database.types";
import type { Mongo_BookModelData } from "../index.types";
import type { Utils } from "src/utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class BookModel extends Model<Mongo_BookModelData> implements IModel<Mongo_BookModelData> {
  protected db!: Db;
  private dbInfo!: Mongo_DBInformations;

  constructor(mongos: Mongo_Instances, utils: Utils, dbInformations: Mongo_DBInformations) {
    super(utils);
    this.schema = Joi.object<Mongo_BookModelData>({

    });
    this.dbInfo = dbInformations;
    this.db = mongos.SIMPLE_API.db(this.dbInfo.BOOK.NAME);
  }

  async queryMultiply() {
    let code = 1;
    let message: string = "";
    let data: Array<Mongo_BookModelData> | null = [] as any;
    const __collection = this.db.collection<Mongo_BookModelData>(this.dbInfo.BOOK.OBJECTS.BOOK);
    
    try {
      const cursor = __collection.aggregate<Mongo_BookModelData>();
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