import { UUID } from "crypto";
import { dbDatasource } from "../../db-datasource";
import { Post } from "../entity/post.entity";

const postRepository = dbDatasource.getRepository(Post)

export class PostCache {

    private inCachePosts = new Set();

    async storePost(uuid: UUID) {
        this.inCachePosts.add(uuid);
        await postRepository.insert({uuid: uuid});
    };

    checkPost(uuid: UUID): boolean {
        if(this.inCachePosts.has(uuid)) {
            return true;
        } else {
            return false;
        }
    };

    deletePost(uuid: UUID) {
        this.inCachePosts.delete(uuid);
    }

    allPosts(): Set<unknown> {
        return this.inCachePosts;
    };

    clearCache() {
        
    }

}