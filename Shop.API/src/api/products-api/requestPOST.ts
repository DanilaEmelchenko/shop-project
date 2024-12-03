import { Request, Response } from "express";
import { connection } from "../../../index";
import { v4 as uuidv4 } from "uuid";
import { ResultSetHeader } from "mysql2";
import { ProductCreatePayload } from "./types";
import { INSERT_PRODUCT_QUERY } from "../../services/queries";
import { throwServerError } from "../utils/error";

export const requestPOST = async (
  req: Request<{}, {}, ProductCreatePayload>,
  res: Response
) => {
  try {
    const { title, descriptions, price } = req.body;
    const id = uuidv4();
    await connection!.query<ResultSetHeader>(INSERT_PRODUCT_QUERY, [
      id,
      title || null,
      descriptions || null,
      price || null,
    ]);

    res.status(201);
    res.send(`Product id:${id} has been added!`);
  } catch (e) {
    throwServerError(res, e as Error);
  }
};
