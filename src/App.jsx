
import './App.css'
import './index.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import {Login} from './pages/Login';
import {Dashboard} from './pages/Dashboard';
import {Projects} from './pages/Projects';
import {ProjectDetails} from './pages/ProjectDetails';
import {SignUp} from './pages/Signup';
import { Layout } from './components/Layout';


function App() {
  return (
      <BrowserRouter>
        <Routes>
            
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;