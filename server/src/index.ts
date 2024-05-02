import bodyParser, { json, urlencoded } from "body-parser";
import cors from "cors";

import { MyServer } from "./classes/MyServer";
import { ServerBuilder } from "./classes/ServerBuilder";

// Import settings
import { AppSettings } from "./settings";

// Import databases
import { Databases } from "./databases";
// Import Services
import { Services } from "./services";
// Import Middlewares
import { Middlewares } from "./middlewares";
// Import Utils
import { Utils } from "./utils";
// Import Modules
import { BookModule } from "./modules/book.module";

// Run app
(async function() {
  const sv = new Services();
  const utils = new Utils();
  const dbs = new Databases(utils);
  const middlewares = new Middlewares(utils);

  const serverSettings = {
    port: AppSettings.PORT
  };

  const myServer = new MyServer(utils, serverSettings);
  const builder = new ServerBuilder(myServer);

  const book = new BookModule(dbs, sv, utils, middlewares);

  // Build databases
  await builder.buildDatabases(dbs);

  // Build global middlewares
  await builder.buildGlobalMiddlewares([
    cors({ origin: "*" }),
    json(),
    urlencoded({ extended: true })
  ]);

  // Build modules
  await builder.buildModules([book]);

  if(!builder.canStartup())
    throw new Error("Server can be started up now. Please make sure databases are connected, modules and middlewares are set up");

  await myServer.startup(function(port) { console.log(`You server run at PORT::${port}`); });
})();