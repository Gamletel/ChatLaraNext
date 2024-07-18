import Link from "next/link";

async function fetchUsers() {
    const res = await fetch('http://127.0.0.1:8000/api/users', {
            next: {
                revalidate: 3600
            }
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch users from API');
    }

    return await res.json();
}

export default async function Sidebar() {
    const users = await fetchUsers();

    return (
        <div className='d-flex flex-column gap-3 col-2 p-3'>
            <input type="text" name="name" id="search-user" className="search form-control"/>

            <div className="users d-flex flex-column gap-3">
                {users.map((user)=>(
                    <Link href={`/`}>
                        {user.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}