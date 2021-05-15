import {scrypt , randomBytes} from 'crypto'
import {promisify} from 'util'

//Promisify our scrypt function
const scryptAsync = promisify(scrypt)

export class Password {

    static async toHash(password:string){
        // generate a salt
        const salt = randomBytes(8).toString('hex')
        // hash the password (buffer)
        const buf = (await scryptAsync(password , salt , 64)) as Buffer
       // return it as a string
        return `${buf.toString('hex')}.${salt}`
    }

    static async compare(storedPassword:string , suppliedPassword:string){
        // get the hash password and the salt from the storedPassword
        const [hashedPassword , salt] = storedPassword.split('.')
         // hash the suppliedPassword (buffer)
        const buf = (await scryptAsync(suppliedPassword , salt , 64)) as Buffer

       return buf.toString('hex') === hashedPassword
    }
}



