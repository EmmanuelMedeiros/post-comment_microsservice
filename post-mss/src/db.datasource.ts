import "reflect-metadata"
import { DataSource } from "typeorm";
import { Post } from "./post/entity/post.entity";

require('dotenv').config();

export const dbDatasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Post],
    migrations: [],
    subscribers: [],
})