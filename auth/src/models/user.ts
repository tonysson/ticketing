import mongoose from 'mongoose';
import { Password } from './../services/password';


/**
 * @description An interface that describe the properties required to create a new User
 */
interface UserAttrs {
    email: string;
    password: string;
}

/**
 * @description An interface that describe the properties User model has
 */
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs:UserAttrs): UserDoc;
}

/**
 * @description An interface that describe the properties a User Document has (single User)
 */
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({

    email :{
        type:String,
        required: true
    },

    password:{
         type:String,
        required: true
    }
}, {
    toJSON: {
        transform(doc , ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
})

/**
 * @description hash the user password any time we modified it
 * THIS is refer to the User
 */
userSchema.pre('save' , async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

/**
 * @param attrs UserAttrs interface
 * @returns new User with the right parameters 
 */
userSchema.statics.build =  (attrs:UserAttrs) => {
 return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User' , userSchema)


export {User}