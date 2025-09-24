import {useState,useEffect} from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Dashboard (){
    const [user,setUser] = useState(null);
    const [projects,setProjects] = useState([{}]);
    const token = localStorage.getItem("token");
    const navigator = useNavigate();
    async function fetchData(){
        try{
            const data = await axios.get("https://progress-tracker-backend-hyf8.onrender.com/api/users/me",{
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            })
            setUser(data.data);
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session time completed");
                removeToken();
            }else{
                console.error("Error fetching user data:", err.message);
            }
        }
    }
    async function fetchProjects(){
        try{
            const response = await axios.get("https://progress-tracker-backend-hyf8.onrender.com/api/projects",{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            setProjects(response.data.projects);
        }catch(err){
            if(err.response && err.response.status === 403){
                alert("session time completed");
                removeToken();
            }else{
                console.error("Error fetching projects:", err.message);
            }
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    useEffect(()=>{
        if(user){
            fetchProjects();
        }
    },[user])
    async function removeToken(){
        localStorage.removeItem("token");
        navigator("/login");
    }
    function logout(){
        try{
            removeToken();
        }catch(err){
            console.log("got an error while logout",err.message);
        }
    }
    if(!user){
        return <div>Dashboard Loading</div>
    }
    return <div>
        <div style={{display:"flex", justifyContent : "space-between"}}>
            <h2>👋 Welcome back, {user.name}!</h2>
            <button onClick={logout}>Logout</button>
        </div>
        <hr/>
        <div style={{display:"flex", justifyContent : "space-between"}}>
            <div>
                <h2>Total Projects : {projects.length}</h2>
            </div>
        </div>
        <hr/>
        <div>
    
            {projects.length > 0 ? 
                <div>
                    <ul>
                        {
                            projects.map((project)=>{
                               return  (<li key={project._id}>
                                   Name   : {project.name} , Status : {project.status}
                                </li>)
                            })
                        }

                    </ul>
                </div>
            : 
                <div>
                    No projects
                </div>
            }
        </div>
        <hr/>
        <div style={{display:'flex',gap:"1rem"}}>
            <button onClick={()=>{
                navigator("/project/new")
            }}>➕ New Project</button>
            <button onClick={()=>{
                navigator("/projects")
            }}>Go to Projects</button>
        </div>
    </div>
}