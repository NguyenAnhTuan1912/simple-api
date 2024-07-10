// Import classes
import { Util } from "src/classes/Util";

export class DatetimeUtil extends Util {
  static TimePostfixesRegex = /^(\d+)\s*(hours|days|minutes|seconds|h|d|m|s)$/;

  constructor() {
    super();
  }

  /**
   * Use this method to get time as `timestamp`. This method even receives a `period` which is
   * the distance from now to future. For example, if `period = "1h"`, `getTime()` will return
   * the `timestamp` of __1 hour__ later.
   * 
   * Format of period:
   *   - `<time><spaces><time postfix>`: time postfix can be `h`, `hours`, `m`, `minutes`, ...
   *   - A second as number.
   * 
   * Note: this method doesn't calculate time of past
   * @param period 
   */
  getTime(period?: string | number) {
    let time = Date.now();
    if(!period) return time;
    if(typeof period === "number") return time + (period * 1000);
    
    let match = period.match(DatetimeUtil.TimePostfixesRegex);
   	if(match === null) {
      console.log(`The time string ${period} isn't a valid format`);
      return time;
    }

    let timeValue = parseInt(match[1]),
        timePostfix = match[2];

    switch(timePostfix) {
	    case "s":
      case "seconds": {
        time += timeValue * 1000;
        break;
      }

      case "m":
      case "minutes": {
        time += timeValue * 60 * 1000;
        break;
      }

      case "d":
      case "days": {
        time += timeValue * 24 * 3600 * 1000;
        break;
      }
      
      case "h":
      case "hours":
      default: {
        time += timeValue * 3600 * 1000;
        break;
      }
    }

    return time;
  }

  /**
   * This method get time string instead of timestamp
   * @param period 
   */
  getTimeString(period?: string | number) {
    let time = this.getTime(period);
    let timeString = (new Date(time)).toLocaleString("vi-VN", { hour12: false }).split(" ")[0];
    return timeString;
  }

  /**
   * Use this method to get standard string of date. The standard has format `YYYY-MM-DD`
   * @param args 
   * @returns 
   */
  getStandardDateString(...args: [number, number, number, number, number]) {
    let date = new Date(...args);
    let dateString = date.toISOString();
    return dateString.split("T")[0];
  }

  /**
   * Use this method to get standard string of time. The standard has format `HH:mm:ss.sss`
   * @param args 
   * @returns 
   */
  getStandardTimeString(...args: [number, number, number, number, number]) {
    let date = new Date(...args);
    let dateString = date.toISOString().split("T")[1];
    return dateString.substring(0, dateString.length - 1);
  }
}