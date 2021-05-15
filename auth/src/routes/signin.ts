import express ,{Request ,Response} from 'express';
import {body} from 'express-validator';
import { User } from '../models/user';
import { validateRequest , BadRequestError  } from '@teyidev/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/api/users/signin',
    [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password')
            .trim()
            .notEmpty()
            .withMessage('You must provide a password')
    ] ,
    validateRequest,
    async (req: Request , res: Response) =>{

        const {email , password} = req.body;
        // check for the existing user email
        const existingUser = await User.findOne({email})
        if(!existingUser){
            throw new BadRequestError('Invalid credentials')
        }
       // check if password matches
        const passwordMatch = await Password.compare(existingUser.password , password)
        if(!passwordMatch){
            throw new BadRequestError('Invalid credentials')
        }

        // generate JWT
    const userJwt = jwt.sign({
      id : existingUser.id,
      email : existingUser.email
    }, process.env.JWT_KEY!)
    
    // store it on session object
    req.session = {
      jwt: userJwt
    }
    res.status(200).send(existingUser)

});

export {router as signinRouter};
