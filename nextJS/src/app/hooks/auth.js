import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import useSWR from "swr";
import axios from "@/app/lib/axios";


export const useAuth = ({middleware} = {}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const {data: user, error, mutate} = useSWR('/api/user',
        () => axios
            .get('/api/user')
            .then(response => {
                console.log('Response from /api/user:', response);
                return response.data.user;
            })            .catch(error => {
                if (error.response.status !== 409)
                    throw error
            })
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({setErrors, ...props}) => {
        await csrf();

        setErrors([]);

        axios
            .post('/api/login', props)
            .then(response => {
                const token = response.data.access_token;

                localStorage.setItem('token', token);

                // Обновляем данные пользователя
                mutate('/api/user');
                router.push('/');
                window.location.reload();
            })
            .catch(error => {
                // if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const logout = async () => {
        try {
            await csrf();

            await axios.post('/api/logout')
                .then(()=>mutate());

            localStorage.removeItem('token');

            router.push('/');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    const register = async ({setErrors, ...props}) => {
        setErrors([]);

        await csrf();

        axios
            .post('/api/register', props)
            .then(response => {
                // const token = response.data.access_token;
                // localStorage.setItem('token', token);

                mutate('/api/user');
                router.push('/');
            }).catch(error => {
            if (error.response.status !== 422) throw error

            setErrors(Object.values(error.response.data.errors).flat())
        });
    };

    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }

        if (middleware === 'guest' && user) router.push('/');
        if (middleware === 'auth' && error) router.push('/');
    })

    // console.log(user);
    // console.log(localStorage.getItem('token'));

    return {
        user,
        csrf,
        isLoading,
        login,
        logout,
        register,
    }
}