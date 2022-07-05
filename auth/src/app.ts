const express = require('express')
import "express-async-errors"
const expressValidator = require('express-validator')
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from '@rmm811tickets/common';
import { NotFoundError } from '@rmm811tickets/common';
const cookieSession = require('cookie-session')

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}; 