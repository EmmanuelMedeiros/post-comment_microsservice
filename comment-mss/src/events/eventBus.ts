import { postCache } from "../app";
import { TopicEnum } from "../common/enum/topic.enum";

const amqp = require('amqplib');

interface Event {
    type: TopicEnum;
    data: any
}

export class EventRabbitmq {

    async consumeMessage() {
        try {
            const connection = await amqp.connect("amqp://localhost");
            const channel = await connection.createChannel();
            const exchange = "postExchange";
            const queue = "commentQueue";
    
            await channel.assertExchange(exchange, "topic", { durable: false });
    
            const q = await channel.assertQueue(queue, { durable: false });    
            await channel.bindQueue(q.queue, exchange, 'post.#');
    
            await channel.consume(q.queue, (msg) => {
                if (msg) {

                    const postUUID = JSON.parse(msg.content.toString());

                    if(msg.fields.routingKey === TopicEnum["post.create"]) {    
                        postCache.storePost(postUUID);
                        console.log(`Post ${postUUID} inserted in cache`)
                        channel.ack(msg);                        
                        return;
                    };

                    if(msg.fields.routingKey === TopicEnum["post.delete"]) {
                        postCache.deletePost(postUUID);
                        console.log(`Post ${postUUID} deleted from cache`);
                        channel.ack(msg)
                        return;
                    }

                }
            });
    
        } catch (err) {
            console.log("❌ Error consuming message:", err);
        }
    }
}
