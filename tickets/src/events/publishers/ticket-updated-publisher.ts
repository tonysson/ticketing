import {Publisher , Subjects , TicketUpdatedEvent} from '@teyidev/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated
}