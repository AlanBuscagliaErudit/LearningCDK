import { UserEditor } from "./UserEditor.adapter";
import { userServiceMock } from "../../Domain/Users.service.mock";

export const userEditorMock = new UserEditor(userServiceMock);
