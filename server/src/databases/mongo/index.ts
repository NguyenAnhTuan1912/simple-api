import { MongoClient } from "mongodb";

// Import local utils
import { MongoUtils } from "./utils";

// Import classes
import { Database } from "../../classes/database";

// Import models
import { BookModel } from "./models/book.model";

// Import settings
import { AppSettings } from "src/settings";

// Import types
import type { Utils } from "src/utils";

const __settings = AppSettings.MONGO;

export type Mongo_Instances = {
  [K in keyof typeof __settings]: MongoClient;
}

export type Mongo_DBInformations = {
  [K in keyof typeof __settings.SIMPLE_API.DBS]: typeof __settings.SIMPLE_API.DBS[K];
}

export class MongoDatabase extends Database<Mongo_Instances> {
  book!: BookModel;
  localUtils!: MongoUtils;

  constructor(utils: Utils) {
    super();
    this.localUtils = new MongoUtils();

    let cluserNames = Object.keys(__settings);

    for(let cluserName of cluserNames) {
      this.instances[cluserName as keyof typeof __settings] = new MongoClient(
        this.localUtils.getConnectionString(
          __settings[cluserName as keyof typeof __settings].DOMAIN!,
          __settings[cluserName as keyof typeof __settings].USERNAME!,
          __settings[cluserName as keyof typeof __settings].PASSWORD!
        )!
      )
    }

    this.book = new BookModel(this.instances, utils, this.localUtils, __settings.SIMPLE_API.DBS);
  }

  async connect() {
    try {
      let dbNames = Object.keys(this.instances);

      for(let dbName of dbNames) {
        console.log(`  ${dbName} DB - status: connecting`);
        await this.instances[dbName as keyof typeof this.instances].connect();
        console.log(`  ${dbName} DB - status: connected`);
      }

    } catch (error: any) {
      console.error(error.message);
    }
  }
}