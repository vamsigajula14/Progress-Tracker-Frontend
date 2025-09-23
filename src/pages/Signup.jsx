import {useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
export function SignUp(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    async function signUp(event){
        event.preventDefault();
        if(isEmpty(name)){
            alert("name is empty");
            return
        }
        if(!passwordValidation()){
            alert("password must have atleast 6 characters");
            return;
        }
        if(isEmpty(email)){
            alert("email id empty");
            return;
        }
        const user = {name,email:email.trim(),password:password.trim()};
        try{
            await axios.post('https://progress-tracker-backend-hyf8.onrender.com/api/auth/register',user);
            setName('');
            setEmail('');
            setPassword('');
        }
        catch (error) {
            console.error("Error signing up:", error);
            alert(error.response?.data?.message || "Error signing up");
            return;
        }

        console.log(user);
        navigate('/login');
    }
    function isEmpty(object){
        return object.length === 0;
    }
    function passwordValidation(){
        return password.length >= 6;
    }
    return <div>
        <form onSubmit={signUp}>
            <div>
                <label htmlFor="name">name:</label>
                <input type = "text" id ="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type = "email" id ="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor = "password">Password:</label>
                <input type = "password" id ="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
}
