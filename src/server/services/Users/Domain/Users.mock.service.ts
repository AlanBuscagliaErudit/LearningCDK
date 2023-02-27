import { User, UsersService } from "./Users.service";
import { creatorMock } from "../../Storage/Adapters/Creator.mock.adapter";
import { editorMock } from "../../Storage/Adapters/Editor.mock.adapter";
import { removerMock } from "../../Storage/Adapters/Remover.mock.adapter";
import { retrieverMock } from "../../Storage/Adapters/Retriever.mock.adapter";
import { loggerAdapterMock } from "../Adapters/Logger/Logger.mock";

export const userMock: User = {
  account_id: "test",
  company: "test",
  email: "test",
  name: "test",
  userManagerLicenses: 1,
};

export const userServiceMock = new UsersService(
  loggerAdapterMock,
  retrieverMock,
  editorMock,
  removerMock,
  creatorMock
);
