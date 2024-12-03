import { Request, Response } from "express";
import { CommentCreatePayload } from "./types";
import { connection } from "../../../index";
import { v4 as uuidv4 } from "uuid";
import { validateComment } from "../utils/utils";
import { ResultSetHeader } from "mysql2";
import { INSERT_COMMENT_QUERY } from "../../services/queries";
import { IComment, IProduct, IProductImage } from "@Shared/types";

export const requestPATCH = async (
  req: Request<{}, {}, Partial<IComment>>,
  res: Response
) => {
  try {
    let updateQuery = "UPDATE comments SET ";

    const valuesToUpdate = [];
    (["name", "body", "email"] as (keyof IComment)[]).forEach((fieldName) => {
      if (req.body.hasOwnProperty(fieldName)) {
        if (valuesToUpdate.length) {
          updateQuery += ", ";
        }

        updateQuery += `${fieldName} = ?`;
        valuesToUpdate.push(req.body[fieldName as keyof IComment]);
      }
    });

    updateQuery += " WHERE comment_id = ?";
    valuesToUpdate.push(req.body.id);

    const [info] = await connection!.query<ResultSetHeader>(
      updateQuery,
      valuesToUpdate
    );

    if (info.affectedRows === 1) {
      res.status(200);
      res.end();
      return;
    }

    const newComment = req.body as CommentCreatePayload;
    const validationResult = validateComment(newComment);

    if (validationResult) {
      res.status(400);
      res.send(validationResult);
      return;
    }

    const id = uuidv4();
    await connection!.query<ResultSetHeader>(INSERT_COMMENT_QUERY, [
      id,
      newComment.email,
      newComment.name,
      newComment.body,
      newComment.productId,
    ]);

    res.status(201);
    res.send({ ...newComment, id });
  } catch (e) {
    console.log((e as Error).message);
    res.status(500);
    res.send("Server error");
  }
};
