import { productEditorMock } from "./Adapters/ProductEditor/ProductEditor.mock";
import { productGetterMock, productMock } from "./Adapters/ProductGetter/ProductGetter.mock";
import { productServiceMock } from "./Domain/Product.service.mock";

describe("ProductGetter", () => {
  it("should get products", async () => {
    const spyGetProduct = jest.spyOn(productServiceMock, "getProducts");
    const products = await productGetterMock.getProducts();
    expect(spyGetProduct).toHaveBeenCalled();
    expect(products).toEqual([productMock]);
  });

  it("should get product by id", async () => {
    const spy = jest.spyOn(productServiceMock, "getProductById");
    const products = await productGetterMock.getProductById("1");
    expect(spy).toHaveBeenCalled();
    expect(products).toEqual(productMock);
  })

  it("should edit product", async () => {
    const spy = jest.spyOn(productServiceMock, "editProduct");
    const products = await productEditorMock.editProduct("1", productMock);
    expect(spy).toHaveBeenCalled();
    expect(products).toEqual(productMock);
  })
});