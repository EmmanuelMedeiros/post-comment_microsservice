import { Router } from "express";

const commentController = require("./comment.controller");

const express = require("express");

export const commentRouter: Router = express();

commentRouter.get("/list", commentController.findAll);
commentRouter.get("/", commentController.findOne);
commentRouter.post("/", commentController.create);