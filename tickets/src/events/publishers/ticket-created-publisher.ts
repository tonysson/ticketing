import {Publisher , Subjects , TicketCreatedEvent} from '@teyidev/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated
}