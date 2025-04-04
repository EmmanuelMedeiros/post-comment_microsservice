import { Repository } from "typeorm";
import { dbDatasource } from "../db-datasource";

import { CreateCommentDTO } from "./dto/create-comment.dto";
import { Comment } from "./entity/comment.entity";
import { UUID } from "crypto";
import { FindCommentDTO } from "./dto/find-comment.dto";
import { postCache } from "../app";

const commentRepository: Repository<Comment> = dbDatasource.getRepository(Comment);

export class CommentService {

    static async findAll(): Promise<Comment[]> {
        return;
    }

    static async findOne(findCommentDTO: FindCommentDTO): Promise<endMessage> {

        try {
            const findComment: Comment|null = await commentRepository.findOne({
                where: {
                    uuid: findCommentDTO.uuid
                }
            });
            return {status: 200, message: findComment};
        }catch(err) {
            return {status: 500, message: err.toString()};
        }
    }

    static async create(createCommentDTO: CreateCommentDTO): Promise<endMessage> {
        try {

            if(!postCache.checkPost(createCommentDTO.post)) {
                return ({status: 400, message: "This post does not exists!"});
            };

            const insertComment:Comment = await commentRepository.save(createCommentDTO);
            return {status: 201, message: insertComment}
        }catch(err) {
            return {status: 500, message: err.toString()};
        }
    }

}