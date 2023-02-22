import { ProductService } from "./Product.service";
import { loggerAdapterMock } from "../Adapters/Logger/Logger.mock";

export const productServiceMock = new ProductService(loggerAdapterMock);
