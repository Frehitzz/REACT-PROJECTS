import { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


function Home() {
  // useState - lets you remeber values between renders

  //input - stores what you tpye in the input box
  // setInput - lets you change that value on 'input'
  const [input, setInput] = useState('')

  //tasks - where the list of tasks put
  // setTasks - to add another list of tasks
  const [tasks, setTasks] = useState([])

  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  // 
  function editTask(index){
    setEditIndex(index) // to remember which task you want to edit
    // tasks[index] - gets the tasks at that spot in the list
    // setEditValue(tasks[index]) - it puts that text into your edit input
    setEditValue(tasks[index]) 
  }

  // save edit
  function saveEdit(){
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editValue
    setTasks(updatedTasks)
    setEditIndex(null)
    setEditValue('')
  }

  // cancel edit
  function cancelEdit(){
    setEditIndex(null)
    setEditValue('')
  }

  
  function deleteTask(index){
    const newTasks = tasks.filter((_,i) => i !== index)
    setTasks(newTasks)
  }

  function addTask() {
    if (input.trim() !== '') {
      // ... - spread operator
      // ... - copies all the old tasks in a new array then adds the new one at the end
      setTasks([...tasks, input])
      setInput('') // clears the input box after cliking add btn
    }
  }

  return (
    // MAIN CONTENT
    <div className="flex flex-col min-h-screen items-center gap-4">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl mt-2">
          <h1>Smart-Todo</h1>
        </div>
        <div className="flex gap-2">
          <input
            className="border rounded-lg p-2"
            placeholder="Enter task"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className="border px-2 rounded-lg" onClick={addTask}>
            Add
          </button>
        </div>
      </div>

      {/* TASKS LIST */}
      <div className="flex flex-col gap-2">
        {tasks.map((task, index) => (
        <div className="flex items-center gap-2" key={index}>
        {editIndex === index ? (
          <>
            <input className='w-100 p-2 border rounded-2xl bg-gray-500' value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            <button className='border p-2 rounded-2xl' onClick={saveEdit}><FaCheck/></button>
            <button className='border p-2 rounded-2xl' onClick={cancelEdit}><RxCross2/></button>
          </>
        ) : (
          <>
            <div className='w-100 border p-2 rounded-2xl'>{task}</div>
            <button className='border p-2 rounded-2xl' onClick={() => editTask(index)}><FaEdit/></button>
            <button className='border p-2 rounded-2xl' onClick={() => deleteTask(index)}><FaDeleteLeft/></button>
          </>
        )}
      </div>
        ))}
      </div>
        
      </div>
  )
}
export default Home 
