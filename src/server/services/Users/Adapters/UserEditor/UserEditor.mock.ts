import { UserEditor } from "./UserEditor.adapter";
import { userServiceMock } from "../../Domain/Users.mock.service";

export const userEditorMock = new UserEditor(userServiceMock);
