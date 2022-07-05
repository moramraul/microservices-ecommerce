const express  = require('express');
import { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@rmm811tickets/common";
import { Ticket } from "../models/tickets";
import { createTicketRouter } from "./new";
import { NotFoundError } from "@rmm811tickets/common";

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        throw new NotFoundError()
    }
    res.send(ticket)
})


export {router as showTicketRouter}