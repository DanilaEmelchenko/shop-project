import { Request, Response } from "express";
import { connection } from "../../../index";
import { mapProductsEntity } from "../../services/mapping";
import {
  enhanceProductsComments,
  getProductsFilterQuery,
} from "../utils/utils";
import { throwServerError } from "../utils/error";
import { IProductSearchFilter, IProductEntity } from "./types";
import { ICommentEntity } from "../comments-api/types";

export const requestSearchGET = async (
  req: Request<{}, {}, {}, IProductSearchFilter>,
  res: Response
) => {
  try {
    const [query, values] = getProductsFilterQuery(req.query);
    const [rows] = await connection!.query<IProductEntity[]>(query, values);

    if (!rows?.length) {
      res.status(404);
      res.send(`Products are not found`);
      return;
    }

    const [commentRows] = await connection!.query<ICommentEntity[]>(
      "SELECT * FROM comments"
    );

    const products = mapProductsEntity(rows);
    const result = enhanceProductsComments(products, commentRows);

    res.send(result);
  } catch (e) {
    throwServerError(res, e as Error);
  }
};
