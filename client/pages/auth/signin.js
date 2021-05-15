import{useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router'


const signin = () => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {doRequest,  errors} = useRequest({
        url : '/api/users/signin',
        method: 'post',
        body : {
            email , password
        },

        onSuccess : () => Router.push('/')
    })

    const onSubmit = async(e) => {
       e.preventDefault()
       await  doRequest()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
                 type="text" 
                 className="form-control"/>
            </div>
             <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
                 type="password" 
                 className="form-control"/>
            </div>
            {errors}
            <button className="btn btn-primary">Sign in</button>
        </form>
    )
}

export default signin
