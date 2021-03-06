const express  = require('express');
import { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest, NotAuthorizedError, NotFoundError } from "@rmm811tickets/common";
import { Ticket } from "../models/tickets";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router()

router.put('/api/tickets/:id', requireAuth, [
    body('title')
    .not()
    .isEmpty()
    .withMessage("Title must be provided"),
    body('price')
    .isFloat({gt: 0})
    .withMessage("Price must be greater than zero")
], validateRequest ,async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        new NotFoundError()
    }

    if (ticket.userId !== req.currentUser.id)
    {
        throw new NotAuthorizedError()
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    })

    res.send(ticket)
})

export {router as updateTicketRouter}
