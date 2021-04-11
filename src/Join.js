import {useState} from 'react';

function Join() {

    const [id, setId] = useState('');
    const [password, setPassword] =useState('');

    const redirect = (e) => {
        e.preventDefault();
        const baseUrl = window.location.origin;
        const newUrl = baseUrl + "/room/" + id;
        window.location.replace(newUrl);
    }

    return(
        <>
            <form>
                <label htmlFor="id">Room ID</label>
                <input id="id" required onChange={(e) => {setId(e.target.value);}}></input>
                <label htmlFor="password">Room Password</label>
                <input id="password" required onChange={(e) => { setPassword(e.target.value); }}></input>
                <button onClick={redirect}>Join</button>
            </form>
        </>
    );
}

export default Join;