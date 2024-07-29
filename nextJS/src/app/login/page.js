'use client'

import Input from "@/_components/input";
import {useEffect, useState} from "react";
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

    useEffect(() => {
        console.log(errors);
    }, [errors]);

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

            {errors.message ? <div className='text-sm text-danger'>{errors.message}</div> : null}
        </form>
    )
}