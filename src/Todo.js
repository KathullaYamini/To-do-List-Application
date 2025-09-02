import React ,{useState , useEffect} from 'react';
import './Todo.css';
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
function Todo(){
  const [isCompletedScreen , setIsCompletedScreen]= useState(false);
  const [allTodos , setAllTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription , setNewDescription]=useState("");
  const [completed,setCompleted]=useState([]);

const handleAdd = () => {
  if (!newTitle.trim() || !newDescription.trim()) return;

  let newTodoItem = {
    title: newTitle,
    description: newDescription
  };

  let updatedTodoArr = [...allTodos, newTodoItem];
  setAllTodos(updatedTodoArr);
  localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

  setNewTitle("");
  setNewDescription("");
};

const handleDelete = (index) => {
  let reduced = [...allTodos];
  reduced.splice(index, 1);
  setAllTodos(reduced);
  localStorage.setItem('todolist', JSON.stringify(reduced));
};

const handleDeleteCompleted = (index) => {
  let reduced = [...completed];
  reduced.splice(index, 1);
  setCompleted(reduced);
  localStorage.setItem('completedTodos', JSON.stringify(reduced));
};


const handleComplete = (index) => {
  let now = new Date();
  let completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  let filteredItem = {
    ...allTodos[index],
    completedOn
  };

  let updatedCompletedTodo = [...completed, filteredItem];
  setCompleted(updatedCompletedTodo);
  localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodo));

  // remove from active todos
  let reduced = [...allTodos];
  reduced.splice(index, 1);
  setAllTodos(reduced);
  localStorage.setItem('todolist', JSON.stringify(reduced));
};

useEffect(() => {
  let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  let savedCompleted = JSON.parse(localStorage.getItem('completedTodos'));

  if (savedTodo) setAllTodos(savedTodo);
  if (savedCompleted) setCompleted(savedCompleted);
}, []);


    return(
        <div className='Todo'>
          <h1> MY TODO'S</h1>
          <div className='todo-wrapper'>
            <div className='to-do-input'>
              <div className='to-do-input-item'>
              <label>Title</label>
              <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='whats the task title ?'/>
              </div>
              <div className='to-do-input-item'>
              <label>Description</label>
              <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='whats the task description'/>
              </div>
              <div className='to-do-input-item'>
                <button type='button' onClick={handleAdd}className='primaryBtn'>Add</button>
              </div>
            </div>
            <div className='btn-area'>
      <button
        className={`secondaryBtn ${!isCompletedScreen ? 'active' : ''}`}
        onClick={() => setIsCompletedScreen(false)}
      >
        Todo
      </button>
      <button
        className={`secondaryBtn ${isCompletedScreen ? 'active' : ''}`}
        onClick={() => setIsCompletedScreen(true)}
      >
        Completed
      </button>
      <div className='todo-list'>
           
           {isCompletedScreen===false && allTodos.map((item,index) =>{
            return(
                     <div className='todo-list-item' key={index}>
                     <div className='text-content'>
                       <h3>{item.title}</h3>
                       <p>{item.description}</p>
                     </div>
                     <div className='icons'>
                       <MdOutlineDeleteForever className='icon' onClick={()=>handleDelete(index)}title='Delete?' />
                       <FaCheck className='check-icon' onClick={()=>handleComplete(index)} title='Complete?'/>
                     </div>
                   </div>
            );
})}
           
           {isCompletedScreen === true && completed.map((item, index) => {
  return (
    <div className='todo-list-item' key={index}>
      <div className='text-content'>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><small>Completed On: {item.completedOn}</small></p>
      </div>
      <div className='icons'>
        <MdOutlineDeleteForever
          className='icon'
          onClick={() => handleDeleteCompleted(index)}
          title='Delete?'
        />
      </div>
    </div>
  );
})}

        </div>

              </div>
          </div>

        </div>
    )

}
export default Todo;