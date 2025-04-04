import { TopicEnum } from "../commons/enum/event.enum";

const amqp = require('amqplib')

export class EventRabbitmq {

    async sendEvent(message: any, topic: TopicEnum) {
        try {

            const connection = await amqp.connect("amqp://localhost");
            const channel = await connection.createChannel();
            const exchange = "postExchange";

            await channel.assertExchange(exchange, "topic", { durable: false });
            await channel.publish(exchange, topic, Buffer.from(JSON.stringify(message)));

            console.log(`Message ''${message}'' sent to exchange {${exchange}}, with topic name {${topic}}`)

            setTimeout(() => {
                connection.close();
            }, 500)

        }catch(err) {
            console.log(err);
        }
    }
}