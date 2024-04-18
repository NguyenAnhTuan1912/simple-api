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
import { ExampleModule } from "./modules/example.module";

// Run app
(async function() {
  const db = new Databases();
  const sv = new Services();
  const utils = new Utils();
  const middlewares = new Middlewares(utils);

  const serverSettings = {
    port: AppSettings.PORT
  };

  const myServer = new MyServer(utils, serverSettings);
  const builder = new ServerBuilder(myServer);
  const example = new ExampleModule(db, sv, utils, middlewares);

  // Build databases
  builder.buildDatabases(db);

  // Build global middlewares
  builder.buildGlobalMiddlewares([
    cors({ origin: "*" }),
    json(),
    urlencoded({ extended: true })
  ]);

  // Build modules
  builder.buildModules([example]);

  if(!builder.canStartup())
    throw new Error("Server can be started up now. Please make sure databases are connected, modules and middlewares are set up");

  await myServer.startup(function(port) { console.log(`You server run at PORT::${port}`); });
})();