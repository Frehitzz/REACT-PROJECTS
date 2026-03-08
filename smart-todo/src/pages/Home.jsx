import { useState } from 'react'
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
      <div className="flex flex-col gap-3">
        {tasks.map((task, index) => (
          <div className="flex items-center gap-2" key={index}>
            <div className="p-2 border rounded-2xl w-96">{task}</div>
            <button className="p-2 border rounded-2xl" onChange={editTask}>
              Edit
            </button>
            <button className="p-2 border rounded-2xl" onChange={deleteTask}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
