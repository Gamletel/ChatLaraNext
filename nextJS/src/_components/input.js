export default function Input({name, type = 'text', placeholder='', required=false, onChange}){
    return(
        <input type={type} name={name} onChange={onChange} placeholder={placeholder} required={required} className={'form-control'}/>
    )
}