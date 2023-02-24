import { UserGetter } from "./UserGetter.adapter";
import { userServiceMock } from "../../Domain/Users.service.mock";

export const userGetterMock = new UserGetter(userServiceMock);
