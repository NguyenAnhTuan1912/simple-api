///
/// DEFINE DATA STRUCTURE OF OBJECT
///
import type { Db } from "mongodb";
export type MongoDB = Db;

export type Mongo_ExampleModelData = {
  _id?: string;
  name: string;
  age: string;
}

export type Mongo_TokenModelData = {
  _id?: string;
  value: string;
}

export type Mongo_TokenContentData = {
  role: string;
  expire: number;
  provider: string;
  actions: string;
}

export type Mongo_UserRoleModelData = {
  _id?: string;
  name: string;
  rights: string;
  resources: Array<string>;
}

export type Mongo_UserModelData = {
  _id?: string;
  roleId: string;
  firstName: string;
  LastName: string;
  username: string;
  hashedPassword: string;
}

export type Mongo_UserResponseData = {
  _id?: string;
  role: Mongo_UserRoleModelData;
  firstName: string;
  LastName: string;
}

export type Mongo_BookTypeModelData = {
  _id?: string;
  name: string;
  value: string;
}

export type Mongo_BookAuthorModelData = {
  _id?: string;
  name: string;
  desc: string;
  birthDate: string;
  img: string;
}

export type Mongo_BookModelData = {
  _id?: string;
  typeIds: Array<string>;
  authorId: string;
  name: string;
  desc: string;
  imgs: Array<string>;
}

export type Mongo_BookResponseData = {
  _id?: string;
  types: Array<Mongo_BookTypeModelData>;
  author: Mongo_BookAuthorModelData;
  name: string;
  desc: string;
  imgs: Array<string>;
}

///
/// DEFINE DATA STRUCTURE OF HTTP REQUEST
///
type Mongo_BaseQuery = {
  fields?: string;
}

type Mongo_BaseMultipleQuery = {
  limit?: string;
  skip?: string;
} & Mongo_BaseQuery;

/// FOR BOOK
export type Mongo_BooksQuery = {
  author?: string;
  types?: string;
} & Mongo_BaseMultipleQuery;

export type Mongo_BookQuery = Mongo_BaseQuery;

export type Mongo_BookParams = {
  id: string;
}

/// FOR BOOK'S AUTHOR
export type Mongo_BookAuthorsQuery = {

} & Mongo_BaseMultipleQuery;

export type Mongo_BookAuthorQuery = Mongo_BaseQuery;

export type Mongo_BookAuthorParams = {
  id: string;
}

/// FOR BOOK'S TYPE
export type Mongo_BookTypesQuery = {
  types?: string;
} & Mongo_BaseMultipleQuery;

export type Mongo_BookTypeQuery = Mongo_BaseQuery;

export type Mongo_BookTypeParams = {
  id: string;
}