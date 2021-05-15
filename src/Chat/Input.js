const Input = ({ message, setMessage, sendMessage }) => (
    <form className="chat-form">
        <input type="text" className="input" placeholder="type your message." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />
        <button className="send-button" onClick={(e) => sendMessage(e)}>Send</button>
    </form>
)

export default Input;