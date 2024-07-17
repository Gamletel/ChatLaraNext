async function fetchUsers() {
    const res = await fetch('http://127.0.0.1:8000/api/users');
    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }
    return await res.json();
}

export default async function UsersPage() {
    const users = await fetchUsers();

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}