import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
export function Projects(){
    const navigator = useNavigate();
    const [projects,setProjects] = useState([]);
    const token = localStorage.getItem("token");
    if(!token){
        alert("need to login");
        navigator("/login");
    }
    async function fetchData(){
        try{
            const data = await axios.get("https://progress-tracker-backend-hyf8.onrender.com/api/projects",{
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            });
            setProjects(data.data.projects);
            
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("Session time completed");
                localStorage.removeItem("token");
                navigator("/login");
            }else{
                alert("got an error while fetching data",err.message);
            }
        }
    }
    function back(){
        navigator("/dashboard");
    }
    function create(){
        navigator("/project/new");
    }
    async function deleteProject(id){
        try{
            const response = await axios.delete(`https://progress-tracker-backend-hyf8.onrender.com/api/projects/${id}`,{
                headers : {
                    Authorization : `Bearer ${token}`,
                }
        })
            if(response.data.success){
                alert(response.data.message);
                setProjects(projects => projects.filter(project => project._id !== id));
            }
            else{
                alert("Got an error while deleting project");
                console.log(response.data?.error || response);
            }
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session completed");
                navigator('/login');
            }else{
                alert("Got error while deleting project",err.message);
            }
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    return <div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <button style={{cursor:"pointer"}} onClick={back}>BACK</button>
            <button style={{cursor : "pointer"}} onClick={create}>CREATE PROJECT</button>
        </div>
        <hr/>
        <div>
            {projects.length > 0 ? 
                (<ul>
                    {projects.map((project)=>{
                        return <li key={project._id}>
                            <h4>Project Name : {project.name}</h4>
                            <h4>Description: {project.description}</h4>
                            <h4>Status: {project.status}</h4>
                            <button onClick={()=>{
                                deleteProject(project._id);
                            }}>Delete</button>
                            <hr/>
                        </li>
                    })
                    }
                </ul>) : (
                    <h2>No Projects</h2>
                )

            }
        </div>
    </div>
}
