import { UUID } from "crypto";
import { IPost } from "../interface/post.interface";
import { Entity, PrimaryColumn } from "typeorm";

@Entity("post")
export class Post implements IPost {

    @PrimaryColumn("uuid")
    uuid: UUID;

    constructor(uuid: UUID) {
        this.uuid = uuid;
    };

}