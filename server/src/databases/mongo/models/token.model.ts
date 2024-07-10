import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_TokenModelData
} from "../index.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";
import { Interchange } from "src/types/data.types";

export class TokenModel
  extends Model<MongoDB, Mongo_TokenModelData>
  implements IModel<Mongo_TokenModelData>
{
  private __localUtils!: MongoUtils;
  private __dbInfo!: Mongo_DBInformations;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(mongos.SIMPLE_API.db(dbInformations.USER.NAME), dbInformations.USER.OBJECTS.TOKEN);
    this.schema = Joi.object<Mongo_TokenModelData>({
      value: Joi.string().required()
    });
    this.__localUtils = localUtils;
    this.__dbInfo = dbInformations;
  }

  private __getCollection() {
    return super.getCollection(this.__localUtils.getCollection<Mongo_TokenModelData>);
  }

  async query(...args: [string]) {
    const __collection = this.__getCollection();
    
    return await this.handleInterchangeError<Mongo_TokenModelData, this>(this, async function(o) {
      const pipeline = [];

      // If request has params
      if(!args[0]) throw new Error("The [token] is required");

      const result = await __collection.findOne({ value: args[0] });

      if(!result) throw new Error(`The token isn't found`);

      o.data = result as Mongo_TokenModelData;
      o.message = "Query token successfully";
      
      return o;
    });
  }

  async create(...args: [string]) {
    const __collection = this.__getCollection();
    
    return await this.handleInterchangeError<Mongo_TokenModelData, this>(this, async function(o) {
      let token = { value: args[0] };
      let result = await __collection.insertOne(token);

      if(!result) throw new Error(`The token isn't created successfully`);

      o.data = token as Mongo_TokenModelData;
      o.message = "Create token successfully";
      
      return o;
    })
  }
  
  async delete(...args: [string]) {
    const __collection = this.__getCollection();
    
    return await this.handleInterchangeError<Mongo_TokenModelData, this>(this, async function(o) {
      let result = await __collection.deleteOne({ value: args[0] });

      if(!result) throw new Error(`The token doesn't exist`);

      o.message = "Create token successfully";
      
      return o;
    })
  }
}