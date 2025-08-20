// ...existing code...
import type { Locator } from "@playwright/test";

/**
 * ProductItem - plain model for an item on https://www.saucedemo.com/inventory.html
 * Fields:
 *  - name: product title
 *  - description: product description
 *  - price: numeric price (e.g. 15.99)
 */
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

/**
 * ProductItemBuilder - fluent builder for ProductItem
 * Usage:
 *   const item = new ProductItemBuilder()
 *     .setName("Sauce Labs Bolt T-Shirt")
 *     .setDescription("Comfortable cotton tee")
 *     .setPrice(15.99)
 *     .build();
 */
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

  /**
   * Accepts number or string like "$15.99" or "15,99"
   */
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

/* Utility */
function parsePriceString(raw: string): number {
  // remove currency symbols and spaces, support comma or dot decimals
  const normalized = raw.replace(/[^\d,.-]/g, "").replace(",", ".");
  const n = Number(normalized);
  if (Number.isNaN(n)) throw new Error(`Cannot parse price from "${raw}"`);
  return n;
}
// ...existing code...
