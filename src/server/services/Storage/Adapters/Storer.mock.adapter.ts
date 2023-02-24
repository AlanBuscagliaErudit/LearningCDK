import { Storer } from "./Storer.adapter";
import { storageServiceMock } from "../Domain/Storage.mock.service";

export const storerMock = new Storer(storageServiceMock);