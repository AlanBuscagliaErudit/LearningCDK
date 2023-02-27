import { UserGetter } from "./UserGetter.adapter";
import { userServiceMock } from "../../Domain/Users.mock.service";

export const userGetterMock = new UserGetter(userServiceMock);
