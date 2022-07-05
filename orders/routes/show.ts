const express = require('express');
import { Request, Response } from "express";
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError,
  } from '@rmm811tickets/common';
  import { Order } from "../src/models/order";
  
  const router = express.Router();
  
  router.get(
    '/api/orders/:orderId',
    requireAuth,
    async (req: Request, res: Response) => {
      const order = await Order.findById(req.params.orderId).populate('ticket');
  
      if (!order) {
        throw new NotFoundError();
      }
      if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }
  
      res.send(order);
    }
  );
  
  export { router as showOrderRouter };
  