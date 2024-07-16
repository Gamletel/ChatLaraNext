import {useEffect, useState} from "react";

export default function Page(){
    const [data, setData] = useState(null)

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/users')
            .then((res)=>res.json())
            .then((data)=>{
                setData(data)
            })
    }, [])

    console.log(data);
}