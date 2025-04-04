import { UUID } from "crypto";
import { IComment } from "../interface/comment.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment implements IComment {

  @PrimaryGeneratedColumn("uuid")
  public readonly uuid: UUID;

  @Column()
  public readonly content: string;

  @Column({type: "uuid"})
  public readonly author: UUID;

  @Column({type: "uuid"})
  public readonly post: UUID

  constructor(uuid: UUID, content: string, author: UUID, post: UUID) {
    this.uuid = uuid;
    this.content = content;
    this.author = author;
    this.post = post
  }
}
