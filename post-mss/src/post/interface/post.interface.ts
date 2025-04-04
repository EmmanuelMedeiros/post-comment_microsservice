import { UUID } from "crypto"

export interface IPost {
    uuid: UUID,
    author: UUID,
    title: string,
    likes: number,
}