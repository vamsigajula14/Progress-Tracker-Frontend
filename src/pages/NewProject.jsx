import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function NewProject(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const token = localStorage.getItem("token");
    const navigator = useNavigate();
    async function createProject(event){
        try{
            event.preventDefault();
            if(title.trim() === "" || description.trim() === ""){
                alert("Title or description is empty");
                return;
            }
            const data = await axios.post("https://progress-tracker-backend-hyf8.onrender.com/api/projects",
                {
                    name : title,
                    description,
                },
                {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            )
            if(data.data.success){
                alert("Project sucessfully created");
                navigator("/projects");
                setTitle("");
                setDescription("");
            }
            else{
                alert(data.data.error.message);
            }
        }catch(err){
            console.log("Got an error while creating new Project",err.message);
        }
    }
    return <div>
        <form onSubmit={createProject}>
            <div>
                <label htmlFor="title">Title :</label>
                <input type="text" value={title} onChange={e=> setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input  type="text" value = {description} onChange = {e=> setDescription(e.target.value)}/>
            </div>
            <button type = "submit">Create Project</button>
        </form>
    </div>
}