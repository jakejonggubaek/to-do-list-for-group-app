import {useState} from 'react';
import axios from 'axios';
import Loading from './Loading';

function Create(props) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const baseUrl = window.location.origin;
    let newUrl = baseUrl + "/room/";

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        addToList(name, password);
    }

    const addToList = (name, password) => {
        axios.post("https://team-to-do-app.herokuapp.com/insert", {
            roomName: name,
            password: password,
            toDoList: []
        }).then((response)=>{
            newUrl = newUrl + response.data;
            setUrl(newUrl);
            setIsCreated(true);
            setIsLoading(false);
        });
    }

    //Function to copy url for creator to share room
    const copyUrl = () => {
        const text = document.getElementById("newUrl");
        text.select();
        document.execCommand("copy");
    }

    //Function to redirect to Room.js
    const redirect = () => {
        window.location.replace(url);
    }

    return(
        <>
            {isLoading?<Loading />
            :<section className="landing wrapper">
                
                <div>
                    {isCreated?
                    <div className="url-container">
                        <p>Your room is created!</p>
                        <p>Share the room with your teammates:</p>
                            <input className="url" readOnly type="text" value={url} id="newUrl" />
                        <div className="button-container">
                            <button onClick={copyUrl}>Copy URL</button>
                            <button onClick={redirect}>Go to Your Room</button>
                        </div>
                    </div>
                    : <form onSubmit={handleSubmit}>
                        <h2>CREATE YOUR TEAM ROOM</h2>
                        <div className="input-container">
                            <label htmlFor=""></label>
                            <input required type="text" placeholder="TEAM NAME" onChange={(e) => { setName(e.target.value) }} />
                        </div>
                            <div className="input-container">
                            <label htmlFor=""></label>
                            <input type="text" placeholder="PASSWORD(optional)" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <button type="submit">CREATE</button>
                    </form>}
                </div>
            </section>
            }
        </>
    )
}

export default Create;