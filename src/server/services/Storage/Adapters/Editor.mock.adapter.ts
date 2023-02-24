import { Editor } from "./Editor.adapter";
import { storageServiceMock } from "../Domain/Storage.mock.service";

export const editorMock = new Editor(storageServiceMock);