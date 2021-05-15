import bin from '../garbage.png';

const ToDoList = ({toDo, setToDo, toDoList, setToDoList, displayedToDoList, allDone}) => {

    const handleChange = (e) => {
        setToDo({ toDo: e.target.value, isDone: false });
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        let toDoArray = [...toDoList];
        toDoArray.push(toDo);
        setToDoList(toDoArray);
        setToDo({ toDo: '', isDone: false });
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
        } else {
            toDoArray[index].isDone = false;
        }
        setToDoList(toDoArray);
        e.target.classList.toggle('list-done');

        //animation trigger when toDoList is all done
        let copiedArray = [...toDoList];
        const isDoneList = copiedArray.map((obj) => {
            return obj.isDone;
        })

        if (isDoneList.every((value) => { return value === true })) {

        }
    }

    return (
        <div className='to-do-list-container'>
            <div className='add-to-do'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="toDo" className="sr-only"></label>
                    <input type="text" id="toDo" required placeholder="Add Team's to do list here" value={toDo.toDo} onChange={handleChange} />
                    <button className="submit-button" type="submit">Add</button>
                </form>
            </div>

            {displayedToDoList ?
                <ul className='to-do-list'>
                    {allDone ?
                        <div className='to-do-complete'>COMPLETED</div>
                        : <div></div>
                    }
                    <h3>To Do LIST</h3>
                    {displayedToDoList.map((list, index) => {
                        return (
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
                : <ul></ul>}
        </div>
    )
}

export default ToDoList;