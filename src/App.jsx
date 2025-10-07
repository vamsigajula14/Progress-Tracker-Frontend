
import './App.css'
import './index.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import {Login} from './pages/Login';
import {Dashboard} from './pages/Dashboard';
import {Projects} from './pages/Projects';
import {ProjectDetails} from './pages/ProjectDetails';
import {SignUp} from './pages/Signup';
import { Layout } from './components/Layout';
import {ProtectedRoute} from "./components/ProtectedRoute";
import {NewProject} from './pages/NewProject';
import { EditProject } from './pages/EditProject';
import {AddTask} from "./pages/AddTask";
import {EditTask} from "./pages/EditTask";
import { AddSubTask } from './pages/AddSubTask';
import {EditSubTask} from "./pages/EditSubTask";

function App() {
  return (
      <BrowserRouter>
        <Routes>      
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path = "/project/new" element={<NewProject/>} />
            <Route path = "/project/edit/:id" element={<EditProject />} />
            <Route path='/task/new/:id' element={<ProtectedRoute><AddTask/></ProtectedRoute>}/>
            <Route path='/task/edit/:id' element={<ProtectedRoute><EditTask/></ProtectedRoute>} />
            <Route path='/subtask/new/:id' element = {<ProtectedRoute><AddSubTask/></ProtectedRoute>} />
            <Route path='/subtask/edit/:id' element = {<ProtectedRoute><EditSubTask/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;