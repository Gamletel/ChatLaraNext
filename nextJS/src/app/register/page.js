'use client'

import {useState} from "react";
import {useAuth} from "@/app/hooks/auth";
import Input from "@/_components/input";


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
            <form onSubmit={submitForm}>
                <Input type="text"
                       name='name'
                       onChange={(e)=>setName(e.target.value)}
                       placeholder='Имя'/>

                <Input type="email"
                       name='email'
                       onChange={(e)=>setEmail(e.target.value)}
                       placeholder='Email'
                       required/>

                <Input type="password"
                       name='password'
                       onChange={(e)=>setPassword(e.target.value)}
                       placeholder='Пароль'
                       required/>

                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
        </div>
    )
}