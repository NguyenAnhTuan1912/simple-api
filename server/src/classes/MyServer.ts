import http, { Server } from "http";
import express, { Express } from "express";

// Import types
import type { Utils } from "src/utils";

type MyServerSettings = {
  port: string;
};

/**
 * Use this class to create an instance to manage server.
 */
export class MyServer {
  app!: Express;
  utils!: Utils;

  private __instance!: Server;
  private __settings!: MyServerSettings;
  
  constructor(utils: Utils, settings: MyServerSettings) {
    this.app = express();
    this.utils = utils;
    this.__instance = http.createServer(this.app);
    this.__settings = settings;
  }

  /**
   * Use this method to setup a http server
   * @param fn 
   */
  async startup(fn: (port: string) => void) {
    // Setup handshake endpoint
    let that = this;
    this.app.get("/", function(req, res) {
      return res.status(200).json(that.utils.http.generateHTTPResponse(200, "Hello from exmaple api", "Handshake Successful"));
    });

    this.__instance.listen(this.__settings.port, () => fn(this.__settings.port));
  }
}