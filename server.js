import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorMiddleware from './Middlewares/Error.js';
import UsersRouter from './Routes/UsersRouter.js';
import GroupRouter from './Routes/GroupRouter.js';
import MessageRouter from './Routes/MessageRouter.js';
import ChatRouter from './Routes/ChatRouter.js';
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://tech-market.onrender.com',
        ],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan('common'));
// app.use(fileUpload({ useTempFiles: true }));
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Successfully started at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
app.use('/api/auth', UsersRouter);
app.use('/api/group', GroupRouter);
app.use('/api/message', MessageRouter);
app.use('/api/chat', ChatRouter);
app.use(errorMiddleware);

