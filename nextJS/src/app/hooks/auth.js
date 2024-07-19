import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import useSWR from "swr";
import axios from "@/app/lib/axios";

export const useAuth = ({middleware} = {})=>{
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const {data: user, error, mutate} = useSWR('/api/user',
        ()=>axios
            .get('/api/user')
            .then(response=>response.data.data)
            .catch(error=>{
                if (error.response.status !== 409)
                    throw error
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({setErrors, ...props}) =>{
        setErrors([]);

        await csrf();

        axios
            .post('/api/login', props)
            .then(()=>mutate() && router.push('/'))
            .catch(error =>{
                if(error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const logout = async ()=> {
        await axios.post('/api/logout');

        mutate(null);

        router.push('/')
    }

    const register = async ({setErrors, ...props})=> {
        setErrors([]);

        await csrf();

        axios
            .post('/api/register', props)
            .then(() => mutate() && router.push('/'))
            .catch(error =>{
                if(error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            });
    };

    useEffect(()=>{
        if(user || error){
            setIsLoading(false);
        }

        if(middleware === 'guest' && user) router.push('/');
        if(middleware === 'auth' && error) router.push('/');
    })

    return{
        user,
        csrf,
        isLoading,
        login,
        logout,
        register,
    }
}