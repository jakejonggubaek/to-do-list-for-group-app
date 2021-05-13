import { useState } from 'react';

const Password = ({ password, setAuthorized }) => {

    const [typedPassword, setTypedPassword] = useState('');
    
    const handleAuthorize = (e) => {
        e.preventDefault();
        if (password === typedPassword) {
            setAuthorized(true);
        } else {
            setTypedPassword('');
            alert('Password incorrect!');
        }
    }
    
    return (
        <div className = "password" >
            <form onSubmit={handleAuthorize}>
                <label className="sr-only" htmlFor="password"></label>
                <input className="password-container" type="text" id="password" value={typedPassword} placeholder="PASSWORD" onChange={(e) => { setTypedPassword(e.target.value) }} />
                <button type="submit">Enter the Room</button>
            </form>
        </div >
    )
}

export default Password;