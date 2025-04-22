import { Application, Request, Response } from "express";

import { createProxyMiddleware } from 'http-proxy-middleware';

const express = require('express');
const app: Application = express();
const port: number = 3000

app.use('/api/post', createProxyMiddleware({
    target: 'http://127.0.0.1:3002'

}))
app.use('/api/comment', createProxyMiddleware({
    target: 'http://127.0.0.1:3001'

}))

app.listen(port, (err) => {
    if(err) {
        console.log(err.toString());
    };
    console.log(`Server running in port ${port}`)
})
