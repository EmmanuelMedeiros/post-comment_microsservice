import { UUID } from "crypto";
import { IPost } from "../interface/post.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post implements IPost {

	@PrimaryGeneratedColumn("uuid")
    public readonly uuid: UUID;

	@Column({unique: true})
    public readonly title: string;

	@Column({type: "uuid"})
    public readonly author: UUID;

	@Column({type: "int", default: 0})
    public readonly likes: number;


	constructor(uuid: UUID, title: string, author: UUID, likes: number) {
		this.uuid = uuid;
		this.title = title;
		this.author = author;
		this.likes = likes;
	}
}