import {useState} from "react";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";
export function AddSubTask(){
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [loading,setLoading] = useState(false);
    const navigator = useNavigate();
    const {id} = useParams();
    const token = localStorage.getItem('token');
    async function createSubTask(event){
        try{
            setLoading(true);
            event.preventDefault();
            if(name.trim().length === 0 ||description.trim().length === 0){
                alert("Fields must be non empty");
                setLoading(false);
                return;
            }
            const response = await axios.post(`https://progress-tracker-backend-hyf8.onrender.com/api/subtasks`,{
                name,description,taskId : id
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            if(response.data.success === true){
                alert("Sub task successfully created");
                navigator(`/projects/`);
                setName("");
                setDescription("");
            }else{
                alert(response.data.error.message);
                setLoading(false);
            }
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session timeout");
                navigator("/login");
                setName("");
                setDescription("");
            }else{
                alert("Got an error while creating subtask",err);
                setLoading(false);
            }
        }
    }
    return <div>
        <form onSubmit={createSubTask}>
            <div>
                <label >Subtask Name:</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div>
                <label >Subtask Description:</label>
                <input type="text" value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            { loading ? <h2>Sub task creating</h2> :(<button type = "submit">Create Subtask</button>)}
        </form>
    </div>
}