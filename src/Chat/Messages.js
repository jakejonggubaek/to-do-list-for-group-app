import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';


const Messages = ({ messages, name }) => {

    
    

    return (
        <ScrollToBottom className="message-container-screen" followButtonClassName='follow-button'>
            
            {
                messages.map((message, i) => {
                    return (
                        <div key={i}>
                            <Message message={message} name={name} />
                        </div>
                    )
                })
            }
            
        
        </ScrollToBottom >
    )
}

export default Messages;