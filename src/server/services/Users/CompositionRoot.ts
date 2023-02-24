import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Logger } from "./Adapters/Logger/Logger.adapter";
import { UserCreator } from "./Adapters/UserCreator/UserCreator.adapter";
import { UserEditor } from "./Adapters/UserEditor/UserEditor.adapter";
import { UserGetter } from "./Adapters/UserGetter/UserGetter.adapter";
import { UserRemover } from "./Adapters/UserRemover/UserRemover.adapter";
import { UsersService } from "./Domain/Users.service";
import { Creator } from "../Storage/Adapters/Creator.adapter";
import { Editor } from "../Storage/Adapters/Editor.adapter";
import { Remover } from "../Storage/Adapters/Remover.adapter";
import { Retriever } from "../Storage/Adapters/Retriever.adapter";
import { StorageService } from "../Storage/Domain/Storage.service";

const dynamoClient = new DynamoDB({
  region: process.env.AWS_REGION
});

const logger = new Logger();
const storage = new StorageService(dynamoClient);
const retriever = new Retriever(storage);
const editor = new Editor(storage);
const remover = new Remover(storage);
const creator = new Creator(storage);
const userService = new UsersService(logger, retriever, editor, remover, creator);
export const userGetter = new UserGetter(userService);
export const userEditor = new UserEditor(userService);
export const userRemover = new UserRemover(userService);
export const userCreator = new UserCreator(userService);
