import { userCreatorMock } from "./Adapters/UserCreator/UserCreator.mock";
import { userEditorMock } from "./Adapters/UserEditor/UserEditor.mock";
import { userGetterMock } from "./Adapters/UserGetter/UserGetter.mock";
import { userRemoverMock } from "./Adapters/UserRemover/UserRemover.mock";
import { userMock, userServiceMock } from "./Domain/Users.mock.service";

describe("UserGetter", () => {
  it("should get users", async () => {
    const spyGetUser = jest.spyOn(userServiceMock, "getUsers");
    await userGetterMock.getUsers();
    expect(spyGetUser).toHaveBeenCalled();
  });

  it("should get user by id", async () => {
    const spy = jest.spyOn(userServiceMock, "getUserById");
    await userGetterMock.getUserByid("1");
    expect(spy).toHaveBeenCalled();
  });

  it("should edit user", async () => {
    const spy = jest.spyOn(userServiceMock, "editUser");
    await userEditorMock.editUser(userMock);
    expect(spy).toHaveBeenCalled();
  });

  it("should remove user", async () => {
    const spy = jest.spyOn(userServiceMock, "removeUser");
    await userRemoverMock.removeUser("1");
    expect(spy).toHaveBeenCalled();
  });

  it("should create user", async () => {
    const spy = jest.spyOn(userServiceMock, "createUser");
    await userCreatorMock.createUser(userMock);
    expect(spy).toHaveBeenCalled();
  });
});
