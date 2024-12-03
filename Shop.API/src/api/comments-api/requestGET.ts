import { Request, Response } from "express";
import { ICommentEntity } from "./types";
import { connection } from "../../../index";
import { mapCommentsEntity } from "../../services/mapping";

export const requestGET = async (req: Request, res: Response) => {
  try {
    const [comments] = await connection!.query<ICommentEntity[]>(
      "SELECT * FROM comments"
    );

    res.setHeader("Content-Type", "application/json");
    res.send(mapCommentsEntity(comments));
  } catch (e) {
    console.debug((e as Error).message);
    res.status(500);
    res.send("Something went wrong");
  }
};
