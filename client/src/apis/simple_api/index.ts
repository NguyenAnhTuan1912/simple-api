import { API } from "src/classes/API";

export class SimpleAPI extends API {
  constructor() {
    super(import.meta.env.SIMPLE_API_ROOT);
  }
}