import dotenv from "dotenv";

// Load all .env.*
dotenv.config({ path: [".env", `.env.${process.env.NODE_ENV}`] });

export const AppSettings = {
  PORT: process.env.PORT || "7500",
  SERCURITY: {
    ALGORITHM: process.env.CRYPTOGRAPHY_ALGORITHM,
    KEY: process.env.CRYPTOGRAPHY_KEY,
    IV: process.env.CRYPTOGRAPHY_IV
  },
  /**
   * Settings for MongoDBs, this include many clusers, each cluser has many database...
   */
  MONGO: {
    SIMPLE_API: {
      DOMAIN: process.env.MONGO_SIMPLEAPI_DOMAIN,
      USERNAME: process.env.MONGO_SIMPLEAPI_USERNAME,
      PASSWORD: process.env.MONGO_SIMPLEAPI_PASSWORD,
      /**
       * THIS PROPERTY MUST BE THE SAME IN VARIOUS TYPE OF DATABASE FOR CONSISTANCE
       */
      DBS: {
        BOOK: {
          NAME: "book",
          OBJECTS: {
            BOOK: "book",
            TYPE: "type",
            AUTHOR: "author"
          }
        },
        USER: {
          NAME: "user",
          OBJECTS: {
            USER: "user",
            ROLE: "role",
            TOKEN: "token"
          }
        }
      }
    }
  }
}