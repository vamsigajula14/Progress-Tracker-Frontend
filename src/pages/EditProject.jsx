import {useParams} from "react-router-dom";
import {useState} from "react";

export function EditProject(){
    const {id} = useParams();
    const [name,setName] = useState('');
    const [description,setDescription] = useState("");
    return <div>
        <form onSubmit={editProject}>
            <label htmlFor="name">Name:</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} />
            <label htmlFor="description">Descriptoin:</label>
            <input type="text" value={name} onChange={e=>setDescription(e.target.value)} />
            <button type="submit">Edit</button>
        </form>
        
    </div>
}