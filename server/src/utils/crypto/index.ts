import crypto from "crypto";

// Import classes
import { Util } from "src/classes/Util";

// Import settings
import { AppSettings } from "src/settings";

export class CryptoUtil extends Util {
  private __key!: string;
  private __iv!: string;
  private __algorithm!: string;

  constructor() {
    super();
    if(!AppSettings.SERCURITY.ALGORITHM) {
      console.error("Algorithm of crypto is required");
      return;
    }

    if(!AppSettings.SERCURITY.KEY) {
      console.error("KEY for encryption and decryption is required");
      return;
    }

    if(!AppSettings.SERCURITY.IV) {
      console.error("IV is required");
      return;
    }

    this.__algorithm = AppSettings.SERCURITY.ALGORITHM;
    this.__key = AppSettings.SERCURITY.KEY;
    this.__iv = AppSettings.SERCURITY.IV;
  }

  encrypt(value: string) {
    const cipher = crypto.createCipheriv(this.__algorithm, this.__key, this.__iv);
    let encryptedData = cipher.update(value, 'utf-8', 'hex');

    encryptedData += cipher.final('hex');
    return encryptedData;
  }

  decrypt(encryptedData: string) {
    const decipher = crypto.createDecipheriv(this.__algorithm, this.__key, this.__iv);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  }
}