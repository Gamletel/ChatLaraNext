import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className='container-fluid'>
                <div className="header border-primary p-1 mb-3">
                    <Link href='/users' className='btn btn-primary'>
                        Все пользователи
                    </Link>
                    <Link href='/register' className='btn btn-primary'>
                        Регистрация
                    </Link>
                </div>
            </div>
        </header>
    )
}