import { ForLogging } from "./../../Ports/ForLogging.port";

export let loggerAdapterMock: ForLogging = {
  log: jest.fn()
};
