'use client'

import Input from "@/_components/input";
import {useState} from "react";
import {useAuth} from "@/app/hooks/auth";

export default function Page(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const {login, user} = useAuth({middleware: 'guest'});

    const handleSubmit = async e =>{
        e.preventDefault();

        setErrors([]);

        await login({setErrors, email, password});
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                onChange={(e)=>setEmail(e.target.value)}
                required={true}
                placeholder={'Email'}
                name={'email'}
                type={'email'} />

            <Input
                onChange={(e)=>setPassword(e.target.value)}
                required={true}
                placeholder={'Password'}
                name={'password'}
                type={'password'} />

            <button type="submit" className="btn btn-primary">Войти</button>
        </form>
    )
}