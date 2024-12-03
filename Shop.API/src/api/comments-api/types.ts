import { RowDataPacket } from "mysql2/index";
import { IComment, IProduct, IProductImage } from "@Shared/types";

export type CommentCreatePayload = Omit<IComment, "id">;

export type CommentValidator = (comment: CommentCreatePayload) => string | null;

export interface ICommentEntity extends RowDataPacket {
  comment_id: string;
  name: string;
  email: string;
  body: string;
  product_id: string;
}
