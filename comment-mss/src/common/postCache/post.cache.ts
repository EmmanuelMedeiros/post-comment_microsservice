import { UUID } from "crypto";

export class PostCache {

    private inCachePosts = new Set();

    storePost(uuid: UUID): void {
        this.inCachePosts.add(uuid);
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
    }

}