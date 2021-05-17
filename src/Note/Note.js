import { useState } from 'react';

const Note = () => {

    const [note, setNote] = useState(localStorage.getItem('note'));

    const handleChange = (e) => {
        setNote(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('note', note);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        localStorage.setItem('note', '');
        setNote('');
    }


    return (
        <div className="note">
            <h3>personal note (not shared)</h3>
            <form action="">
                <textarea className="text-area" type="textarea" rows="16" onChange={handleChange} value={note}></textarea>
            </form>
            <div className='button-container'>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            
        </div>
    )
}

export default Note;