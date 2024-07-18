'use client'

import {useState} from "react";

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });

        const data = await res.json();

        if (res.ok) {
            console.log('Регистрация успешна!');
        } else {
            console.log(data.message || 'Что-то пошло не так...');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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