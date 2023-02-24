import { Remover } from "./Remover.adapter";
import { storageServiceMock } from "../Domain/Storage.mock.service";

export const removerMock = new Remover(storageServiceMock);