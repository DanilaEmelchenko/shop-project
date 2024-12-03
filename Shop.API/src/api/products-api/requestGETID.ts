import { Request, Response } from "express";
import { IProductEntity } from "./types";
import { ICommentEntity } from "../comments-api/types";
import { connection } from "../../../index";
import { mapProductsEntity, mapCommentsEntity } from "../../services/mapping";
import { throwServerError } from "../utils/error";

export const requestGETID = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const [rows] = await connection!.query<IProductEntity[]>(
      "SELECT * FROM products WHERE product_id = ?",
      [req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Product with id ${req.params.id} is not found`);
      return;
    }

    const [comments] = await connection!.query<ICommentEntity[]>(
      "SELECT * FROM comments WHERE product_id = ?",
      [req.params.id]
    );

    const product = mapProductsEntity(rows)[0];

    if (comments.length) {
      product.comments = mapCommentsEntity(comments);
    }

    res.send(product);
  } catch (e) {
    throwServerError(res, e as Error);
  }
};
