const express = require("express");
import { Application } from "express";
import { commentRouter } from "./comment/comment.route";
import { dbDatasource } from "./db-datasource";
import { EventRabbitmq } from "./events/eventBus";
import { PostCache } from "./common/postCache/post.cache";

const app: Application = express();

dbDatasource.initialize()
.then(() => {
  console.log("Connection with database successfully done");
})
.catch((err) => {
  console.log(`Error while trying to connect to database: ${err}`)
})

app.use(express.json());
app.use("/comment", commentRouter);

const eventRabbitmq: EventRabbitmq = new EventRabbitmq();
export const postCache: PostCache = new PostCache();

app.listen(4001, () => {
  console.log("Server running in port 4001");
  eventRabbitmq.consumeMessage();
});
