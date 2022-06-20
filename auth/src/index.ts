const express = require('express')
import "express-async-errors"
const expressValidator = require('express-validator')
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const cookieSession = require('cookie-session')
import mongoose from "mongoose";
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", () => {
    throw new NotFoundError()
})
app.use(errorHandler)


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }

    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth",);
        console.log("Conected to MongoDB")
    }
    catch (err) {
        console.error(err);
        console.log("Failed to connect to DB")
    }
    app.listen(3000, () => {
        console.log("Listening on 3000")
    })
}

start()


