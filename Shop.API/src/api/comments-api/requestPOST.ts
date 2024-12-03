import { Request, Response } from "express";
import { connection } from "../../../index";
import { ICommentEntity, CommentCreatePayload } from "./types";
import { v4 as uuidv4 } from "uuid";
import { ResultSetHeader } from "mysql2";
import { validateComment } from "../utils/utils";
import {
  INSERT_COMMENT_QUERY,
  COMMENT_DUPLICATE_QUERY,
} from "../../services/queries";

export const requestPOST = async (
  req: Request<{}, {}, CommentCreatePayload>,
  res: Response
) => {
  const validationResult = validateComment(req.body);

  if (validationResult) {
    res.status(400);
    res.send();
    return;
  }

  const { name, email, body, productId } = req.body;

  const [sameResult] = await connection!.query<ICommentEntity[]>(
    COMMENT_DUPLICATE_QUERY,
    [email.toLowerCase(), name.toLowerCase(), body.toLowerCase(), productId]
  );

  console.log(sameResult[0]?.comment_id);

  if (sameResult.length) {
    res.status(422);
    res.send("Comment with the same fields already exists");
    return;
  }

  const id = uuidv4();
  const [info] = await connection!.query<ResultSetHeader>(
    INSERT_COMMENT_QUERY,
    [id, email, name, body, productId]
  );

  console.log(info);

  res.status(201);
  res.send(`Comment id:${id} has been added!`);
};
