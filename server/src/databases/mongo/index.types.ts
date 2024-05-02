export type Mongo_ExampleModelData = {
  id: string;
  name: string;
  age: string;
}

export type Mongo_UserRoleModelData = {
  id: string;
  name: string;
  roles: Array<string>;
}

export type Mongo_UserModelData = {
  id: string;
  roleId: string;
  firstName: string;
  LastName: string;
  username: string;
  hashedPassword: string;
}

export type Mongo_UserResponseData = {
  id: string;
  role: Mongo_UserRoleModelData;
  firstName: string;
  LastName: string;
}

export type Mongo_BookTypeModelData = {
  id: string;
  name: string;
  value: string;
}

export type Mongo_BookAuthorModelData = {
  id: string;
  name: string;
  desc: string;
  birthDate: string;
  img: string;
}

export type Mongo_BookModelData = {
  id: string;
  typeIds: Array<string>;
  authorId: string;
  name: string;
  desc: string;
  imgs: Array<string>;
}

export type Mongo_BookResponseData = {
  id: string;
  types: Array<Mongo_BookTypeModelData>;
  author: Mongo_BookAuthorModelData;
  name: string;
  desc: string;
  imgs: Array<string>;
}

export type Mongo_BookQuery = {
  limit?: string;
  skip?: string;
  author?: string;
  types?: string;
  fields?: string;
}

export type Mongo_BookParams = {
  id: string;
}