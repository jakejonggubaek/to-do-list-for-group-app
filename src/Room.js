import axios from 'axios';
import { useState, useEffect } from 'react';

import Loading from './Loading';
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

    }, [toDoList, roomId])

    return(
        <>
            {isLoading?<Loading />
            :<section>
                {authorized?
                <div className="room">
                    <h2>Hi! {userName}, welcome to the room for {roomName}!</h2>
                    <div className="main-container">
                                <Chat roomId={roomId} userName={userName} roomName={roomName}/>
                        <ToDoList displayedToDoList={displayedToDoList} allDone={allDone} toDo={toDo} setToDoList={setToDoList} setToDo={setToDo} toDoList={toDoList} />
                        <Note />
                    </div>
                    
                </div>
                        : <Password userName={userName} password={password} isPassword={isPassword} setUserName={setUserName} setAuthorized={setAuthorized}/>
                }
            </section> 
            }   
        </>
    )
}

export default Room;