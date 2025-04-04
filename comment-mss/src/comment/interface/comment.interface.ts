import { UUID } from "crypto";

export class IComment {
    uuid: UUID
    content: string
    author: UUID
    post: UUID
}