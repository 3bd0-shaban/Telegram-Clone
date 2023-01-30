import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config.js';
import errorMiddleware from './Middlewares/Error.js';
import UsersRouter from './Routes/UsersRouter.js';
import AuthRouter from './Routes/AuthRouter.js';
import GroupRouter from './Routes/GroupRouter.js';
import MessageRouter from './Routes/MessageRouter.js';
import ChatRouter from './Routes/ChatRouter.js';
const app = express();
const port = process.env.PORT || 5000;
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
mongoose.set('strictQuery',false);
mongoose
    .connect(process.env.MONGODB_URI,{ useNewUrlParser: true })
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
app.use('/api/user', UsersRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/group', GroupRouter);
app.use('/api/message', MessageRouter);
app.use('/api/chat', ChatRouter);
app.use(errorMiddleware);

