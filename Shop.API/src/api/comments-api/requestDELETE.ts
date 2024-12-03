import { Request, Response } from "express";
import { connection } from "../../../index";
import { ResultSetHeader } from "mysql2";

export const requestDELETE = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const [info] = await connection!.query<ResultSetHeader>(
      "DELETE FROM comments WHERE comment_id = ?",
      [req.params.id]
    );

    if (info.affectedRows === 0) {
      res.status(404);
      res.send(`Comment with id ${req.params.id} is not found`);
      return;
    }

    res.status(200);
    res.end();
  } catch (e) {
    console.log((e as Error).message);
    res.status(500);
    res.send("Server error. Comment has not been deleted");
  }
};
