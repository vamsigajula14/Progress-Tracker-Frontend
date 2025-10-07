import {useState,useEffect} from "react";
import axios from 'axios';
import {useParams,useNavigate} from "react-router-dom";

export function EditSubTask(){
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigator = useNavigate();
    const {id} = useParams();
    async function fetch(){
        try{
            const response = await axios.get(`https://progress-tracker-backend-hyf8.onrender.com/api/subtasks/${id}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            const data = response.data.subtask;
            if(data){
                setName(data.name||'');
                setDescription(data.description||'');
                setLoading(false);
            }
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session time out");
                localStorage.removeItem("token");
                navigator("/login");
            }else{
                alert("Got an while editing the sub task",err.message);
            }
        }
    }
    async function editSubTask(event){
        try{
            setLoading(true);
            event.preventDefault();
            const response = await axios.put(`https://progress-tracker-backend-hyf8.onrender.com/api/subtasks/${id}`,{
                name,
                description
            },{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            const data = response.data;
            if(data){
                alert("Successfuly udpadated");
                navigator("/projects");
            }
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("Sessoin time out");
                localStorage.removeItem("token");
                navigator("/login");
            }else{
                alert(`Got an error while updating subtask ${err.message}`);
                console.log(err.message)
                setLoading(false);
            }
        }
    }
    useEffect(()=>{
        fetch();
    },[])
    return <div>
            <form onSubmit = {editSubTask}>
                <div>
                    <lable >Name:</lable>
                    <input type = "text" value = {name} onChange ={e=>setName(e.target.value)} />
                </div>
                <div>
                    <lable >Description:</lable>
                    <input type = "text" value = {description} onChange ={e=>setDescription(e.target.value)} />
                </div>
                {loading ? <h2>Editing</h2> : <button type="submit">Edit SubTask</button>}
            </form>
    </div>
}
