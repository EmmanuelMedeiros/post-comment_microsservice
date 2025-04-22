import { DataSource } from "typeorm";
import { Comment } from "./comment/entity/comment.entity";
import { Post } from "./common/entity/post.entity";

require('dotenv').config()

export const dbDatasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Comment, Post],
    migrations: [],
    subscribers: [],
})