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
// Import Modules
import { BookModule } from "./modules/book.module";
import { AuthModule } from "./modules/auth.module";

// Run app
(async function() {
  const dbs = new Databases();
  const serv = new Services(dbs);
  const middlewares = new Middlewares(dbs, serv);

  const serverSettings = {
    port: AppSettings.PORT
  };

  const myServer = new MyServer(serverSettings);
  const builder = new ServerBuilder(myServer);

  const book = new BookModule(dbs, serv, middlewares);
  const auth = new AuthModule(dbs, serv, middlewares);

  // Build databases
  await builder.buildDatabases(dbs);

  // Build global middlewares
  await builder.buildGlobalMiddlewares([
    cors({ origin: "*" }),
    json(),
    urlencoded({ extended: true })
  ]);

  // Build modules
  await builder.buildModules([book, auth]);

  if(!builder.canStartup())
    throw new Error("Server can be started up now. Please make sure databases are connected, modules and middlewares are set up");

  await myServer.startup(function(port) { console.log(`You server run at PORT::${port}`); });
})();