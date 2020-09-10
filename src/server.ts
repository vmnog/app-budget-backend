import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import routes from "./routes";
import AppError from "./errors/AppError";

import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 500,
        message: "Internal server error",
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}!`);
});
