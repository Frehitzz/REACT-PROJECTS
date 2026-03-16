import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

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
  function editTask(index) {
    setEditIndex(index) // to remember which task you want to edit
    // tasks[index] - gets the tasks at that spot in the list
    // setEditValue(tasks[index]) - it puts that text into your edit input
    setEditValue(tasks[index].text)
  }

  // save edit
  function saveEdit() {
    // to only change the sleelcted tasks thats why i put them in tasks.map
    const updatedTasks = tasks.map((task, index) => {
      if (index === editIndex) {
        return { ...task, text: editValue }
      }
      return task
    })
    setTasks(updatedTasks)
    setEditIndex(null)
    setEditValue('')
  }

  // cancel edit
  function cancelEdit() {
    setEditIndex(null)
    setEditValue('')
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  function addTask() {
    if (input.trim() !== '') {
      // ... - spread operator
      // ... - copies all the old tasks in a new array then adds the new one at the end
      // new task object
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
      }
      setTasks([...tasks, newTask])
      setInput('')
    }
  }

  function toggleComplete(id) {
    setTasks(
      tasks.map(
        // ternary operator
        // check if the task id is same of the id
        (task) =>
          task.id === id
            ? // true = if a task is unchecked when it click it will checked, vice versa
              { ...task, completed: !task.completed }
            : // false = if its not a same id
              task
      )
    )
  }

  const activeTask = tasks.filter((task) => !task.completed)
  const completedTask = tasks.filter((task) => task.completed)

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

      {/* TASKS LIST or ACTIVE TASK */}
      <div className="flex flex-col gap-2">
        {activeTask.map((task, index) => (
          <div className="flex items-center gap-2" key={task.id}>
            <button
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 ${
                // IF THE TASK IS COMPLETED GREEN COLOR ELSE GRAY
                task.completed
                  ? 'bg-green-200 border-green-600'
                  : 'border-gray-400'
              }`}
              onClick={() => toggleComplete(task.id)}
              aria-label="Mark as complete"
            ></button>
            {editIndex === index ? (
              // WHEN EDITING TASK
              <>
                <input
                  className="w-100 p-2 border rounded-2xl bg-gray-500"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                {/* SAVE BTN */}
                <button className="border p-2 rounded-2xl" onClick={saveEdit}>
                  <FaCheck />
                </button>
                {/* CANCEL BTN */}
                <button className="border p-2 rounded-2xl" onClick={cancelEdit}>
                  <RxCross2 />
                </button>
              </>
            ) : (
              // NORMAL TASK
              <>
                <div
                  className={`w-100 border p-2 rounded-2xl cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
                  onClick={() => toggleComplete(task.id)}
                >
                  {task.text}
                </div>
                {/* EDIT BUTTON */}
                <button
                  className="border p-2 rounded-2xl"
                  onClick={() => editTask(index)}
                >
                  <FaEdit />
                </button>
                {/* DELETE BUTTON */}
                <button
                  className="border p-2 rounded-2xl"
                  onClick={() => deleteTask(index)}
                >
                  <FaDeleteLeft />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      {/* COMPLETED TASKS */}
      {completedTask.length > 0 && (
        <>
          <div className="text-gray-500 font-semibold mt-4">Completed</div>
          {completedTask.map((task, index) => (
            <div className="flex items-center gap-2" key={task.id}>
              {/* CIRCLE BUTTON FOR COMPLETE/UNCOMPLETE */}
              <button
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 bg-green-400 border-green-600"
                onClick={() => toggleComplete(task.id)}
                aria-label="Mark as incomplete"
              >
                <span className="text-white text-lg">✓</span>
              </button>

              {/* TASK */}
              <div
                className="w-100 border p-2 rounded-2xl line-through text-gray-400 cursor-pointer"
                onClick={() => toggleComplete(task.id)}
              >
                {task.text}
              </div>

              {/* DELETE COMPLETED TASK */}
              <button
                className="border p-2 rounded-2xl"
                onClick={() =>
                  deleteTask(tasks.findIndex((t) => t.id === task.id))
                }
              >
                <FaDeleteLeft />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
export default Home
