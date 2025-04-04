import { UUID } from "crypto";
import { IComment } from "../interface/comment.interface";

export class FindCommentDTO implements Pick<IComment, "uuid"> {
    public readonly uuid: UUID

    constructor(uuid: UUID) {
        this.uuid = uuid
    }
}