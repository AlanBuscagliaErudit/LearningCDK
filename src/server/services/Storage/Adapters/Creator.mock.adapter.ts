import { Creator } from "./Creator.adapter";
import { storageServiceMock } from "../Domain/Storage.mock.service";

export const creatorMock = new Creator(storageServiceMock);