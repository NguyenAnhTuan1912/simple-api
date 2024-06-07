import Joi, { ObjectSchema } from "joi";

// Import classes
import { Model } from "src/classes/Database";

// Import mongodb settings
import { AppSettings } from "src/settings";

// Import types
import type { Db } from "mongodb";
import type { IModel } from "src/types/database.types";
import type {
  Mongo_UserRoleModelData,

} from "../index.types";
import type { Utils } from "src/utils";
import type { MongoUtils } from "../utils";
import type { Mongo_Instances, Mongo_DBInformations } from "..";

export class UserRoleModel extends Model<Mongo_UserRoleModelData> implements IModel<Mongo_UserRoleModelData> {
  protected db!: Db;
  private __dbInfo!: Mongo_DBInformations;
  private __localUtils!: MongoUtils;

  constructor(
    mongos: Mongo_Instances,
    localUtils: MongoUtils,
    dbInformations: Mongo_DBInformations
  ) {
    super();
    this.schema = Joi.object<Mongo_UserRoleModelData>({
      name: Joi.string().required(),
      rights: Joi.string().required()
    });
    this.__dbInfo = dbInformations;
    this.__localUtils = localUtils;
    this.db = mongos.SIMPLE_API.db(this.__dbInfo.USER.NAME);
  }

  private __getCollection() {
    return this.__localUtils.getCollection<Mongo_UserRoleModelData>(this.db, this.__dbInfo.USER.OBJECTS.ROLE);
  }

  async query(...args: [string]) {
    const __collection = this.__getCollection();

    return await this.handleErrorWithInterchangeAsResult<Mongo_UserRoleModelData, this>(this, async function(o) {
      const role = args[0];
      const result = await __collection.findOne({ name: role });

      if(!result) throw new Error(`The role name ${role} isn't found`);

      o.data = result as Mongo_UserRoleModelData;
      o.message = "Query genre of book successfully";

      return o;
    });
  }
}