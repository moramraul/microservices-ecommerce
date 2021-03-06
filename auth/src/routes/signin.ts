const express  = require('express');
import { Request, Response } from "express";
import { User } from "../models/user";
const router = express.Router()
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '@rmm811tickets/common';
import { validateRequest } from '@rmm811tickets/common';
import { BadRequestError } from '@rmm811tickets/common';
import { Password } from '../services/password';
const jwt = require("jsonwebtoken");

router.post('/api/users/signin' , [
body('email')
.isEmail()
.withMessage('Email must be valid'),
body('password')
.trim()
.notEmpty()
.withMessage('You must supply a password')
], validateRequest, async (req: Request, res: Response) => {
  
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser) {
        throw new BadRequestError("Invalid credentials")
    }

    const passwordsMatch = await Password.compare(existingUser.password, password)

    if (!passwordsMatch) {
        throw new BadRequestError("Invalid credentials")
    }

       // Generate JWT

       const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email
        },
        process.env.JWT_KEY
      );
  
      // Store it on session object
      req.session = {
        jwt: userJwt
      };
  
      res.status(200).send(existingUser);

})

export {
    router as signinRouter
}