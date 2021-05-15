import express , {Request , Response} from 'express';
import {body} from 'express-validator'
import {requireAuth , validateRequest} from '@teyidev/common';
import { Ticket } from '../models/tickets';
import { TicketCreatedPublisher } from './../events/publishers/ticket-created-publisher';
import { natsWrapper } from './../nats-wrapper';


const router = express.Router();

/**
 * @description create a new tickets
 */

router.post('/api/tickets', requireAuth , [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({gt: 0}).withMessage('Price must be greather than 0')
] , validateRequest, async (req:Request , res:Response) => {
    const {title, price} = req.body;
    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    })
    await ticket.save()

   // publish the creation of the ticket
    await new TicketCreatedPublisher(natsWrapper.client).publish({
       id: ticket.id,
       title: ticket.title,
       price: ticket.price,
       userId: ticket.userId
   })
    res.status(201).send(ticket)
})

export{router as createTicketRouter}
