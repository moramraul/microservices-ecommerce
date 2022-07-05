const express = require('express');
import { Request, Response } from "express";
import "express-async-errors"
import { Order } from "../src/models/order";
import { requireAuth } from "@rmm811tickets/common";
const expressValidator = require('express-validator')

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});

export { router as indexOrderRouter };
