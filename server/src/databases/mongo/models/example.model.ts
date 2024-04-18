import { Model } from "src/classes/database";

// Import types
import type { IModel } from "src/types/database.types";
import type { ExampleModelData } from "../index.types";

export class ExampleModel extends Model implements IModel<ExampleModelData> {
  constructor() {
    super();
  }

  async query<Args>(...args: Args[]): Promise<ExampleModelData> {
    return {
      id: "",
      name: "",
      age: ""
    }
  }
}