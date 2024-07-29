'use client'

import Link from "next/link";
import {useAuth} from "@/app/hooks/auth";

export default function Header() {
    const {user, logout} = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    console.log(user);

    return (
        <header>
            <div className='container-fluid'>
                <div className="header border border-primary p-3 mb-3 rounded">
                    <Link href='/users' className='btn btn-primary'>
                        Все пользователи
                    </Link>

                    {!user ? (
                        <>
                            <Link href='/register' className='btn btn-primary'>
                                Регистрация
                            </Link>

                            <Link href='/login' className='btn btn-primary'>
                                Войти
                            </Link>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleLogout}>
                                <button type="submit" className="btn btn-primary">
                                    Logout
                                </button>
                            </form>

                            <h2>привет, {user?.name}</h2>
                        </>
                    )}

                </div>
            </div>
        </header>
    )
}