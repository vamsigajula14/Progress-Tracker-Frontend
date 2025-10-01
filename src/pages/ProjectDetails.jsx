import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  async function deleteTask(taskId) {
    try {
      const response = await axios.delete(
        `https://progress-tracker-backend-hyf8.onrender.com/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (err) {
      if (err.response && err.response.status === 403) { 
        alert("Session time out");
        localStorage.removeItem("token");
        navigate("/login"); 
      } else {
        alert("Got an error while deleting task: " + err.message);
      }
    }
  }

  async function fetchProject() {
    try {
      const projectDetails = await axios.get(
        `https://progress-tracker-backend-hyf8.onrender.com/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject(projectDetails.data.project || {});
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("Session time out");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response && err.response.status === 404) {
        setProject({});
      } else {
        alert("Got an error while fetching");
      }
    }
  }

  async function fetchTask() {
    try {
      const response = await axios.get(
        `https://progress-tracker-backend-hyf8.onrender.com/api/tasks/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("Session time out");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (err.response && err.response.status === 404) {
        setTasks([]);
      } else {
        alert("Got an error while fetching");
      }
    }
  }

  useEffect(() => {
    fetchProject();
    fetchTask();
  }, [id]);

  if (loading) return <h3>Loading project...</h3>;

  return (
    <div>
      {/* Project Header */}
      <div>
        <h2>Project Details</h2>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <p>Overall Progress: {project.progress}%</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/projects")}>Back to Projects</button>
        <button onClick={() => navigate(`/task/new/${id}`)}>+ Add Task</button>
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
                <button onClick={() => navigate(`/task/edit/${task._id}`)}>
                  Edit
                </button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>

                {/* Subtasks */}
                <ul>
                  {task.subtasks.map((sub) => (
                    <li key={sub._id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={sub.completed}
                          onChange={() => alert("Toggle subtask " + sub._id)}
                        />
                        {sub.name}
                      </label>
                      <button onClick={() => alert("Edit Subtask " + sub._id)}>
                        Edit
                      </button>
                      <button onClick={() => alert("Delete Subtask " + sub._id)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(`/subtask/new/${task._id}`)}>
                  + Add Subtask
                </button>
                <hr/>
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
