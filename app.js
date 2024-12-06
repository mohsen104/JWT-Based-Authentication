import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import ConnectedToMongodb from './src/common/configs/mongoose.config.js';
import SwaggerConfig from './src/common/configs/swagger.config.js';
import NotFoundHandler from './src/common/exceptions/not-found.handler.js';
import AllExceptionHandler from './src/common/exceptions/all-exception.handler.js';
import AllRoutes from './src/app.routes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { redisConfig } from './src/common/configs/redis.config.js';
import helmet from 'helmet';
import rateLimiter from './src/common/middlewares/rateLimiter.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const cookieParserSecretKey = process.env.COOKIE_PARSER_SECRET_KEY;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(cookieParserSecretKey));

ConnectedToMongodb(uri);
redisConfig();

rateLimiter(app);

app.use("/api", AllRoutes);

SwaggerConfig(app);

NotFoundHandler(app);

AllExceptionHandler(app);

app.listen(port, () => {
    console.log(`server run on port : ${port}`);
});