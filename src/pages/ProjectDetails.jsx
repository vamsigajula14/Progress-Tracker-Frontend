import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // state
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  
  async function deleteTask(taskId){
      try{
        const response = await axios.delete(`https://progress-tracker-backend-hyf8.onrender.com/api/tasks/${taskId}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        if(response.data.response.success){
            setTasks(tasks.filter((task)=> {
                return task._id !== taskId}
            ))
        }
    }catch(err){
        const value = getErrorDetails(err);
        if(getErrorDetails){
            alert("got an error while deleting task",err.message);
        }
    }
}
function getErrorDetails(err){
      if(err.response && err.response.status === 403){
          alert("Session time out");
          localStorage.removeItem("token");
          navigator("/login");
      }else{
        return true;
      }

  }

  // fetch project details on mount (dummy for now)
  useEffect(async () => {
    // later: axios.get(`/projects/${id}`)
    try{
        const response = await axios.get(`https://progress-tracker-backend-hyf8.onrender.com/api/tasks/project/${id}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        setTimeout(() => {
          setTasks(response.data.tasks);
          setLoading(false);
        }, 500);
    }catch(err){
        if(getErrorDetails(err)){
            alert("got an error while fetching data");
        }
    }
  }, [id]);

  if (loading) return <h3>Loading project...</h3>;

  return (
    <div>
      {/* Project Header */}
      <div>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <p>Overall Progress: {project.progress}%</p>
      </div>
      <div style={{display : "flex",justifyContent : "space-between"}}>
        <button onClick={() => navigate("/projects")}>Back to Projects</button>
        <button onClick={() => {

        }}>+ Add Task</button>
      </div>
      <hr />

      {/* Task List */}
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <h4>
                  {task.name} - Progress: {task.progress}%
                </h4>
                <button onClick={() => alert("Edit Task " + task._id)}>
                  Edit
                </button>
                <button onClick={() => {
                    deleteTask(taskId);
                }}>
                  Delete
                </button>

                {/* Subtasks */}
                <ul>
                  {task.subtasks.map((sub) => (
                    <li key={sub._id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={sub.completed}
                          onChange={() =>
                            alert("Toggle subtask " + sub._id)
                          }
                        />
                        {sub.name}
                      </label>
                      <button onClick={() => alert("Edit Subtask " + sub._id)}>
                        Edit
                      </button>
                      <button
                        onClick={() => alert("Delete Subtask " + sub._id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => alert("Add Subtask to " + task._id)}>
                  + Add Subtask
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h3>No tasks yet</h3>
        )}
      </div>
    </div>
  );
}
