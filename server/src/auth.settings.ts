// Import settings
import { AppSettings } from "./settings"

export const AuthSettings = {
  PROVIDER: AppSettings.SERCURITY.AUTH_PROVIDER,
  ROLES: {
    USER: "user",
    GUEST: "guest",
    ADMIN: "admin",
    EDITOR: "editor"
  },
  EXPIRATION: {
    _DEFAULT: { value: "1", postfix: "m" } // 1 Minutes
  },
  RIGHTS: AppSettings.SERCURITY.RESOURCE_ACCESS_RIGHTS
}