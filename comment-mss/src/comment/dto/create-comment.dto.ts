import { UUID } from "crypto";
import { IComment } from "../interface/comment.interface";

export class CreateCommentDTO implements Pick<IComment, "content" | "author" | "post"> {

  public readonly content: string;
  public readonly author: UUID;
  public readonly post: UUID

  constructor(content: string, author: UUID, post: UUID) {
    this.content = content;
    this.author = author;
    this.post = post
  }
}
