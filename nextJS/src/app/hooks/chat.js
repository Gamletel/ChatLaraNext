import {useRouter} from "next/navigation";
import axios from "@/app/lib/axios";
import {useState} from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export const useChat = () => {

    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: process.env.VITE_REVERB_APP_KEY,
        wsHost: process.env.VITE_REVERB_HOST,
        wsPort: process.env.VITE_REVERB_PORT,
        wssPort: process.env.VITE_REVERB_PORT,
        forceTLS: (process.env.VITE_REVERB_SCHEME ?? 'https') === 'http',
        enabledTransports: ['ws', 'wss'],
    });

    const [user, setUser] = useState(null);

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const chat = async ({userID}) => {
        try {
            await csrf();

            const response = await axios.get(`/api/chat/${userID}`);
            setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    return [
        user,
        chat
    ];
}