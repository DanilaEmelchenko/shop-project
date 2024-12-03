import { Response, Request } from "express";
import { ICommentEntity } from "./types";
import { connection } from "../../../index";
import { mapCommentsEntity } from "../../services/mapping";

export const requestGETID = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const [rows] = await connection!.query<ICommentEntity[]>(
      "SELECT * FROM comments WHERE comment_id = ?",
      [req.params.id]
    );

    if (!rows?.[0]) {
      res.status(404);
      res.send(`Comment with id ${req.params.id} is not found`);
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.send(mapCommentsEntity(rows)[0]);
  } catch (e) {
    console.debug((e as Error).message);
    res.status(500);
    res.send("Something went wrong");
  }
};
