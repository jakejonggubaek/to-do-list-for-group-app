import { useState } from 'react';

const Password = ({ password, isPassword, setAuthorized, setUserName }) => {

    const [typedPassword, setTypedPassword] = useState('');
    const [name, setName] = useState('');
    
    const handleAuthorize = (e) => {
        e.preventDefault();
        if (password === typedPassword) {
            setAuthorized(true);
        } else {
            setTypedPassword('');
            alert('Password incorrect!');
        }
        setUserName(name);
    }
    
    return (
        <div className = "password" >
            <form onSubmit={handleAuthorize}>
                <label className="sr-only" htmlFor="username"></label>
                <input className="password-container" type="text" id="username" value={name} placeholder="YOUR NAME" required onChange={(e) => { setName(e.target.value) }} />
                {
                    isPassword?
                    <div>
                        <label className="sr-only" htmlFor="password"></label>
                        <input className="password-container" type="text" id="password" value={typedPassword} placeholder="PASSWORD" onChange={(e) => { setTypedPassword(e.target.value) }} />
                    </div>
                
                    : <div></div>

                }
                
                <button className="submit-button" type="submit">Enter the Room</button>
            </form>
        </div >
    )
}

export default Password;