import { ForLogging } from "../../Ports/ForLogging.port";

export class Logger implements ForLogging {
  log(message: string): void {
    console.log("logger", message);
  }
}
