import { RowDataPacket } from "mysql2/index";
import { IComment, IProduct, IProductImage } from "@Shared/types";

export type ProductCreatePayload = Omit<IProduct, "id" | "comments">;

export interface IProductEntity extends IProduct, RowDataPacket {
  product_id: string;
}

export interface IProductSearchFilter {
  title?: string;
  descriptions?: string;
  priceFrom?: number;
  priceTo?: number;
}
