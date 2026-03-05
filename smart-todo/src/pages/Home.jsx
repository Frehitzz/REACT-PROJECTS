import {useState} from "react";
function Home(){
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);

    return(
        <div className="flex flex-col min-h-screen items-center">
        <div className="flex flex-col justify-center items-center">
            <div className="text-2xl mt-2"><h1>Smart-Todo</h1></div>
            <div className="flex gap-2">
                <input className="border rounded-lg px-2"
                placeholder="Enter task" type="text" value={input}></input>
                <button className="border px-2 rounded-lg">Add</button>
            </div>
        </div>
        </div>
    )

}
export default Home