import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Messages from './Messages';
import Input from './Input';
import TextContainer from './TextContainer';

let socket;

const Chat = ({roomName, roomId, userName }) => {

    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'https://react-chat-app-2021.herokuapp.com';

    useEffect(() => {

        setName(userName);

        socket = io(ENDPOINT);

        socket.emit('join', { name: userName, room: roomId }, (error) => {
            if (error) {
                alert(error);
            }
        });

    // eslint-disable-next-line
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="chat">
            <div className="container">
                <InfoBar roomName={roomName}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;