import {useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";

export function EditTask(){
        const [name,setName] = useState("");
        const [description,setDescription] = useState("");
        const [status,setStatus] = useState("");
        const [progress,setProgress] = useState(0);
        const [loading,setLoading] = useState(false);
        const token = localStorage.getItem("token");
        const [projectId,setProjectId] = useState(null);
        const {id} = useParams()
        const navigator = useNavigate();
        async function editTask(event){
            event.preventDefault();
            setLoading(true);
            if(name.trim().length === 0 || description.trim().length === 0){
                alert("Any field is empty");
                return;
            }
            const response = await axios.put(`https://progress-tracker-backend-hyf8.onrender.com/api/tasks/${id}`,{
                name,description,status,progress
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.data.success === true){
                alert("Task successfully edit");
                navigator(`/projects/${projectId}`);
            }
        }
        async function fetch(){
            try{
                const response = await axios.get(`https://progress-tracker-backend-hyf8.onrender.com/api/tasks/${id}`,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                if(response.data.success === true){
                    setName(response.data.task.name);
                    setDescription(response.data.task.description);
                    setStatus(response.data.task.status);
                    setProgress(response.data.task.progress);
                    setProjectId(response.data.task.projectId);
                }else{
                    alert(response.data.error.message);
                }

            }catch(err){
                if(err.response && err.response.status === 403){
                    alert("Session timeout");
                    localStorage.removeTime('token');
                    navigator("/login");
                }else{
                    alert(err.message);
                }
            }
        }
        useEffect(()=>{
            fetch();
        },[])
        return <div>
        <form onSubmit={editTask} >
            <div>
                <label htmlFor="name">Task :</label>
                <input type="text" value = {name} onChange={e=>setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" value = {description} onChange={e=>setDescription(e.target.value)} />
            </div>
            { loading ? <h2>Editing task</h2>  : (<button type="submit">Edit Task</button>)}
        </form>
    </div>
}