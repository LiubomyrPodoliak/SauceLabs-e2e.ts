import { parsePriceString } from "../../../utils/string.utils";

export class ProductItem {
  readonly name: string;
  readonly description: string;
  readonly price: number;

  constructor(params: { name: string; description: string; price: number }) {
    this.name = params.name;
    this.description = params.description;
    this.price = params.price;
  }

  toString(): string {
    return `${this.name} — ${this.description} — $${this.price.toFixed(2)}`;
  }
}

export class ProductItemBuilder {
  private _name?: string;
  private _description?: string;
  private _price?: number;

  setName(name: string): this {
    this._name = name;
    return this;
  }

  setDescription(description: string): this {
    this._description = description;
    return this;
  }

  setPrice(price: number | string): this {
    if (typeof price === "string") {
      this._price = parsePriceString(price);
    } else {
      this._price = price;
    }
    return this;
  }

  build(): ProductItem {
    if (this._name == null)
      throw new Error("ProductItemBuilder: name is required");
    if (this._description == null)
      throw new Error("ProductItemBuilder: description is required");
    if (this._price == null)
      throw new Error("ProductItemBuilder: price is required");
    return new ProductItem({
      name: this._name,
      description: this._description,
      price: this._price,
    });
  }
}
