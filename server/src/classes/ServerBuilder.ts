import type { MyServer } from "./MyServer";
import type { Module } from "./Module";
import type { Databases } from "src/databases";

/**
 * A server builder, used to build databases, global middlewares, modules, ...
 */
export class ServerBuilder {
  private __isModulesBuilt!: boolean;
  private __isMiddlewaresBuilt!: boolean;
  private __isDatabasesBuilt!: boolean;
  private __server!: MyServer;

  constructor(server: MyServer) {
    this.__server = server;
    this.__isModulesBuilt = true;
    this.__isMiddlewaresBuilt = true;
    this.__isDatabasesBuilt = true;
  }

  /**
   * This function let
   * @returns 
   */
  canStartup() {
    return this.__isDatabasesBuilt && this.__isMiddlewaresBuilt && this.__isModulesBuilt;
  }

  async buildModules(modules: Array<Module>) {
    this.__isModulesBuilt = true;
    let that = this;
    modules.forEach(function(module) {
      module.buildEndPoints(that.__server.app);
    });
  }

  async buildGlobalMiddlewares(middleWares: Array<any>) {
    this.__isMiddlewaresBuilt = true;
    this.__server.app.use(middleWares);
  }

  async buildDatabases(databases: Databases) {
    await databases.connect();
    this.__isDatabasesBuilt = true;
  }
}