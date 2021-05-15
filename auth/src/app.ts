import express , {Request , Response} from 'express'
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler , NotFoundError} from '@teyidev/common';
import { currentUserRouter } from './routes/current-user';


const app = express();
app.set('trust proxy' , true) // enable https secure protocol
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' 
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// throw error when trying to go to any route does not exist
app.all('*' , async (req: Request , res:Response) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app} ; 