'use client'

import {useChat} from "@/app/hooks/chat";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Input from "@/_components/input";

export default function Page(query) {
    const id = query.params.id;
    const [user, chat] = useChat();

    useEffect(() => {
        if (id) {
            chat({userID: id});
        }
    }, [id]);

    return (
        <>
            {user ?
                (
                    <>
                        <div className='d-flex flex-column gap-3 justify-content-between h-100'>
                            <div className='d-flex justify-content-between gap-3 border-bottom border-primary'>
                                <p className='h3'>
                                    {user.name}
                                </p>
                            </div>

                            <div className=''>

                            </div>

                            <form>
                                <div className={'d-flex gap-1'}>
                                    <Input name={'message'} placeholder={'Введите сообщение'} required/>

                                    <button type="submit" className="btn btn-primary">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}