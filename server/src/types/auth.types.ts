type PermissionsAction = {
  [K: string]: string;
}

export type Permissions = {
  resources: Array<string>;
  actions: PermissionsAction;
}