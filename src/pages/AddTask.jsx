import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export function AddTask(){
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const {id} = useParams();
    const navigator = useNavigate();
    const token = localStorage.getItem("token");
    async function createTask(event){
        try{
            event.preventDefault();
            if(name.trim().length === 0 || description.trim().length === 0){
                alert("Fields may be empty");
                return;
            }
            const response = await axios.post('https://progress-tracker-backend-hyf8.onrender.com/api/tasks',{
                name:name,description:description,projectId : id
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.data.success === true){
                alert("task created successful");
                navigator(`/projects/${id}`);
                setName('');
                setDescription('');
            }else{
                alert(response.data.error.message);
            }
    
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session time out");
                localStorage.removeItem("token");
                navigator("/login");
            }else{
                alert("Got an error while creating task",err.message);
            }
        }
    }
    return <div>
        <form onSubmit={createTask}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            <button type="submit">Create Task</button>
        </form>
    </div>
}