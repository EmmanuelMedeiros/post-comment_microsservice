import { CreatePostDTO } from "./dto/create-post.dto";
import { dbDatasource } from "../db.datasource";
import { Post } from "./entity/post.entity";
import { GraphQLError } from "graphql";
import { UUID } from "crypto";
import { DeleteResult } from "typeorm";

const postRepository = dbDatasource.getRepository(Post);

export class PostService {

    async findAll(): Promise<Post[]> {
        try {
            return await postRepository.find();
        }catch(err) {

            console.log(err);
            throw new GraphQLError(err.toString(), {
                extensions: {
                    code: 'BAD REQUEST',
                    httpStatus: 400
                }
            })

        }
    };

    async findOne(): Promise<Post> {
        return;
    };

    async create(createPostDTO: CreatePostDTO): Promise<Post> {
        try {
            return await postRepository.save(createPostDTO)
        }catch(err) {
            console.log(err);
            throw new GraphQLError(err.toString(), {
                extensions: {
                    code: 'BAD REQUEST',
                    httpStatus: 400
                }
            })

        }
    }

    async delete(uuid: UUID): Promise<DeleteResult> {
        try {
            return await postRepository.delete(uuid)
        } catch(err) {
            console.log(err);
            throw new GraphQLError(err.toString, {
                extensions: {
                    code: 'BAD REQUEST',
                    httpStatus: 400
                }
            })
        }
    }

}