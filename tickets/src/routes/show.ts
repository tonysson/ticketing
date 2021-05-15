import express , {Request , Response} from 'express';
import {Ticket} from '../models/tickets';
import {NotFoundError} from '@teyidev/common';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * @description get a specific ticket
 */

router.get('/api/tickets/:id', async(req:Request , res:Response) => {
    const ticketId  = req.params.id
    if(!mongoose.isValidObjectId(ticketId)){
        throw new NotFoundError();
    }
    const ticket = await Ticket.findById(ticketId);
    if(!ticket) throw new NotFoundError()
    res.send(ticket)

});

export {router as showTicketRouter};