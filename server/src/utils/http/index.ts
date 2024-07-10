import { Util } from "src/classes/Util";

// Import types
import type { HTTPStatus, HTTPResponse, HTTPMethods } from "src/types/http.types";
import type { Interchange } from "src/types/data.types";

export class HTTPUtil extends Util {
  static Methods = {
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
    patch: "patch"
  };
  static StatusCodes: {[key: number]: HTTPStatus} = {
    200: {
      title: "OK"
    },
    201: {
      title: "Created"
    },
    202: {
      title: "Accepted"
    },
    203: {
      title: "Non-Authoritative Information"
    },
    204: {
      title: "No Content"
    },
    205: {
      title: "Reset Content"
    },
    206: {
      title: "Partial Content"
    },
    207: {
      title: "Multi-Status"
    },
    208: {
      title: "Already Reported"
    },
    226: {
      title: "IM Used"
    },
    400: {
      title: "Bad Request"
    },
    401: {
      title: "Unauthorized"
    },
    402: {
      title: "Payment Required"
    },
    403: {
      title: "Forbidden"
    },
    404: {
      title: "Not Found"
    },
    405: {
      title: "Method Not Allowed"
    },
    406: {
      title: "Not Acceptable"
    },
    407: {
      title: "Proxy Authentication Required"
    },
    408: {
      title: "Request Timeout"
    },
    409: {
      title: "Conflict"
    },
    410: {
      title: "Gone"
    },
    411: {
      title: "Length Required"
    },
    412: {
      title: "Prediction Failed"
    },
    413: {
      title: "Payload Too Large"
    },
    414: {
      title: "URI Too Long"
    },
    415: {
      title: "Unsupported Media Type"
    },
    429: {
      title: "Too Many Request"
    },
    500: {
      title: "Internal Server Error"
    }
  };

  isValidHTTPMethod(method: HTTPMethods) {
    return Boolean(HTTPUtil.Methods[method]);
  }

  /**
   * Use this method to create a HTTP Data to response to client
   * @param code 
   * @param data 
   * @param message 
   * @returns 
   */
  generateHTTPResponse<T>(code: number, data?: T, message?: string) {
    if(!Boolean(HTTPUtil.StatusCodes[code]))
      throw new Error(`[${code}] isn't a valid HTTP Code`);

    let responseObject: HTTPResponse<T> = {
      data: data ? data : null,
      error: null,
      success: null,
      code
    };

    if(code >= 200 && code < 300) {
      responseObject.success = HTTPUtil.StatusCodes[code];
    }

    if(code >= 400 && code < 500 || code >= 500 && code < 600) {
      responseObject.error = HTTPUtil.StatusCodes[code];
    }

    if(message && responseObject.success) {
      responseObject.success.message = message;
    } else if(message && responseObject.error) {
      responseObject.error.message = message;
    }

    return responseObject;
  }

 /**
  * Use this method to create an object for interchange data
  * @param code 
  * @param message 
  * @param data 
  * @returns 
  */
  generateInterchange<T>(code: number, message?: string, data?: T): Interchange<T> {
    return {
      code,
      message: message ? message : null,
      data: data ? data : null
    }
  }
}