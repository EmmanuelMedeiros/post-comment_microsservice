import { Request, Response } from "express";

import { CommentService } from "./comment.service";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { FindCommentDTO } from "./dto/find-comment.dto";

import { validate } from 'uuid'
import { UUID } from "crypto";
import { postCache } from "../app";

module.exports = class CommentController {

    commentService: CommentService = new CommentService();

    static async findAll(req: Request, res: Response) {
        const teste = await CommentService.findAll();
        return res.json({message: "Olá"}).status(200)
    }

    static async findOne(req: Request, res: Response) {
        
        const uuid = req.query.uuid;
        
        if(!uuid || !validate(uuid)) {
            return res.status(400).json({error: "Need to provide UUID to find a specific comment"});
        };
        const findOneUserService = await CommentService.findOne(new FindCommentDTO(uuid as UUID));

        if(findOneUserService.status !== 200) {
            return res.status(findOneUserService.status).json({error: findOneUserService.message});
        };
        return res.status(200).json({message: findOneUserService.message});
    }

    static async create(req: Request, res: Response) {
        const {content, author, post}: any = req.body;

        if(!postCache.checkPost(post)) {
            return res.status(400).json({error: "This post does not exists!"})
        };

        const createCommentDTO: CreateCommentDTO = new CreateCommentDTO(
            content,
            author,
            post
        );

        const createUserService = await CommentService.create(createCommentDTO);
        if(createUserService.status !== 201) {
            return res.status(createUserService.status).json({error: createUserService.message});
        };
        return res.status(200).json({message: createUserService.message});
    }
}