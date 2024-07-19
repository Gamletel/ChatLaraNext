'use client'

import {useState} from "react";
import {useAuth} from "@/app/hooks/auth";


export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const {register, isLoading, user} = useAuth({middleware: 'guest'});

    const submitForm = async e => {
        e.preventDefault();

        setErrors([])

        await register({setErrors, name, email, password})
    }

    return (
        <div>
            <form onSubmit={submitForm} autoComplete={false}>
                <input type="text"
                       name='name'
                       onChange={(e)=>setName(e.target.value)}
                       className="form-control"
                       placeholder='Имя'/>
                <input type="email"
                       name='email'
                       onChange={(e)=>setEmail(e.target.value)}
                       className="form-control"
                       placeholder='Email'
                       required/>
                <input type="password"
                       name='password'
                       onChange={(e)=>setPassword(e.target.value)}
                       className="form-control"
                       placeholder='Пароль'
                       required/>

                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
        </div>
    )
}