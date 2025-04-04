const express = require('express');
import { Application } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { postSchema } from "./post/post.schema";
import { dbDatasource } from "./db.datasource";
import { EventRabbitmq } from "./events/eventBus";

const app: Application = express();

app.use(express.json());

dbDatasource
.initialize()
.then(() => {
    console.log("Database connection successfully initialized");
})
.catch((err) => {
    console.log("Error while trying to connect to database: " + err.toString())
})

app.use(
    '/post',
    createHandler({
        schema: postSchema
    })
)

const events: EventRabbitmq = new EventRabbitmq();

app.listen(4000, () => {
    console.log("Server running in port 4000");
})