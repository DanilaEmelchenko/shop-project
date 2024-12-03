import { Request, Response } from "express";
import { IProductEntity } from "./types";
import { ICommentEntity } from "../comments-api/types";
import { connection } from "../../../index";
import { mapProductsEntity } from "../../services/mapping";
import { enhanceProductsComments } from "../utils/utils";
import { throwServerError } from "../utils/error";

export const requestGET = async (req: Request, res: Response) => {
  try {
    const [productRows] = await connection!.query<IProductEntity[]>(
      "SELECT * FROM products"
    );
    const [commentRows] = await connection!.query<ICommentEntity[]>(
      "SELECT * FROM comments"
    );

    const products = mapProductsEntity(productRows);
    const result = enhanceProductsComments(products, commentRows);

    res.send(result);
  } catch (e) {
    throwServerError(res, e as Error);
  }
};
