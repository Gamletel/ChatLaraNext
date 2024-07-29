'use client';
import Link from "next/link";
import {useState, useEffect} from "react";

async function fetchUsers() {
    const res = await fetch("http://127.0.0.1:8000/api/users", {
        next: {
            revalidate: 3600,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users from API");
    }

    return await res.json();
}

export default function Sidebar() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(setUsers).catch(console.error);
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.name.toLowerCase().includes(searchInput.toLowerCase()))
        )
    }, [searchInput, users]);

    return (
        <div className="d-flex flex-column gap-3 col-2 p-3">
            <input
                type="text"
                name="name"
                id="name"
                className="search form-control"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <div className="users d-flex flex-column gap-3">
                {filteredUsers.map((user)=>(
                    <Link href={`/chat/${user.id}`} key={user.id}>{user.name}</Link>
                    ))}
            </div>
        </div>
    );
}