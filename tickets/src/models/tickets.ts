import mongoose from 'mongoose';

/**
 * @description An interface that describe the properties required to create a new Tickets
 */
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

/**
 * @description An interface that describe the properties a Ticket Document has (single Ticket)
 */
interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

/**
 * @description An interface that describe the properties Ticket model has
 */
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs : TicketAttrs) : TicketDoc
}


const ticketSchema = new mongoose.Schema({

    title:{
        type: String,
        required : true
    },

    price:{
        type: Number,
        required: true
    },
    userId:{
      type:String,
      required:true
    }
}, {
    toJSON:{
        transform(doc , ret){
            ret.id = ret._id;
            delete ret._id
        }
    }
});

ticketSchema.statics.build = (attrs:TicketAttrs) => {
    return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc , TicketModel>('Ticket' , ticketSchema)

export {Ticket}