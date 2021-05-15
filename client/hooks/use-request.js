import axios from 'axios';
import {useState} from 'react'

const useRequest = ({url , method , body , onSuccess}) => {

    const [errors , setErrors] = useState(null)
  
    const doRequest = async () => {
        // method === "post" , "get" , "put"
        try {
            setErrors(null)
            const {data} = await  axios[method](url , body);
            if(onSuccess){
                onSuccess(data)
            }
            return data
        } catch (err) {
            setErrors(
                 <div className="alert alert-danger">
                    <ul className="my-0">
                        <h4>Oops...</h4>
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                   </div>
            )
        }
    }

    return {doRequest , errors}
}


export default useRequest