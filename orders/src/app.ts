const express = require('express')
import "express-async-errors"
const expressValidator = require('express-validator')
import { json } from 'body-parser';
import { errorHandler } from '@rmm811tickets/common';
import { NotFoundError } from '@rmm811tickets/common';
import { currentUser } from "@rmm811tickets/common";
import { deleteOrderRouter } from "../routes/delete";
import { newOrderRouter } from "../routes/new";
import { showOrderRouter } from "../routes/show";
import { indexOrderRouter } from "../routes";
const cookieSession = require('cookie-session')

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);

app.use(deleteOrderRouter);

app.use(newOrderRouter);

app.use(showOrderRouter)

app.use(indexOrderRouter)

app.all("*", () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}; 