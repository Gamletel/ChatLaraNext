import Link from "next/link";

export default function Home() {
    return (
        <main className='d-flex gap-3'>
            <Link href='/users' className='btn btn-primary'>
                Все пользователи
            </Link>

        </main>
    );
}
