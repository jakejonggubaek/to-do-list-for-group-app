import axios from 'axios';
import { useState, useEffect } from 'react';

import Loading from '../Loading';
import Password from './Password/Password';
import Chat from './Chat/Chat';
import ToDoList from './ToDoList/ToDoList';
import Note from './Note/Note';


function Room(props) {

    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [toDo, setToDo] = useState({toDo:'', isDone:false});
    const [toDoList, setToDoList] = useState([]);
    const [displayedToDoList, setDisplayedToDoList] = useState([]);
    const [allDone, setAllDone] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [screenWidth, setScreenWidth] = useState(0);
    const [isChat, setIsChat] = useState(false);
    const [isList, setIsList] = useState(true);
    const [isNote, setIsNote] = useState(false);

    const roomId = props.match.params.uniqueKey;

    useEffect(()=>{
        axios.put("https://team-to-do-app.herokuapp.com/read", { id: roomId }).then((response) => {

            setRoomName(response.data.roomName);
            setPassword(response.data.password);
            setToDoList(response.data.toDoList);
            setDisplayedToDoList(response.data.toDoList);
            if (!response.data.password){
                setIsPassword(false);
            }
            setIsLoading(false);
            
        });

    }, [roomId])

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

    }, [screenWidth])

    useEffect(() => {
        axios.put("https://team-to-do-app.herokuapp.com/update",
            {
                id: roomId,
                toDoList: toDoList,
            })
            .then((response) => {
                setDisplayedToDoList(response.data.toDoList);
            });

        let copiedArray = [...toDoList];
        const isDoneList = copiedArray.map((obj) => {
            return obj.isDone;
        })

        if (isDoneList.every((value) => { return value === true })) {
            if (copiedArray.length > 0) {
                setAllDone(true);
            }else {
                setAllDone(false);
            }
        } else {
            setAllDone(false);
        }

    }, [toDoList, roomId]);

    const handleResize = (e) => {
        setScreenWidth(window.innerWidth);
    };

    const chatToggle = () => {
        
        const chat = document.querySelector('.chat');
        const list = document.querySelector('.to-do-list-container');
        const note = document.querySelector('.note');

        chat.style.display = 'block';
        list.style.display = 'none';
        note.style.display = 'none';
        
        setIsChat(true);
        setIsList(false);
        setIsNote(false);
    }

    const toDoToggle = () => {

        const chat = document.querySelector('.chat');
        const list = document.querySelector('.to-do-list-container');
        const note = document.querySelector('.note');

        chat.style.display = 'none';
        list.style.display = 'block';
        note.style.display = 'none';

        setIsChat(false);
        setIsList(true);
        setIsNote(false);
    }

    const noteToggle = () => {

        const chat = document.querySelector('.chat');
        const list = document.querySelector('.to-do-list-container');
        const note = document.querySelector('.note');

        chat.style.display = 'none';
        list.style.display = 'none';
        note.style.display = 'block';

        setIsChat(false);
        setIsList(false);
        setIsNote(true);
    }

    return(
        <>
            {isLoading?<Loading />
            :<section>
                {authorized?
                <div className="room">
                    <h2>Hi! {userName}, welcome to the room for {roomName}!</h2>

                            <div className="main-container">
                                <Chat roomId={roomId} userName={userName} roomName={roomName} />
                                <ToDoList displayedToDoList={displayedToDoList} allDone={allDone} toDo={toDo} setToDoList={setToDoList} setToDo={setToDo} toDoList={toDoList} />
                                <Note />
                            </div>
                    { screenWidth > 900
                    ?
                    <></>
                    :
                    <div className="button-container">
                        {isChat ? <></> : <button className="chat-toggle" onClick={chatToggle}>Chat</button> }
                        {isList ? <></> : <button className="toDo-toggle" onClick={toDoToggle}>List</button> }
                        {isNote ? <></> : <button className="note-toggle" onClick={noteToggle}>Note</button> }
                    </div>
                    }
                    
                </div>
                        : <Password userName={userName} password={password} isPassword={isPassword} setUserName={setUserName} setAuthorized={setAuthorized}/>
                }
            </section> 
            }   
        </>
    )
}

export default Room;