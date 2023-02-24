import { Retriever } from "./Retriever.adapter";
import { storageServiceMock } from "../Domain/Storage.mock.service";

export const retrieverMock = new Retriever(storageServiceMock);