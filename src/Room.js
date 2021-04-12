import axios from 'axios';
import { useState, useEffect } from 'react';
import bin from './garbage.png';
import Loading from './Loading';

function Room(props) {

    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [typedPassword, setTypedPassword] = useState('');
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
                setAuthorized(true);
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

    const handleAuthorize = (e) => {
        e.preventDefault();
        if(password === typedPassword) {
            setAuthorized(true);
        }else {
            setTypedPassword('');
            alert('Password incorrect!');
        }
    }

    const handleChange = (e) => {
        setToDo({ toDo: e.target.value, isDone: false });
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();   
        let toDoArray = [...toDoList];
        toDoArray.push(toDo);
        setToDoList(toDoArray);
        setToDo({toDo:'', isDone:false});
    }

    const handleDelete = (e) => {

        let index = e.target.parentElement.id;
        let toDoArray = [...toDoList];
        toDoArray.splice(index, 1);
        setToDoList(toDoArray);
        
    }

    const handleClick = (e) => {
        let index = e.target.parentElement.parentElement.id;
        let toDoArray = [...toDoList];

        if (toDoArray[index].isDone === false) {
            toDoArray[index].isDone = true;
        }else {
            toDoArray[index].isDone = false;
        }
        setToDoList(toDoArray);
        e.target.classList.toggle('list-done');
        console.log(e.target);
        

        //animation trigger when toDoList is all done
        let copiedArray = [...toDoList];
        const isDoneList = copiedArray.map((obj) => {
            return obj.isDone;
        })

        if (isDoneList.every((value) => { return value === true })) {
            console.log('congrats!!');
        }
    }


    return(
        <>
            {isLoading?<Loading />
            :<section>
                {authorized?
                <div className="room">
                    <div>
                        <h2>welcome to the room for {roomName}!</h2>
                        <div className='addToDo'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="toDo" className="sr-only"></label>
                                <input type="text" id="toDo" required placeholder="Add your list here" value={toDo.toDo} onChange={handleChange} />
                                <button type="submit">Add</button>
                            </form>
                        </div>
                        
                        {displayedToDoList?
                        <ul>
                                    {allDone ?
                                        <div className='to-do-complete'>COMPLETED</div>
                                        : <div></div>
                                    }
                            <h3>To Do LIST</h3>
                            {displayedToDoList.map((list, index)=>{
                                return(
                                    <li key={index} id={index}>
                                        <div className="list-container">
                                            {list.isDone ?
                                            <button onClick={handleClick} className={"toggle-button " + (list.isDone ? 'list-done' : '')}>&#9745;</button>
                                            : <button onClick={handleClick} className={"toggle-button " + (list.isDone ? 'list-done' : '')}>&#9746;</button>
                                            }
                                            <p>{list.toDo}</p>
                                        </div>
                                        <input onClick={handleDelete} type="image" src={bin} name="submit" width="100" height="48" alt="delete-button" />
                                    </li>
                                )
                            })}
                        </ul>
                        :<ul></ul>}
                    </div>
                </div>
                :<div className="password">
                    <form onSubmit={handleAuthorize}>
                            <label className="sr-only" htmlFor="password"></label>
                            <input className="password-container" type="text" id="password" value={typedPassword} placeholder="PASSWORD" onChange={(e)=>{setTypedPassword(e.target.value)}}/>
                        <button type="submit">Enter the Room</button>
                    </form>
                </div>
                }
            </section> 
            }   
        </>
    )
}

export default Room;