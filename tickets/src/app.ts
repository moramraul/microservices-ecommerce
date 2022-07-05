const express = require('express')
import "express-async-errors"
const expressValidator = require('express-validator')
import { json } from 'body-parser';
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { errorHandler } from '@rmm811tickets/common';
import { NotFoundError } from '@rmm811tickets/common';
import { currentUser } from "@rmm811tickets/common";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";
const cookieSession = require('cookie-session')

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);

app.use(createTicketRouter);

app.use(showTicketRouter);

app.use(indexTicketRouter)

app.use(updateTicketRouter)

app.all("*", () => {
    throw new NotFoundError()
})
app.use(errorHandler)

export {app}; 