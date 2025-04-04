import { UUID } from "crypto";
import { TopicEnum } from "../commons/enum/event.enum";
import { EventRabbitmq } from "../events/eventBus";
import { CreatePostDTO } from "./dto/create-post.dto";
import { Post } from "./entity/post.entity";
import { PostService } from "./post.service";
import { DeleteResult } from "typeorm";

export class PostResolver {

    public readonly postService: PostService = new PostService();
    private eventRabbitMQ: EventRabbitmq = new EventRabbitmq();

    async findAll(): Promise<Post[]> {
        return await this.postService.findAll();
    }

    async findOne(postUUID: string): Promise<Post> {
        console.log("Searching for one single post");
        return
    }

    async create(incomeCreatePostDTO: CreatePostDTO): Promise<Post> {

        const createPostDTO: CreatePostDTO = new CreatePostDTO(
            incomeCreatePostDTO.title,
            incomeCreatePostDTO.author
        )

        const savedPost: Post = await this.postService.create(createPostDTO);

        await this.eventRabbitMQ.sendEvent(savedPost.uuid, TopicEnum["post.create"]);
        return savedPost;
    }

    async delete(message: {uuid: UUID}) {
        
        const uuid: UUID = message.uuid;
        const deletePost: DeleteResult = await this.postService.delete(uuid);

        if(deletePost.affected > 0) {
            await this.eventRabbitMQ.sendEvent(uuid, TopicEnum["post.delete"]);
            return `Post ${uuid} has been deleted`;
        }

        return `No post was deleted. This UUID does not exists in database.`;
    }

}