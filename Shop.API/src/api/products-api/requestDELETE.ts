import { Request, Response } from "express";
import { connection } from "../../../index";
import { ResultSetHeader } from "mysql2";
import { throwServerError } from "../utils/error";

export const requestDELETE = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const [info] = await connection!.query<ResultSetHeader>(
      "DELETE FROM products WHERE product_id = ?",
      [req.params.id]
    );

    if (info.affectedRows === 0) {
      res.status(404);
      res.send(`Product with id ${req.params.id} is not found`);
      return;
    }

    res.status(200);
    res.end();
  } catch (e) {
    throwServerError(res, e as Error);
  }
};
