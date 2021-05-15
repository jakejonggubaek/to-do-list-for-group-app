import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    console.log(text);
    
    const trimmedName = name.trim().toLowerCase();
    
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="message-container justifyEnd">
                    <div className="sent-text">{trimmedName}</div>
                    <div className="message-box">
                        <div className="message-text">{ReactEmoji.emojify(text)}</div>
                    </div>
                </div>
            )
            : (
                <div className="message-container justifyStart">
                    <div className="sent-text">{user}</div>
                    <div className="message-box">
                        <div className="message-text">{ReactEmoji.emojify(text)}</div>
                    </div>
                </div>
            )
    )

}

export default Message;