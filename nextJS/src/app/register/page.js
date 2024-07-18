'use client'

export default function Page(){
    async function createInvoice(formData){

        const rawFormData = {
            name : formData.get('name'),
            email : formData.get('email'),
            password : formData.get('password'),
        }

        try {
            const response = await fetch('https://127.0.0.1:8000/api/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rawFormData),
            })

            if (!response.ok){
                    throw new Error('Error')
            }

            const data = await response.json()

            console.log('Register success!')
        }catch (error){
            console.error('Error: ' + error)
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      createInvoice(new FormData(e.trigger));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' className="form-control" placeholder='Имя'/>
                <input type="email" name='email' className="form-control" placeholder='Email' required/>
                <input type="password" name='password' className="form-control" placeholder='Пароль' required/>

                <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
            </form>
        </div>
    )
}