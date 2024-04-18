import { StringUtil } from "./string";
import { ObjectUtil } from "./object";
import { HTTPUtil } from "./http";
import { NumberUtil } from "./number";

export class Utils {
  String!: StringUtil;
  Object!: ObjectUtil;
  Http!: HTTPUtil;
  Nunber!: NumberUtil;

  constructor() {
    this.String = new StringUtil();
    this.Object = new ObjectUtil();
    this.Http = new HTTPUtil();
    this.Nunber = new NumberUtil();
  }
}