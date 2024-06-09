import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import types
import type { MongoDB } from "../index.types";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_UserRoleModelData,
} from "../index.types";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class UserRoleModel
  extends Model<MongoDB, Mongo_UserRoleModelData>
  implements IModel<Mongo_UserRoleModelData>
{
  private __localUtils!: MongoUtils;
  private __dbInfo!: Mongo_DBInformations;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super(mongos.SIMPLE_API.db(dbInformations.USER.NAME), dbInformations.USER.OBJECTS.ROLE);
    this.schema = Joi.object<Mongo_UserRoleModelData>({
      name: Joi.string().required(),
      rights: Joi.string().required()
    });
    this.__localUtils = localUtils;
    this.__dbInfo = dbInformations;
  }

  private __getCollection() {
    return super.getCollection(this.__localUtils.getCollection<Mongo_UserRoleModelData>);
  }

  async query(...args: [string]) {
    const __collection = this.__getCollection();

    return await this.handleInterchangeError<Mongo_UserRoleModelData, this>(this, async function(o) {
      const role = args[0];
      const result = await __collection.findOne({ name: role });
      
      if(!result) throw new Error(`The role name [${role}] isn't found`);

      o.data = result as Mongo_UserRoleModelData;
      o.message = "Query genre of book successfully";

      return o;
    });
  }
}