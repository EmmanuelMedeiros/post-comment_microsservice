import { UUID } from "crypto";
import { IPost } from "../interface/post.interface";

export class CreatePostDTO implements Pick<IPost, "title"|"author"> {
    public readonly title: string;
    public readonly author: UUID;

	constructor(title: string, author: UUID) {
		this.title = title;
        this.author = author
	}

} 