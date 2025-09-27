import {useParams,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import axios from "axios";

export function EditProject(){
    const {id} = useParams();
    const [name,setName] = useState('');
    const [description,setDescription] = useState("");
    const [status,setStatus] = useState("");
    const [progress,setProgress] = useState("");
    const token = localStorage.getItem("token");
    const navigator = useNavigate();
    async function editProject(event){
        try{
            event.preventDefault();
            const respose = await axios.put(`https://progress-tracker-backend-hyf8.onrender.com/api/projects/${id}`,{
                name,description,status,progress
            },{
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            });
            alert("Update sucessful");
            navigator("/projects");
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session time out");
                localStorage.removeItem("token");
                navigator("/login");
            }else{
                alert("Got an error while updating details");
            }
        }

    }
    async function fetchData(){
        try{
            const response = await axios.get(`https://progress-tracker-backend-hyf8.onrender.com/api/projects/${id}`,{
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            })
            const data = response.data;
            setName(data.project.name||"");
            setDescription(data.project.description||"");
            setStatus(data.project.status||"");
            setProgress(data.project.progress||0);

        }catch(err){
            if(err.response && err.response.status === 403){
                alert("Session time out");
                localStorage.removeItem("token");
                navigator("/login");
            }else{
                alert("got an error while fetching project",err.message);
            }
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return <div>
        <form onSubmit={editProject}>
            <div>
                <label htmlFor="name">Name:</label>
                <input  value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="description">Descriptoin:</label>
                <input  value={description} onChange={e=>setDescription(e.target.value)} />
            </div>
            <button type="submit">Edit</button>
        </form>
        
    </div>
}